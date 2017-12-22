import bayes from 'classificator'
// import categorizesTree from 'ducks/categories/tree.json'
import toLearn from './set_label_cat.json'

const DATE_TAG = 'tag_date'
const DATE_REGEX = /\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}\/\d{1,2}/g
const UNNECESSARY_CHARS_REGEX = /[^a-zA-Z_ ]/g
const MAX_WORD = 3

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
    return token.length >= 2;
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

export const createClassifier = () => {
  const options = {
    tokenizer
  }
  const classifier = bayes(options)
  for (const {label, category} of toLearn) {
    classifier.learn(label, category)
  }

  // Display classifier to compare with python file
  // console.log('classifier', classifier.toJson())

  return classifier
}

const classifier = createClassifier()

export const categorize = label => {
  const predicted = classifier.categorize(label, true)

  // Display likelihoods (statistic)
  // console.log(predicted.likelihoods)

  const categoryId = predicted.predictedCategory

  // Display category name
  // console.log(categoryId, categorizesTree[categoryId])

  return categoryId
}
