import { groupBy, sortBy, toPairs, flow } from 'lodash'

const getDay = date => date.slice(0, 10)

export const prepareTransactions = function (transactions) {
  const byAccounts = groupBy(transactions, tr => tr.account)

  const groupAndSortByDate = flow(
    transactions => groupBy(transactions, tr => getDay(tr.date)),
    toPairs,
    dt => sortBy(dt, ([date, transactions]) => date).reverse()
  )
  Object.keys(byAccounts).forEach(account => {
    byAccounts[account] = groupAndSortByDate(byAccounts[account])
  })

  return byAccounts
}
