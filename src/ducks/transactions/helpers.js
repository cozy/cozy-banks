import find from 'lodash/find'
import findLast from 'lodash/findLast'
import get from 'lodash/get'
import sumBy from 'lodash/sumBy'
import flag from 'cozy-flags'

const prevRecurRx = /\bPRLV SEPA RECU RCUR\b/
const longNumber = /\b\d{5,}\b/g
const notWord = /\b[A-Z]*\d+[A-Z]*\b/g
const tooLong = /\b[A-Z\d]{15,}\b/g
const punctuations = /[-:++]/g
const spaces = /\s+/g

const cleanLabel = flag('clean-label')
  ? label => {
      return label
        .replace(prevRecurRx, ' ')
        .replace(longNumber, ' ')
        .replace(notWord, '')
        .replace(punctuations, '')
        .replace(tooLong, '')
        .replace(spaces, ' ')
        .trim()
    }
  : x => x

const titleRx = /(?:^|\s)\S/g
const titleCase = label =>
  label.toLowerCase().replace(titleRx, a => a.toUpperCase())

export const getLabel = transaction => cleanLabel(titleCase(transaction.label))

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

const isExpense = transaction => transaction.amount < 0

export const getReimbursedAmount = expense => {
  if (!isExpense(expense)) {
    throw new Error("Can't get the reimbursed amount of a debit transaction")
  }

  const reimbursements = get(expense, 'reimbursements.target.reimbursements')
  const hasReimbursements = reimbursements && reimbursements.length > 0

  if (!hasReimbursements) {
    return 0
  }

  const reimbursedAmount = sumBy(reimbursements, r => r.amount)
  return reimbursedAmount
}

export const isFullyReimbursed = expense => {
  const reimbursedAmount = getReimbursedAmount(expense)

  return reimbursedAmount === -expense.amount
}

/*
 * A transaction is considered as new if its revision is lesser than or equals
 * to 2. This is because when a transaction is imported by a banking konnector
 * it is saved, then categorized and re-saved (by the konnector or by the
 * categorization service). It means that when a new transaction is handled by
 * the onOperationOrBillCreate service, its revision is already `2`. So if we
 * only consider transactions with revision `1`, we will miss the vast majority
 * of them. For all other cases, please see `utils/isCreatedDoc`
 */
export const isNew = transaction => {
  return parseInt(transaction._rev.split('-').shift(), 10) <= 2
}
