import { flatten, groupBy, sumBy, uniq } from 'lodash'
import {
  min as getEarliestDate,
  isAfter as isDateAfter,
  isEqual as isDateEqual,
  subDays,
  startOfToday,
  parse as parseDate,
  format as formatDate
} from 'date-fns'

/**
 * Get balance histories for a set of accounts
 * @param {Object[]} accounts - The accounts we want to get the balance histories
 * @param {Object[]} transactions - The transactions
 * @param {Date} from - The date from which we want to get balance history
 * @returns {Object} The balance histories
 */
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

  return balances
}

/**
 * Get transactions that match an account id in a set of transactions
 * @param {number} accountId - The ID of the account
 * @param {Object[]} transactions - The transactions to filter
 * @returns {Object[]}
 */
export const getTransactionsForAccount = (accountId, transactions) => {
  return transactions.filter(t => {
    const toCompare = t.account.data ? t.account.data._id : t.account

    return accountId === toCompare
  })
}

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

/**
 * Returns all the unique dates for a given array of balance histories
 * @param {Object[]} histories - The array of balance histories
 * @returns {String[]} The dates
 */
export const getAllDates = histories => {
  return uniq(flatten(histories.map(Object.keys)))
}

/**
 * Sums a given array of balance histories on date
 * @param {Object[]} histories - The array of balance histories
 * @returns {Object} The summed balance history
 */
export const sumBalanceHistories = histories => {
  const allDates = getAllDates(histories)

  const history = {}

  for (const date of allDates) {
    history[date] = sumBy(histories, h => h[date])
  }

  return history
}

/**
 * Transforms a balance history to displayable chart data
 * @param {Object} history - The balance history to transform
 * @returns {Object[]}
 */
export const balanceHistoryToChartData = history => {
  const dates = getAllDates([history])
    .sort()
    .reverse()

  const data = dates.map(date => ({
    x: parseDate(date),
    y: history[date]
  }))

  return data
}
