import { cozyClient, log } from 'cozy-konnector-libs'
import { maxBy, pick } from 'lodash'
import { tokenizer, createClassifier } from '.'
import bayes from 'classificator'
import { getLabel } from 'ducks/transactions/helpers'
import { TRANSACTION_DOCTYPE } from 'doctypes'

export const PARAMETERS_NOT_FOUND = 'Classifier files is not configured.'

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

  log('info', 'Fetching manually categorized transactions')
  const index = await cozyClient.data.defineIndex(TRANSACTION_DOCTYPE, [
    'manualCategoryId'
  ])
  const transactions = await getTransWithManualCat([], index, 100)
  log(
    'info',
    `Fetched ${transactions.length} manually categorized transactions`
  )

  if (transactions.length === 0) {
    return null
  }

  log('info', 'Instanciating a fresh classifier')
  const options = { tokenizer, alpha: 0.1 }
  const classifier = bayes(options)

  log('info', 'Learning from manually categorized transactions')
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

export const categorizes = async transactions => {
  const options = { tokenizer }

  log('info', 'Get parameters from the stack')
  const parameters = await getParameters()

  log('info', 'Instanciating a classifier with the parameters')
  const cozyClassifier = createClassifier(parameters, options)
  const localClassifier = await createLocalClassifier()

  log(
    'info',
    'Applying global and local models to new and modified transactions'
  )
  for (const transaction of transactions) {
    const label = getLabelWithTags(transaction)
    const { category: cozyCategory, proba: cozyProba } = maxBy(
      cozyClassifier.categorize(label).likelihoods,
      'proba'
    )

    transaction.cozyCategoryId = cozyCategory
    transaction.cozyCategoryProba = cozyProba

    log('info', `label: ${label}`)
    log('info', `cozyCategory: ${cozyCategory}`)
    log('info', `cozyProba: ${cozyProba}`)

    if (localClassifier) {
      const { category: localCategory, proba: localProba } = maxBy(
        localClassifier.categorize(label).likelihoods,
        'proba'
      )

      log('info', `localCategory: ${localCategory}`)
      log('info', `localProba: ${localProba}`)
      transaction.localCategoryId = localCategory
      transaction.localCategoryProba = localProba
    }
  }

  return transactions
}

export const sendTransactions = async transactions => {
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
