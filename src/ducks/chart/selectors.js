import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import isAfter from 'date-fns/isAfter'
import subDays from 'date-fns/subDays'
import subMonths from 'date-fns/subMonths'

import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from 'ducks/balance/helpers'
import { getAccounts, getTransactions } from 'selectors'
import {
  getFilteredTransactions,
  getTransactionsFilteredByAccount,
  getFilteredAccounts
} from 'ducks/filters'
import { getCategoryId } from 'ducks/transactions/helpers'
import { createSelector } from 'reselect'

const getBalanceHistory = (accounts, transactions, to, from) => {
  const balanceHistories = getBalanceHistories(accounts, transactions, to, from)
  const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

  return balanceHistory
}

const propSelector = propName => (state, props) => props[propName]
const getRouter = propSelector('router')

const getCurrentCategory = createSelector(
  [getRouter],
  router => router.params.subcategoryName
)

const getFilteredTransactionsForChart = createSelector(
  [state => state, getCurrentCategory],
  (state, currentCategory) => {
    if (currentCategory) {
      return getFilteredTransactions(state)
    } else {
      return getTransactionsFilteredByAccount(state)
    }
  }
)

const getChartData = (
  accountsCol,
  transactionsCol,
  filteredTransactions,
  filteredAccounts,
  currentMonth
) => {
  const now = new Date()
  const cur = currentMonth ? new Date(currentMonth) : now

  let start = subDays(startOfMonth(cur), 1)
  let end = endOfMonth(cur)
  if (isAfter(end, now)) {
    end = now
    start = subMonths(end, 1)
  }

  const isLoading =
    (isQueryLoading(transactionsCol) && !hasQueryBeenLoaded(transactionsCol)) ||
    (isQueryLoading(accountsCol) && !hasQueryBeenLoaded(accountsCol))

  if (isLoading) {
    return null
  }

  const history = getBalanceHistory(
    filteredAccounts,
    filteredTransactions,
    end,
    start
  )
  const data = balanceHistoryToChartData(history)
  return data
}

export const getChartDataSelector = createSelector(
  [
    getAccounts,
    getTransactions,
    getFilteredTransactionsForChart,
    getFilteredAccounts,
    propSelector('currentMonth')
  ],
  getChartData
)

export const getChartTransactions = (filteredTransactions, categoryId) => {
  if (!categoryId) {
    return filteredTransactions
  }

  // TODO should be done via selectors
  return filteredTransactions.filter(
    transaction => getCategoryId(transaction) === categoryId
  )
}
