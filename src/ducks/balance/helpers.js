import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import getEarliestDate from 'date-fns/min'
import isDateAfter from 'date-fns/is_after'
import isDateEqual from 'date-fns/is_equal'
import subDays from 'date-fns/sub_days'
import startOfToday from 'date-fns/start_of_today'
import formatDate from 'date-fns/format'

export const getBalanceHistories = (accounts, transactions) => {
  if (accounts.length === 0 || transactions.length === 0) {
    return null
  }

  const balances = accounts.reduce((balances, account) => {
    balances[account.id] = getBalanceHistory(
      account,
      getTransactionsForAccount(account, transactions),
      startOfToday()
    )

    return balances
  }, {})

  return balances
}

const getTransactionsForAccount = (account, transactions) =>
  transactions.filter(t => t.account === account.id)

export const getBalanceHistory = (account, transactions, from) => {
  const DATE_FORMAT = 'YYYY-MM-DD'

  const transactionsByDate = groupBy(transactions, t =>
    formatDate(t.date, DATE_FORMAT)
  )
  const mostDistantDay =
    Object.keys(transactionsByDate).length > 0
      ? getEarliestDate(...Object.keys(transactionsByDate))
      : from

  const balances = []

  for (
    let day = from, balance = account.balance;
    isDateAfter(day, mostDistantDay) || isDateEqual(day, mostDistantDay);
    day = subDays(day, 1)
  ) {
    const transactions = transactionsByDate[formatDate(day, DATE_FORMAT)]
    balance = transactions
      ? balance - sumBy(transactions, t => t.amount)
      : balance

    balances.push({
      date: formatDate(day, DATE_FORMAT),
      balance
    })
  }

  return balances
}
