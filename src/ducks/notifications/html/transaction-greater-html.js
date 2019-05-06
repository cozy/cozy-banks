const { fromPairs } = require('lodash')
const templates = require('./templates')
const { renderMJML } = require('./utils')
const { prepareTransactions } = require('./utils')

export default ({ accounts, transactions, urls }) => {
  const accountsById = fromPairs(
    accounts.map(account => [account._id, account])
  )
  const transactionsByAccounts = prepareTransactions(transactions)

  const data = {
    accounts: accountsById,
    byAccounts: transactionsByAccounts,
    date: new Date(),
    ...urls
  }

  return renderMJML(templates['transaction-greater'](data))
}
