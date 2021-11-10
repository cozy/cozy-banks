import { getCurrencySymbol } from 'utils/currencySymbol'
import capitalize from 'lodash/capitalize'

export const MAX_CHAR_BY_LINE = 50
const SEPARATOR = ' : '

const capitalizeEachWords = str =>
  str
    .split(' ')
    .map(capitalize)
    .join(' ')

export const formatTransaction = transaction => {
  const { amount, currency } = transaction
  const amountFormat = `${amount}${getCurrencySymbol(currency)}`.replace(
    '.',
    ','
  )
  const REMAINS_LENGTH =
    MAX_CHAR_BY_LINE - SEPARATOR.length - amountFormat.length
  const labelCapitalize = capitalizeEachWords(transaction.label)
  const transactionName = labelCapitalize.substr(0, REMAINS_LENGTH)
  return `${transactionName}${SEPARATOR}${amountFormat}`
}
