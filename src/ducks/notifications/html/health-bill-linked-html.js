const { fromPairs } = require('lodash')
const templates = require('./templates')
const { mjml2html } = require('mjml')
const { prepareTransactions } = require('./utils')
const { BILLS_DOCTYPE } = require('../../../doctypes')

export default ({ accounts, transactions, bills }) => {
  const accountsById = fromPairs(
    accounts.map(account => [account._id, account])
  )
  const billsById = fromPairs(
    bills.map(bill => [`${BILLS_DOCTYPE}:${bill._id}`, bill])
  )

  const transactionsByAccounts = prepareTransactions(transactions)

  const data = {
    accounts: accountsById,
    byAccounts: transactionsByAccounts,
    bills: billsById,
    date: new Date()
  }

  const obj = mjml2html(templates['health-bill-linked'](data))
  obj.errors.forEach(err => {
    // eslint-disable-next-line no-console
    console.warn(err.formattedMessage)
  })

  if (obj.html) {
    return obj.html
  } else {
    throw new Error('Error during HTML generation')
  }
}
