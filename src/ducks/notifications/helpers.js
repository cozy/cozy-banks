import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import { getAccountBalance } from 'ducks/account/helpers'
import { ONE_DAY } from 'ducks/recurrence/constants'

export const isTransactionAmountGreaterThan = max => transaction => {
  // Math.abs(null) === 0
  if (max === null) return false
  const maxAmount = Math.abs(max)

  return Math.abs(transaction.amount) > maxAmount
}

export const getReimbursementBillId = reimbursement =>
  reimbursement.billId && reimbursement.billId.split(':')[1]

export const getReimbursementBillIds = transactions => {
  const billIds = uniq(
    flatten(
      transactions.map(transaction => {
        return (
          transaction.reimbursements &&
          transaction.reimbursements.map(getReimbursementBillId)
        )
      })
    )
  ).filter(Boolean)

  return billIds
}

export const getAccountNewBalance = creditCard => {
  return (
    getAccountBalance(creditCard.checkingsAccount.data) +
    getAccountBalance(creditCard)
  )
}

/**
 * Returns the next date at 6AM
 * if current date is between 23h - 6h
 */
export const getScheduleDate = currentDate => {
  let date = currentDate || new Date()
  const hours = 6
  const minutes = Math.round(15 * Math.random())

  if (date.getHours() >= 23) {
    date = new Date(+date + ONE_DAY)
  }

  if (date.getHours() <= 5 || date.getHours() >= 23) {
    date.setHours(hours)
    date.setMinutes(minutes)
  }

  return date
}
