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

const ALPHA_MIN = 2
const ALPHA_MAX = 4
const ALPHA_MAX_SMOOTHING = 12
const FAKE_TRANSACTION = {
  label: 'thisisafaketransaction',
  manualCategoryId: '0'
}
/**
 * List of every combinations of tokens related to amounts:
 * - a tag for the amount's sign
 * - a tag for the amount's magnitude
 */
const TOKENS_TO_REWEIGHT = [
  'tag_neg',
  'tag_v_b_expense',
  'tag_neg tag_v_b_expense',
  'tag_b_expense',
  'tag_neg tag_b_expense',
  'tag_expense',
  'tag_neg tag_expense',
  'tag_noise_neg',
  'tag_neg tag_noise_neg',
  'tag_pos',
  'tag_noise_pos',
  'tag_pos tag_noise_pos',
  'tag_income',
  'tag_pos tag_income',
  'tag_b_income',
  'tag_pos tag_b_income',
  'tag_activity_income',
  'tag_pos tag_activity_income'
]

export const getUniqueCategories = transactions => {
  return uniq(transactions.map(t => t.manualCategoryId))
}

export const getAlphaParameter = (
  nbUniqueCategories,
  min,
  max,
  maxSmoothing
) => {
  if (nbUniqueCategories === 1) {
    return 1
  } else {
    const alpha = maxSmoothing / (nbUniqueCategories + 1)
    return Math.max(min, Math.min(max, alpha))
  }
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
  for (const transaction of transactionsToLearn) {
    classifier.learn(
      getLabelWithTags(transaction),
      transaction.manualCategoryId
    )
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
      globalModelLog('info', e.message)
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

const getLocalClassifierOptions = transactionsWithManualCat => {
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

  let addFakeTransaction = false
  if (nbUniqueCategories === 1) {
    localModelLog(
      'info',
      'Not enough different categories, adding a fake transaction to balance the weight of the categories'
    )
    addFakeTransaction = true
  }

  return {
    initialization: { alpha, fitPrior: false },
    configuration: { addFakeTransaction }
  }
}

/**
 * Reweights a word in the Naive Bayes parameter in order to mimic the
 * behavior of a sublinear TF-IDF vectorizer applied to this word.
 * The transformation applied is inspired by the scikit-learn object
 * `sklearn.feature_extraction.text.TfidfVectorizer` with `sublinear_tf`.
 * The `log(frequencyCount)` smooths the probabilities of a word across the
 * possible categories to avoid the probability of the most targeted category
 * to explode.
 * @param {*} classifier - classifier to reweight
 * @param {*} category - category in which to reweight a word
 * @param {*} word  - word to reweight
 * @param {*} frequencyCount - observed frequency count of this word in the given category
 */
export const reweightWord = (classifier, category, word, frequencyCount) => {
  const newFrequencyCount = 1 + Math.log(frequencyCount)
  const deltaFrequencyCount = frequencyCount - newFrequencyCount
  // update the right entries of the classifier's parameters
  classifier.vocabulary[word] -= deltaFrequencyCount
  classifier.wordCount[category] -= deltaFrequencyCount
  classifier.wordFrequencyCount[category][word] = newFrequencyCount
}

export const reweightModel = classifier => {
  // loop over categories in the wordFrequencyCat attribute
  const wordFrequencyCount = classifier.wordFrequencyCount
  // for each category
  for (const category of Object.keys(wordFrequencyCount)) {
    // extract its word-frequency count `wfc`
    const categoryWordsFrequencyCounts = wordFrequencyCount[category]
    // and search for tokens to reweight in it
    TOKENS_TO_REWEIGHT.map(wordToReweight => {
      if (categoryWordsFrequencyCounts.hasOwnProperty(wordToReweight)) {
        // for every tokens to reweight : re-compute frequency count `fc`
        const frequencyCount = categoryWordsFrequencyCounts[wordToReweight]
        if (frequencyCount !== 1) {
          reweightWord(classifier, category, wordToReweight, frequencyCount)
        }
      }
    })
  }
}

export const createLocalModel = async classifierOptions => {
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

  const options = getLocalClassifierOptions(transactionsWithManualCat)
  const classifier = createLocalClassifier(
    transactionsWithManualCat,
    { ...classifierOptions, ...options.initialization },
    options.configuration
  )

  if (!classifier) {
    localModelLog(
      'info',
      'No classifier, impossible to categorize transactions'
    )
    return
  } else {
    return classifier
  }
}

export const localModel = async (classifierOptions, transactions) => {
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

  const options = getLocalClassifierOptions(transactionsWithManualCat)
  const classifier = createLocalClassifier(
    transactionsWithManualCat,
    { ...classifierOptions, ...options.initialization },
    options.configuration
  )

  if (!classifier) {
    localModelLog(
      'info',
      'No classifier, impossible to categorize transactions'
    )
    return
  }

  localModelLog(
    'info',
    'Reweighting model to lower the impact of amount in the prediction'
  )
  reweightModel(classifier)

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
}

export const categorizes = async transactions => {
  const classifierOptions = { tokenizer }

  await Promise.all([
    globalModel(classifierOptions, transactions),
    localModel(classifierOptions, transactions)
  ])

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

  return transactions
}

export class AutoCategorization extends Document {
  static async sendTransactions(transactions) {
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
