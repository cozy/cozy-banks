import { cozyClient, log } from 'cozy-konnector-libs'
import { maxBy } from 'lodash'
import { tokenizer, createClassifier } from '.'
import bayes from 'classificator'
import { getLabel } from 'ducks/transactions/helpers'

export const GLOBAL_PARAMETERS_NOT_FOUND = 'Classifier files is not configured.'
export const LOCAL_PARAMETERS_ERROR = "Can't fetch local parameters"

const getGlobalParameters = async () => {
  try {
    const parameters = await cozyClient.fetchJSON(
      'GET',
      '/remote/assets/bank_classifier_nb_and_voc'
    )
    return parameters
  } catch (e) {
    throw new Error(GLOBAL_PARAMETERS_NOT_FOUND)
  }
}

const getLocalParameters = async () => {
  try {
    const parameters = await cozyClient.data.findAll('io.cozy.ia.banks.localnb')
    return parameters[0]
  } catch (e) {
    if (e.message.includes('404')) {
      log('info', "Local parameters don't exist")
      return null
    }

    log('info', e.message)
    throw new Error(LOCAL_PARAMETERS_ERROR)
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

const globalModel = async transactions => {
  const options = { tokenizer }

  log('info', 'Get global categorization model form the stack')
  const parameters = await getGlobalParameters()

  log('info', 'Instanciating a classifier with the received parameters')
  const classifier = createClassifier(parameters, options)

  log('info', 'Categorizing transactions')
  for (const transaction of transactions) {
    log('info', 'Getting label of the transaction')
    const label = getLabelWithTags(transaction)
    log('info', 'Categorizing single transaction')
    const { category, proba } = maxBy(
      classifier.categorize(label).likelihoods,
      'proba'
    )

    log('info', 'Categorized transaction with the global model :')
    log('info', `label: ${label}`)
    log('info', `cozyCategory: ${category}`)
    log('info', `cozyProba: ${proba}`)
    transaction.cozyCategoryId = category
    transaction.cozyCategoryProba = proba
  }

  return transactions
}

const localModel = async transactions => {
  log('info', 'Filtering manually categorized transactions')
  const manuallyCategorizedTransactions = transactions.filter(
    transaction => transaction.manualCategoryId != null
  )

  const classifierOptions = { tokenizer }

  log('info', 'Fetching local parameters from stack')
  const parameters = await getLocalParameters()

  let classifier

  if (parameters) {
    log('info', 'Instanciating a classifier with the local parameters')
    classifier = createClassifier(parameters, classifierOptions)
  } else {
    log('info', 'Instanciating a fresh classifier')
    classifier = bayes(classifierOptions)
  }

  log('info', 'Learning from new manually categorized transactions')
  for (const manuallyCategorizedTransaction of manuallyCategorizedTransactions) {
    classifier.learn(
      getLabelWithTags(manuallyCategorizedTransaction),
      manuallyCategorizedTransaction.manualCategoryId
    )
  }

  log('info', 'Applying local model to all new transactions')
  for (const transaction of transactions) {
    const label = getLabelWithTags(transaction)
    const { category, proba } = maxBy(
      classifier.categorize(label).likelihoods,
      'proba'
    )

    log('info', 'Categorized transaction with the local model :')
    log('info', `label: ${label}`)
    log('info', `localCategory: ${category}`)
    log('info', `localProba: ${proba}`)
    transaction.localCategoryId = category
    transaction.localCategoryProba = proba
  }

  log('info', 'Updating model on server')
  const newModel = JSON.parse(classifier.toJson())

  try {
    if (parameters) {
      await cozyClient.data.update('io.cozy.ia.banks.localnb', parameters, {
        _id: parameters._id,
        ...newModel
      })
    } else {
      await cozyClient.data.create('io.cozy.ia.banks.localnb', newModel)
    }

    log('info', 'Updated model on server')
  } catch (e) {
    log('info', 'Error while updating model on server')
    throw e
  }

  return transactions
}

export const categorizes = async transactions => {
  transactions = await globalModel(transactions)
  transactions = await localModel(transactions)

  return transactions
}
