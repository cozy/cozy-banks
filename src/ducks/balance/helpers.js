import { flatten, groupBy, sumBy, uniq } from 'lodash'
import {
  min as getEarliestDate,
  isAfter as isDateAfter,
  isEqual as isDateEqual,
  subDays,
  startOfToday,
  format as formatDate
} from 'date-fns'

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

  balances.all = sumAllBalancesByDate(balances)

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

  const balances = {}

  for (
    let day = from, balance = account.balance;
    isDateAfter(day, mostDistantDay) || isDateEqual(day, mostDistantDay);
    day = subDays(day, 1)
  ) {
    const transactions = transactionsByDate[formatDate(day, DATE_FORMAT)]
    balance = transactions
      ? balance - sumBy(transactions, t => t.amount)
      : balance

    balances[formatDate(day, DATE_FORMAT)] = balance
  }

  return balances
}

const sumAllBalancesByDate = accountsBalances => {
  const allDates = uniq(
    flatten(Object.values(accountsBalances).map(item => Object.keys(item)))
  )

  const balances = {}

  for (const date of allDates) {
    for (const accountBalances of Object.values(accountsBalances)) {
      const balance = balances[date] || 0
      const accountBalance = accountBalances[date] || 0
      balances[date] = balance + accountBalance
    }
  }

  return balances
}
