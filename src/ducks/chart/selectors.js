import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from 'ducks/balance/helpers'
import { getCategoryId } from 'ducks/categories/helpers'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
import { subMonths } from 'date-fns'

export const getBalanceHistory = (accounts, transactions) => {
  const today = new Date()
  const twoMonthsBefore = subMonths(today, 2)

  const balanceHistories = getBalanceHistories(
    accounts,
    transactions,
    today,
    twoMonthsBefore
  )
  const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

  return balanceHistory
}

export const getChartData = (
  accountsCol,
  transactionsCol,
  transactions,
  filteredAccounts
) => {
  const isLoading =
    (isCollectionLoading(transactionsCol) && !hasBeenLoaded(transactionsCol)) ||
    (isCollectionLoading(accountsCol) && !hasBeenLoaded(accountsCol))

  if (isLoading) {
    return null
  }

  const history = getBalanceHistory(filteredAccounts, transactions)
  const data = balanceHistoryToChartData(history)

  return data
}

export const getChartTransactions = (filteredTransactions, categoryId) => {
  if (!categoryId) {
    return filteredTransactions
  }

  // TODO should be done via selectors
  return filteredTransactions.filter(
    transaction => getCategoryId(transaction) === categoryId
  )
}
