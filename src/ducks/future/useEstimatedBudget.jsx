import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'cozy-client'

import sumBy from 'lodash/sumBy'

import { getFilteredAccounts } from 'ducks/filters'

import { recurrenceConn, accountsConn } from 'doctypes'
import { getPlannedTransactions } from './selectors'

/** Returns estimatedBalance and number of planned transactions for currently filtered accounts */
const useEstimatedBudget = () => {
  const { data: recurrences, fetchStatus: recurrenceFetchStatus } = useQuery(
    recurrenceConn.query,
    recurrenceConn
  )
  // Do not use the result of this query but make sure accounts are loaded since
  // we use a selector on them afterwards
  const { fetchStatus: accountsFetchStatus } = useQuery(
    accountsConn.query,
    accountsConn
  )
  const transactions = useSelector(getPlannedTransactions)
  const accounts = useSelector(getFilteredAccounts)
  const sumTransactions = useMemo(() => sumBy(transactions, x => x.amount), [
    transactions
  ])
  const sumAccounts = useMemo(() => sumBy(accounts, x => x.balance), [accounts])

  if (
    accountsFetchStatus === 'loading' ||
    recurrenceFetchStatus === 'loading' ||
    (accounts && accounts.length === 0) ||
    (recurrences && recurrences.length === 0)
  ) {
    return { estimatedBalance: null }
  }

  return {
    estimatedBalance: sumAccounts + sumTransactions,
    sumTransactions,
    currency: accounts[0].currency,
    transactions
  }
}

export default useEstimatedBudget
