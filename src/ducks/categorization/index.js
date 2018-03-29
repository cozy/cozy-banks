import bayes from 'classificator'

const DATE_TAG = 'tag_date'
const DATE_REGEX = /\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}\/\d{1,2}/g
const UNNECESSARY_CHARS_REGEX = /[^a-zA-Z_ ]/g
const MAX_WORD = 3
const DEFAULT_CATEGORY = '0'
const PROBA_LIMIT = 10 / 100

export const format = label => {
  const stripAccents = label => {
    return label.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  }

  const replaceDate = label => {
    return label.replace(DATE_REGEX, DATE_TAG)
  }

  const removeUnnecessaryChars = label => {
    return label.replace(UNNECESSARY_CHARS_REGEX, '')
  }

  return removeUnnecessaryChars(replaceDate(stripAccents(label.toLowerCase())))
}

export const tokenizer = text => {
  const sanitized = format(text)
  const words = sanitized.split(/\s+/).filter(token => {
    return token.length >= 2
  })
  let tokens = []
  let countWord = MAX_WORD
  while (countWord !== 0) {
    if (words.length >= countWord) {
      for (let start = 0; start + countWord < words.length + 1; start++) {
        const token = words.slice(start, start + countWord).join(' ')
        tokens.push(token)
      }
    }
    countWord--
  }
  return tokens
}

export const createClassifier = (data, options = {}) => {
  // Use for automated tests only while we don't have a clean parameters JSON file
  // We can remove this when we have it, and update the tests to use it
  if (!data) {
    const toLearn = require('./set_label_cat.json')

    const classifier = bayes(options)

    for (const {label, category} of toLearn) {
      classifier.learn(label, category)
    }

    return classifier
  }

  data.options = {
    ...data.options,
    ...options
  }

  const classifier = bayes.fromJson(data)

  // Display classifier to compare with python file
  // console.log('classifier', classifier.toJson())

  return classifier
}

export const categorize = (classifier, label) => {
  const predicted = classifier.categorize(label, true)

  // Display likelihoods (statistic)
  // console.log(predicted.likelihoods)

  const categoryId = predicted.likelihoods[0].proba > PROBA_LIMIT
    ? predicted.predictedCategory
    : DEFAULT_CATEGORY

  // Display category name
  // console.log(categoryId, categorizesTree[categoryId])

  return categoryId
}
