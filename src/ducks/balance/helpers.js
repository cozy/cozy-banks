import { flatten, groupBy, sumBy, uniq, sortBy } from 'lodash'
import {
  min as getEarliestDate,
  isAfter as isDateAfter,
  isEqual as isDateEqual,
  subDays,
  startOfToday,
  parse as parseDate,
  format as formatDate
} from 'date-fns'

export const getBalanceHistories = (
  accounts,
  transactions,
  from = startOfToday()
) => {
  if (accounts.length === 0 || transactions.length === 0) {
    return null
  }

  const balances = accounts.reduce((balances, account) => {
    balances[account._id] = getBalanceHistory(
      account,
      getTransactionsForAccount(account._id, transactions),
      from
    )

    return balances
  }, {})

  balances.all = sumAllBalancesByDate(balances)

  return balances
}

/**
 * Get transactions that match an account id in a set of transactions
 * @param {number} accountId - The ID of the account
 * @param {Object[]} transactions - The transactions to filter
 * @returns {Object[]}
 */
export const getTransactionsForAccount = (accountId, transactions) =>
  transactions.filter(t => t.account === accountId)

/**
 * Get balance history for an account
 * @param {Object} account - The account we want to get the balance history
 * @param {Object[]} transactions - The transactions of the account
 * @param {Date} from - The date from which we want to get balance history
 * @returns {Object} The balance history indexed by dates (YYYY-MM-DD)
 */
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

export const sortBalanceHistoryByDate = history => {
  const balanceHistory = sortBy(Object.entries(history), ([date]) => date)
    .reverse()
    .map(([date, balance]) => ({
      x: parseDate(date),
      y: balance
    }))

  return balanceHistory
}
