/* global __TARGET__ */

import logger from 'cozy-logger'
import { maxBy, pick, uniq } from 'lodash'
import { tokenizer, createClassifier } from '.'
import bayes from 'classificator'
import { getLabel } from 'ducks/transactions/helpers'
import { Document } from 'cozy-doctypes'
import { Transaction } from 'models'
import { LOCAL_MODEL_USAGE_THRESHOLD } from 'ducks/categories/helpers'
import { getTracker } from 'ducks/tracking'

const localModelLog = logger.namespace('local-categorization-model')
const globalModelLog = logger.namespace('global-categorization-model')

export const PARAMETERS_NOT_FOUND = 'Classifier files is not configured.'

const ALPHA_MIN = 0.1
const ALPHA_MAX = 10
const ALPHA_MAX_SMOOTHING = 2
const FAKE_TRANSACTION = {
  label: 'thisisafaketransaction',
  manualCategoryId: '0'
}

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

/**
 * Create a ready to use classifier for the local categorization model
 * @param {Array} transactionsToLearn - Transactions to learn from
 * @param {Object} intializationOptions - Options to pass to the classifier initialization
 * @param {Object} configurationOptions - Options used to configure the classifier
 */
export const createLocalClassifier = (
  transactionsToLearn,
  initializationOptions,
  configurationOptions
) => {
  if (transactionsToLearn.length === 0) {
    localModelLog(
      'info',
      'Impossible to instanciate a classifier since there is no manually categorized transactions to learn from'
    )
    return null
  }

  const classifier = bayes(initializationOptions)

  localModelLog('info', 'Learning from manually categorized transactions')
  for (let i = 0; i < configurationOptions.learnSampleWeight; ++i) {
    for (const transaction of transactionsToLearn) {
      classifier.learn(
        getLabelWithTags(transaction),
        transaction.manualCategoryId
      )
    }
  }

  if (configurationOptions.addFakeTransaction) {
    classifier.learn(FAKE_TRANSACTION.label, FAKE_TRANSACTION.manualCategoryId)
  }

  return classifier
}

class BankClassifier extends Document {
  static async fetchParameters() {
    try {
      const parameters = await this.cozyClient.fetchJSON(
        'GET',
        '/remote/assets/bank_classifier_nb_and_voc'
      )
      return parameters
    } catch (e) {
      throw new Error(PARAMETERS_NOT_FOUND)
    }
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
    parameters = await BankClassifier.fetchParameters()
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

const localModel = async (classifierOptions, transactions) => {
  localModelLog('info', 'Fetching manually categorized transactions')
  const transactionsWithManualCat = await Transaction.queryAll({
    manualCategoryId: { $exists: true }
  })
  localModelLog(
    'info',
    `Fetched ${
      transactionsWithManualCat.length
    } manually categorized transactions`
  )

  localModelLog('info', 'Instanciating a new classifier')
  const uniqueCategories = getUniqueCategories(transactionsWithManualCat)
  const nbUniqueCategories = uniqueCategories.length
  localModelLog(
    'debug',
    'Number of unique categories in transactions with manual categories: ' +
      nbUniqueCategories
  )
  const alpha = getAlphaParameter(
    nbUniqueCategories,
    ALPHA_MIN,
    ALPHA_MAX,
    ALPHA_MAX_SMOOTHING
  )
  localModelLog('debug', 'Alpha parameter value is ' + alpha)

  var addFakeTransaction = false
  if (nbUniqueCategories === 1) {
    localModelLog(
      'info',
      'Not enough different categories, adding a fake transaction to balance the weight of the categories'
    )
    addFakeTransaction = true
    // transactionsWithManualCat.push(FAKE_TRANSACTION)
  }

  // With these constants (1, 1, 2) it is actually useless but let's keep them
  const MIN_SAMPLE_WEIGHT = 1
  const MAX_SAMPLE_WEIGHT = 1
  const MIN_WEIGHT_LIMIT = 2
  const learnSampleWeight =
    transactionsWithManualCat.length > MIN_WEIGHT_LIMIT
      ? MIN_SAMPLE_WEIGHT
      : MAX_SAMPLE_WEIGHT
  localModelLog('debug', 'Learn sample weight is ' + learnSampleWeight)

  const classifier = createLocalClassifier(
    transactionsWithManualCat,
    { ...classifierOptions, alpha },
    { learnSampleWeight, addFakeTransaction }
  )

  if (!classifier) {
    localModelLog(
      'info',
      'No classifier, impossible to categorize transactions'
    )
    return
  }

  localModelLog('info', `Applying model to ${transactions.length} transactions`)
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
    globalModel(classifierOptions, transactions),
    localModel(classifierOptions, transactions)
  ])

  return transactions
}

export class AutoCategorization extends Document {
  async sendTransactions(transactions) {
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
      await this.cozyClient.fetchJSON(
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
}
