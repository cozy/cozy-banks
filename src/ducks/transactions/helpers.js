import find from 'lodash/find'
import findLast from 'lodash/findLast'
import get from 'lodash/get'

export const getLabel = transaction =>
  transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())

export const getDisplayDate = transaction => {
  if (
    getAccountType(transaction) === 'CreditCard' &&
    transaction.realisationDate
  ) {
    return transaction.realisationDate
  }

  return transaction.date
}

export const getDate = transaction => {
  const date = getDisplayDate(transaction)
  return date.slice(0, 10)
}

export const getAccountType = transaction => {
  return get(transaction, 'account.data.type')
}

/**
 * Performs successive `find`s until one of the find functions returns
 * a result
 */
const multiFind = (arr, findFns) => {
  for (let findFn of findFns) {
    const res = findFn(arr)
    if (res) {
      return res
    }
  }
  return null
}

/**
 * Returns the first month having operations, closest to the given month.
 *
 * To know if we have to search in the past or the in the future, we check
 * if the chosen month is before or after the current month.
 */
export const findNearestMonth = (
  chosenMonth,
  currentMonth,
  availableMonths
) => {
  const findBeforeChosenMonth = months => findLast(months, x => x < chosenMonth)
  const findAfterChosenMonth = months => find(months, x => x > chosenMonth)
  const findFns =
    chosenMonth < currentMonth
      ? [findBeforeChosenMonth, findAfterChosenMonth]
      : [findAfterChosenMonth, findBeforeChosenMonth]
  return multiFind(availableMonths, findFns)
}
