import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { startOfMonth, endOfMonth, isAfter, isBefore, parse } from 'date-fns'
import SelectDates from './SelectDates'
import { getTransactions, getGroups, getAccounts } from 'selectors'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { sortBy, last, keyBy, find } from 'lodash'
import { DESTROY_ACCOUNT } from 'actions/accounts'

// constants
const FILTER_BY_DATES = 'FILTER_BY_DATES'
const FILTER_BY_DOC = 'FILTER_BY_DOC'
const RESET_FILTER_BY_DOC = 'RESET_FILTER_BY_DOC'

// selectors
export const getStartDate = state => state.filters.startDate
export const getEndDate = state => state.filters.endDate
export const getFilteringDoc = state => state.filters.filteringDoc

const getFilteredAccountIds = state => {
  const availableAccountIds = getAccounts(state).map(x => x._id)
  const doc = getFilteringDoc(state)
  if (!doc) {
    return availableAccountIds
  }
  const doctype = doc._type
  const id = doc._id

  if (doctype === ACCOUNT_DOCTYPE) {
    if (availableAccountIds.indexOf(id) > -1) {
      return [id]
    } else {
      console.warn('Filtering by unavailable account, returning all accounts')
      return availableAccountIds
    }
  } else if (doctype === GROUP_DOCTYPE) {
    const groups = getGroups(state)
    const group = find(groups, { _id: id })
    if (group) {
      return group.accounts
    } else {
      return availableAccountIds
    }
  }
}

export const getAccountsFiltered = state => {
  const ids = keyBy(getFilteredAccountIds(state))
  return getAccounts(state).filter(account => ids[account._id])
}

export const getFilteredTransactions = createSelector(
  [getTransactions, getFilteredAccountIds, getStartDate, getEndDate],
  (transactions, accountIds, startDate, endDate) => {
    if (accountIds && accountIds.length > 0) {
      transactions = filterByAccountIds(transactions, accountIds)
    }
    return filterByDates(transactions, startDate, endDate)
  }
)

// filters
const filterByDates = (transactions, startDate, endDate) => transactions.filter(transaction => {
  const date = parse(transaction.date)
  return isAfter(date, startDate) && isBefore(date, endDate)
})

const filterByAccountIds = (transactions, accountIds) => transactions.filter(transaction => {
  return accountIds.indexOf(transaction.account) !== -1
})

// actions
export const addFilterByDates = (startDate, endDate) => ({ type: FILTER_BY_DATES, startDate, endDate })
export const resetFilterByDoc = () => ({ type: RESET_FILTER_BY_DOC })
export const filterByDoc = doc => ({ type: FILTER_BY_DOC, doc })

export const addFilterForMostRecentTransactions = transactions => {
  const mostRecentTransaction = last(sortBy(transactions, 'date'))
  const date = mostRecentTransaction ? mostRecentTransaction.date : new Date()
  return addFilterByDates(startOfMonth(date), endOfMonth(date))
}
// components
export { SelectDates }

// reducers
const getDefaultStartDate = () => startOfMonth(new Date())
const startDate = (state = getDefaultStartDate(), action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.startDate
    default:
      return state
  }
}

const getDefaultEndDate = () => endOfMonth(new Date())
const endDate = (state = getDefaultEndDate(), action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.endDate
    default:
      return state
  }
}

const filteringDoc = (state = null, action) => {
  switch (action.type) {
    case FILTER_BY_DOC:
      return action.doc
    case RESET_FILTER_BY_DOC:
      return null
    default:
      return state
  }
}

const handleDestroyAccount = (state = {}, action) => {
  const {type, account} = action
  if (
    type === DESTROY_ACCOUNT &&
    state.filteringDoc &&
    state.filteringDoc.id === account.id
  ) {
    // reset the filter
    return {...state, filteringDoc: null}
  }
  return state
}

const composeReducers = (...reducers) => (state, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state)

export default composeReducers(
  combineReducers({
    startDate,
    endDate,
    filteringDoc
  }),
  handleDestroyAccount
)
