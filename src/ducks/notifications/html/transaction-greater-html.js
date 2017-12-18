const { fromPairs } = require('lodash')
const templates = require('./templates')
const { mjml2html } = require('mjml')
const { prepareTransactions } = require('./utils')

export default ({accounts, transactions}) => {
  const accountsById = fromPairs(accounts.map(account => [account._id, account]))
  const transactionsByAccounts = prepareTransactions(transactions)

  const data = {
    accounts: accountsById,
    byAccounts: transactionsByAccounts,
    date: new Date()
  }

  const obj = mjml2html(templates['transaction-greater'](data))
  obj.errors.forEach(err => {
    console.warn(err.formattedMessage)
  })

  if (obj.html) {
    return obj.html
  } else {
    throw new Error('Error during HTML generation')
  }
}
