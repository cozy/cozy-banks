/* global __TARGET__ */

import { cozyClient } from 'cozy-konnector-libs'
import logger from 'cozy-logger'
import { maxBy, pick, uniq } from 'lodash'
import { tokenizer, createClassifier } from '.'
import bayes from 'classificator'
import { getLabel } from 'ducks/transactions/helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'
import { LOCAL_MODEL_USAGE_THRESHOLD } from 'ducks/categories/helpers'
import { getTracker } from 'ducks/tracking'

const localModelLog = logger.namespace('local-categorization-model')
const globalModelLog = logger.namespace('global-categorization-model')

export const PARAMETERS_NOT_FOUND = 'Classifier files is not configured.'

const ALPHA_MIN = 0.1
const ALPHA_MAX = 10
const ALPHA_MAX_SMOOTHING = 20

export const getUniqueCategories = transactions => {
  return uniq(transactions.map(t => t.manualCategoryId))
}

export const getAlphaParameter = (
  nbUniqueCategories,
  min,
  max,
  maxSmoothing
) => {
  const alpha = maxSmoothing / nbUniqueCategories

  return Math.max(min, Math.min(max, alpha))
}

const createLocalClassifier = async () => {
  const getTransWithManualCat = async (transactions, index, limit, skip) => {
    const query = {
      selector: { manualCategoryId: { $exists: true } },
      limit,
      skip,
      wholeResponse: true
    }
    const results = await cozyClient.data.query(index, query)
    transactions = [...transactions, ...results.docs]

    if (results.next) {
      return getTransWithManualCat(transactions, index, limit, skip + limit)
    }

    return transactions
  }

  localModelLog('info', 'Fetching manually categorized transactions')
  const index = await cozyClient.data.defineIndex(TRANSACTION_DOCTYPE, [
    'manualCategoryId'
  ])
  const transactions = await getTransWithManualCat([], index, 100)
  localModelLog(
    'info',
    `Fetched ${transactions.length} manually categorized transactions`
  )

  if (transactions.length === 0) {
    localModelLog(
      'info',
      'Impossible to instanciate a classifier since there is no manually categorized transactions to learn from'
    )
    return null
  }

  localModelLog('info', 'Instanciating a fresh classifier')
  const options = { tokenizer, alpha: 0.1 }
  const classifier = bayes(options)

  localModelLog('info', 'Learning from manually categorized transactions')
  for (const transaction of transactions) {
    classifier.learn(
      getLabelWithTags(transaction),
      transaction.manualCategoryId
    )
  }

  return classifier
}

const getParameters = async () => {
  try {
    const parameters = await cozyClient.fetchJSON(
      'GET',
      '/remote/assets/bank_classifier_nb_and_voc'
    )
    return parameters
  } catch (e) {
    throw new Error(PARAMETERS_NOT_FOUND)
  }
}

const getAmountSignTag = amount => (amount < 0 ? 'tag_neg' : 'tag_pos')
const getAmountTag = amount => {
  if (amount < -550) {
    return 'tag_v_b_expense'
  } else if (amount < -100) {
    return 'tag_b_expense'
  } else if (amount < -20) {
    return 'tag_expense'
  } else if (amount < 0) {
    return 'tag_noise_neg'
  } else if (amount < 50) {
    return 'tag_noise_pos'
  } else if (amount < 200) {
    return 'tag_income'
  } else if (amount < 1200) {
    return 'tag_b_income'
  } else {
    return 'tag_activity_income'
  }
}

const getLabelWithTags = transaction => {
  const label = getLabel(transaction).toLowerCase()

  const amountSignTag = getAmountSignTag(transaction.amount)
  const amountTag = getAmountTag(transaction.amount)

  return `${amountSignTag} ${amountTag} ${label}`
}

const globalModel = async (classifierOptions, transactions) => {
  globalModelLog('info', 'Fetching parameters from the stack')
  let parameters

  try {
    parameters = await getParameters()
    globalModelLog('info', 'Successfully fetched parameters from the stack')
  } catch (e) {
    globalModelLog('info', e)
    return
  }

  globalModelLog('info', 'Instanciating a new classifier')
  const classifier = createClassifier(parameters, classifierOptions)

  for (const transaction of transactions) {
    const label = getLabelWithTags(transaction)
    globalModelLog('info', `Applying model to ${label}`)

    const { category, proba } = maxBy(
      classifier.categorize(label).likelihoods,
      'proba'
    )

    transaction.cozyCategoryId = category
    transaction.cozyCategoryProba = proba

    globalModelLog('info', `Results for ${label} :`)
    globalModelLog('info', `cozyCategory: ${category}`)
    globalModelLog('info', `cozyProba: ${proba}`)
  }
}

// The local model is disabled for now because we found an issue with it
// eslint-disable-next-line no-unused-vars
const localModel = async (classifierOptions, transactions) => {
  localModelLog('info', 'Instanciating a new classifier')
  const classifier = await createLocalClassifier()

  if (!classifier) {
    localModelLog(
      'info',
      'No classifier, impossible to categorize transactions'
    )
    return
  }

  for (const transaction of transactions) {
    const label = getLabelWithTags(transaction)
    localModelLog('info', `Applying model to ${label}`)

    const { category, proba } = maxBy(
      classifier.categorize(label).likelihoods,
      'proba'
    )

    transaction.localCategoryId = category
    transaction.localCategoryProba = proba

    localModelLog('info', `Results for ${label} :`)
    localModelLog('info', `localCategory: ${category}`)
    localModelLog('info', `localProba: ${proba}`)
  }

  const tracker = getTracker(__TARGET__, { e_a: 'LocalCategorization' })
  const nbTransactionsAboveThreshold = transactions.reduce(
    (sum, transaction) => {
      if (transaction.localCategoryProba > LOCAL_MODEL_USAGE_THRESHOLD) {
        return sum + 1
      }

      return sum
    },
    0
  )

  tracker.trackEvent({
    e_n: 'TransactionsUsingLocalCategory',
    e_v: nbTransactionsAboveThreshold
  })
}

export const categorizes = async transactions => {
  const classifierOptions = { tokenizer }

  await Promise.all([
    globalModel(classifierOptions, transactions)
    // localModel(classifierOptions, transactions)
  ])

  return transactions
}

export const sendTransactions = async transactions => {
  const log = logger.namespace('categorization-send-transactions')

  const transactionsToSend = transactions.map(transaction =>
    pick(transaction, [
      'amount',
      'date',
      'label',
      'automaticCategoryId',
      'metadata.version',
      'manualCategoryId',
      'cozyCategoryId',
      'cozyCategoryProba',
      'localCategoryId',
      'localCategoryProba'
    ])
  )

  try {
    await cozyClient.fetchJSON(
      'POST',
      '/remote/cc.cozycloud.autocategorization',
      {
        data: JSON.stringify(transactionsToSend)
      }
    )
  } catch (e) {
    log('info', 'Error while sending transactions')
    log('info', e)
  }
}
