import { isHealthExpense } from 'ducks/categories/helpers'
import assert from 'utils/assert'
import { getAccounts, getBills } from 'selectors'
import { find } from 'lodash'

const getBillId = idWithDoctype => idWithDoctype && idWithDoctype.split(':')[1]
export const hydrateReimbursementWithBill = (reimbursement, getBill) => {
  const billId = getBillId(reimbursement.billId)
  return !billId
    ? reimbursement
    : {
        ...reimbursement,
        bill: getBill(billId)
      }
}

const hydrateTransactionWithAccount = (state, transaction) => {
  const accounts = getAccounts(state)
  const account = find(accounts, account => account._id === transaction.account)

  return {
    ...transaction,
    account
  }
}

export const hydrateTransaction = (state, originalTransaction) => {
  assert(state, 'hydrateTransactions takes state as 1st argument')
  assert(
    originalTransaction,
    'hydrateTransactions takes transaction as 2nd argument'
  )

  const transaction = hydrateTransactionWithAccount(state, originalTransaction)

  if (!isHealthExpense(transaction)) {
    return transaction
  }

  // TODO perf, index bills by id
  const getBill = billId => getBills(state).find(bill => billId == bill._id)

  transaction.reimbursements = transaction.reimbursements || []
  transaction.reimbursements = transaction.reimbursements.map(r =>
    hydrateReimbursementWithBill(r, getBill)
  )

  return transaction
}

export const getLabel = transaction =>
  transaction.label.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())

export const getDate = transaction => transaction.date.slice(0, 10)
