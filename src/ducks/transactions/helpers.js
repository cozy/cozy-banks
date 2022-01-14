import find from 'lodash/find'
import findLast from 'lodash/findLast'
import get from 'lodash/get'
import sumBy from 'lodash/sumBy'

import flag from 'cozy-flags'

import { differenceInDays, parse as parseDate } from 'date-fns'
import {
  isHealthExpense,
  isProfessionalExpense
} from 'ducks/categories/helpers'
import { destroyRecurrenceIfEmpty } from 'ducks/recurrence/api'
import { NOT_RECURRENT_ID } from 'ducks/recurrence/constants'

export { default as getCategoryId } from './getCategoryId'

const prevRecurRx = /\bPRLV SEPA RECU RCUR\b/
const longNumber = /\b\d{5,}\b/g
const notWord = /\b[A-Z]*\d+[A-Z]*\b/g
const tooLong = /\b[A-Z\d]{15,}\b/g
const punctuations = /[-:++]/g
const spaces = /\s+/g

const cleanLabel = flag('transactions.clean-label')
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

export const getAccountType = transaction => {
  return get(transaction, 'account.data.type')
}

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
  if (!date) {
    throw new Error(`Cannot get date on transaction ${transaction.label}`)
  }
  return date.slice(0, 10)
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

export const isExpense = transaction => transaction.amount < 0

export const getReimbursements = transaction => {
  return get(transaction, 'reimbursements.data')
}

export const getReimbursementsBills = transaction => {
  const reimbursements = get(transaction, 'reimbursements.data', [])
  const bills = reimbursements.map(r => r.bill).filter(Boolean)

  return bills
}

export const hasReimbursements = transaction => {
  const reimbursements = getReimbursements(transaction)

  if (!reimbursements) {
    return false
  }

  return reimbursements.length > 0
}

export const REIMBURSEMENTS_STATUS = {
  noReimbursement: 'no-reimbursement',
  pending: 'pending',
  reimbursed: 'reimbursed',
  late: 'late'
}

export const getBills = transaction => {
  const allBills = get(transaction, 'bills.data', [])

  return allBills.filter(Boolean)
}

export const hasBills = transaction => {
  const bills = getBills(transaction)

  return bills.length > 0
}

export const getReimbursedAmount = expense => {
  if (!isExpense(expense)) {
    throw new Error("Can't get the reimbursed amount of a debit transaction")
  }

  if (!hasReimbursements(expense)) {
    return 0
  }

  const reimbursements = getReimbursements(expense)

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

export const getHealthExpenseReimbursementStatus = transaction => {
  if (transaction.reimbursementStatus) {
    return transaction.reimbursementStatus
  }

  return hasReimbursements(transaction)
    ? REIMBURSEMENTS_STATUS.reimbursed
    : REIMBURSEMENTS_STATUS.pending
}

const getProfessionalExpenseReimbursementStatus = transaction => {
  return transaction.reimbursementStatus || 'pending'
}

export const getReimbursementStatus = transaction => {
  if (isHealthExpense(transaction)) {
    return getHealthExpenseReimbursementStatus(transaction)
  }

  if (isProfessionalExpense(transaction)) {
    return getProfessionalExpenseReimbursementStatus(transaction)
  }

  return transaction.reimbursementStatus || 'no-reimbursement'
}

export const isReimbursementLate = (transaction, lateLimitInDays) => {
  if (!isHealthExpense(transaction)) {
    return false
  }

  const status = getReimbursementStatus(transaction)

  if (status !== REIMBURSEMENTS_STATUS.pending) {
    return false
  }

  const transactionDate = parseDate(getDate(transaction))
  const today = new Date()

  return differenceInDays(today, transactionDate) > lateLimitInDays
}

export const hasPendingReimbursement = transaction => {
  return getReimbursementStatus(transaction) === REIMBURSEMENTS_STATUS.pending
}

export const isAlreadyNotified = (transaction, notificationClass) => {
  return Boolean(
    get(
      transaction,
      `cozyMetadata.notifications.${notificationClass.settingKey}`
    )
  )
}

export const setTransactionCategory = (transaction, category) => {
  const newTransaction = {
    ...transaction,
    manualCategoryId: category.id
  }
  return newTransaction
}

export const updateTransactionRecurrence = async (
  client,
  transaction,
  recurrence
) => {
  const oldRecurrence = get(transaction, 'relationships.recurrence.data')
  const recurrenceRelationshipData = {
    _id: recurrence._id,
    _type: recurrence._type
  }
  transaction.recurrence.set(recurrenceRelationshipData)

  const { data } = await client.save(transaction)

  // Check if we need to delete an empty recurrence
  if (oldRecurrence && oldRecurrence._id !== NOT_RECURRENT_ID) {
    await destroyRecurrenceIfEmpty(client, oldRecurrence)
  }

  return data
}

const isSameMonth = (dateStr, otherDateStr) => {
  return (
    dateStr && otherDateStr && dateStr.slice(0, 7) == otherDateStr.slice(0, 7)
  )
}

export const getApplicationDate = transaction => {
  if (isSameMonth(transaction.applicationDate, transaction.date)) {
    return null
  }
  return transaction.applicationDate
}

export const updateApplicationDate = async (
  client,
  transaction,
  applicationDate
) => {
  const date = getDisplayDate(transaction)
  let applicationDateToUse = applicationDate
  if (isSameMonth(date, applicationDate)) {
    applicationDateToUse = '' // reset the application date
  }
  const { data } = await client.save({
    ...transaction,
    applicationDate: applicationDateToUse
  })
  return data
}

/**
 * Merge data of transactions fetched by date and transactions fetched by applicationDate
 * @param {array} param.transactionsByDate - Data of transactions fetched by date
 * @param {array} param.transactionsByApplicationDate - Data of transactions fetched by applicationDate
 * @returns
 */
export const computeTransactionsByDateAndApplicationDate = ({
  transactionsByDate,
  transactionsByApplicationDate
}) => {
  // these are query result data. Could be null if the fetch is not finished
  if (!transactionsByDate || !transactionsByApplicationDate) return []

  const newTransactionsByDate = transactionsByDate.filter(
    transaction => !transaction.applicationDate
  )

  return [...newTransactionsByDate, ...transactionsByApplicationDate]
}
