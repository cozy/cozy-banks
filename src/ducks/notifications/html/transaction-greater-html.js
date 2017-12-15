const _ = require('lodash')
const templates = require('./templates')
const { mjml2html } = require('mjml')

const prepareTransactions = function (transactions) {
  const byAccounts = _.groupBy(transactions, tr => tr.account)

  Object.keys(byAccounts).forEach(account => {
    byAccounts[account] = _.groupBy(
      byAccounts[account],
      tr => tr.date.slice(0, 10)
    )
  })
  return byAccounts
}

export default ({accounts, transactions}) => {
  const accountsById = _.fromPairs(accounts.map(account => [account._id, account]))
  const transactionsByAccounts = prepareTransactions(transactions)

  const data = {
    accounts: accountsById,
    byAccounts: transactionsByAccounts,
    date: '20 novembre 2017'
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
