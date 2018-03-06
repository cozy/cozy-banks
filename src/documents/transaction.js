import { BILLS_DOCTYPE } from 'doctypes'
import { getDocument } from 'cozy-client'
import { isHealthExpense } from 'ducks/categories/helpers'
import assert from 'utils/assert'

const getBillId = idWithDoctype => idWithDoctype && idWithDoctype.split(':')[1]
const hydrateReimbursementWithBill = (state, reimbursement) => {
  const billId = getBillId(reimbursement.billId)
  return !billId ? reimbursement : {
    ...reimbursement,
    bill: getDocument(state, BILLS_DOCTYPE, billId)
  }
}

export const hydrateTransaction = (state, transaction) => {
  assert(state, 'hydrateTransactions takes state as 1st argument')
  assert(transaction, 'hydrateTransactions takes transaction as 2nd argument')
  if (!isHealthExpense(transaction)) {
    return transaction
  }

  transaction.reimbursements = transaction.reimbursements || []
  transaction.reimbursements = transaction.reimbursements
    .map(r => hydrateReimbursementWithBill(state, r))
  return transaction
}
