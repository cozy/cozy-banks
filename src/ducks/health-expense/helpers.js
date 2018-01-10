export const getVendors = transaction => {
  return transaction.reimbursements
    ? transaction.reimbursements.map(reimbursement => reimbursement && reimbursement.bill && reimbursement.bill.vendor).filter(Boolean)
    : []
}
