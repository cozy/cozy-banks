const fs = require('fs')
const _ = require('lodash')
const { transactionsNotif } = require('./templates')

const log = console.log.bind(console)
const { mjml2html } = require('mjml')

const prepareAccounts = function (transactions) {
  const byAccounts = _.groupBy(transactions, tr => tr.account)

  Object.keys(byAccounts).forEach(account => {
    byAccounts[account] = _.groupBy(
      byAccounts[account],
      tr => tr.date.slice(0, 10)
    )
  })
  return byAccounts
}

const accounts = _.fromPairs(require('./data/accounts').map(account => [account._id, account]))
const byAccounts = prepareAccounts(require('./data/transactions'))

const data = {
  accounts: accounts,
  byAccounts: byAccounts,
  date: '20 novembre 2017'
}

const obj = mjml2html(transactionsNotif(data))
obj.errors.forEach(err => {
  console.warn(err.formattedMessage)
})

if (!obj.errors.length) {
  fs.writeFileSync('index.html', obj.html)
}
