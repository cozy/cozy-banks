import { BILLS_DOCTYPE } from 'doctypes'
import { getDocument } from 'cozy-client'
import { isHealthExpense } from 'ducks/categories/helpers'
import assert from 'utils/assert'
import { getAccounts } from 'selectors'
import find from 'lodash/find'

const getBillId = idWithDoctype => idWithDoctype && idWithDoctype.split(':')[1]
const hydrateReimbursementWithBill = (state, reimbursement) => {
  const billId = getBillId(reimbursement.billId)
  return !billId
    ? reimbursement
    : {
        ...reimbursement,
        bill: getDocument(state, BILLS_DOCTYPE, billId)
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

  transaction.reimbursements = transaction.reimbursements || []
  transaction.reimbursements = transaction.reimbursements.map(r =>
    hydrateReimbursementWithBill(state, r)
  )

  return transaction
}
