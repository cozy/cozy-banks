import { cozyClient, log } from 'cozy-konnector-libs'
import { maxBy } from 'lodash'
import { tokenizer, createClassifier } from '.'
import { getLabel } from 'ducks/transactions/helpers'

export const PARAMETERS_NOT_FOUND = 'Classifier files is not configured.'

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
  const label = getLabel(transaction)

  const amountSignTag = getAmountSignTag(transaction.amount)
  const amountTag = getAmountTag(transaction.amount)

  return `${amountSignTag} ${amountTag} ${label}`
}

export const categorizes = async transactions => {
  const options = { tokenizer }

  log('info', 'Get parameters from the stack')
  const parameters = await getParameters()

  log('info', 'Instanciating a classifier with the parameters')
  const classifier = createClassifier(parameters, options)

  for (const transaction of transactions) {
    const label = getLabelWithTags(transaction)
    const { category, proba } = maxBy(
      classifier.categorize(label).likelihoods,
      'proba'
    )
    log('info', `label: ${label}`)
    log('info', `category: ${category}`)
    log('info', `proba: ${proba}`)
    transaction.cozyCategoryId = category
    transaction.cozyCategoryProba = proba
  }

  return transactions
}
