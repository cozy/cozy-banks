const { operationsFilters } = require('./operationsFilters')
const { findNeighboringOperations } = require('./findNeighboringOperations')
const { sortedOperations } = require('./helpers')

const findOperation = (cozyClient, bill, options, allOperations) => {
  // By default, a bill is an expense. If it is not, it should be
  // declared as a refund: isRefund=true.
  if (options.credit && !bill.isRefund) return
  return findNeighboringOperations(
    cozyClient,
    bill,
    options,
    allOperations
  ).then(operations => {
    operations = operationsFilters(bill, operations, options)
    operations = sortedOperations(bill, operations)
    return operations[0]
  })
}

const findDebitOperation = findOperation
const findCreditOperation = (cozyClient, bill, options, allOperations) => {
  const creditOptions = Object.assign({}, options, { credit: true })
  return findOperation(cozyClient, bill, creditOptions, allOperations)
}

module.exports = {
  findDebitOperation,
  findCreditOperation
}
