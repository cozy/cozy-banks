const keyBy = require('lodash/keyBy')
const templates = require('./templates')
const { renderMJML } = require('./utils')
const { prepareTransactions } = require('./utils')

export default ({ accounts, transactions, bills, urls }) => {
  const accountsById = keyBy(accounts, '_id')
  const billsById = keyBy(bills, '_id')
  const transactionsByAccounts = prepareTransactions(transactions)

  const data = {
    accounts: accountsById,
    byAccounts: transactionsByAccounts,
    bills: billsById,
    date: new Date(),
    ...urls
  }

  return renderMJML(templates['health-bill-linked'](data))
}
