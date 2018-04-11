import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { parse, format, isWithinRange } from 'date-fns'
import SelectDates from './SelectDates'
import { getTransactions, getAllGroups, getAccounts } from 'selectors'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { sortBy, last, keyBy, find } from 'lodash'
import { DESTROY_ACCOUNT } from 'actions/accounts'

// constants
const FILTER_BY_PERIOD = 'FILTER_BY_PERIOD'
const FILTER_BY_DOC = 'FILTER_BY_DOC'
const RESET_FILTER_BY_DOC = 'RESET_FILTER_BY_DOC'

// selectors
export const getPeriod = state => state.filters.period
export const getFilteringDoc = state => state.filters.filteringDoc

export const getFilteredAccountIds = state => {
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
      // eslint-disable-next-line no-console
      console.warn('Filtering by unavailable account, returning all accounts')
      return availableAccountIds
    }
  } else if (doctype === GROUP_DOCTYPE) {
    const groups = getAllGroups(state)
    const group = find(groups, { _id: id })
    if (group) {
      return group.accounts
    } else {
      return availableAccountIds
    }
  } else {
    throw new Error(
      "The filtering doc doesn't have any type. Please check it has a `_type` property"
    )
  }
}

export const getAccountsFiltered = state => {
  const ids = keyBy(getFilteredAccountIds(state))
  return getAccounts(state).filter(account => ids[account._id])
}

const filterByAccountIds = (transactions, accountIds) =>
  transactions.filter(transaction => {
    return accountIds.indexOf(transaction.account) !== -1
  })

export const getTransactionsFilteredByAccount = createSelector(
  [getTransactions, getFilteredAccountIds],
  (transactions, accountIds) => {
    if (accountIds) {
      transactions = filterByAccountIds(transactions, accountIds)
    }
    return transactions
  }
)

export const getFilteredTransactions = createSelector(
  [getTransactionsFilteredByAccount, getPeriod],
  (transactions, period) => {
    return filterByPeriod(transactions, period)
  }
)

const monthFormat = date => {
  return date && date.substr(0, 7)
}

const yearFormat = date => {
  return date && date.substr(0, 4)
}

const isDate = date => date instanceof Date
const isString = str => typeof str === 'string'

// filters
const filterByPeriod = (transactions, period) => {
  let pred
  const l = period.length
  if (isString(period)) {
    if (l === 4) {
      const formatter = yearFormat
      pred = date => formatter(date) === period
    } else if (l === 7) {
      const formatter = monthFormat
      pred = date => formatter(date) === period
    }
  } else if (period.length === 2 && isDate(period[0]) && isDate(period[1])) {
    pred = date => {
      return isWithinRange(parse(date), period[0], period[1])
    }
  } else {
    throw new Error('Invalid period: ' + period)
  }

  return transactions.filter(transaction => {
    const date = transaction.date
    if (!date) {
      return false
    }
    return pred(date)
  })
}

// actions
export const addFilterByPeriod = period => ({ type: FILTER_BY_PERIOD, period })
export const resetFilterByDoc = () => ({ type: RESET_FILTER_BY_DOC })
export const filterByDoc = doc => ({ type: FILTER_BY_DOC, doc })

export const addFilterForMostRecentTransactions = () => (
  dispatch,
  getState
) => {
  const state = getState()
  const transactions = getTransactionsFilteredByAccount(state)
  const mostRecentTransaction = last(sortBy(transactions, 'date'))
  if (mostRecentTransaction) {
    const date = mostRecentTransaction.date
    const period = monthFormat(date)
    return dispatch(addFilterByPeriod(period))
  }
}
// components
export { SelectDates }

// reducers
const getDefaultMonth = () => monthFormat(format(new Date()))
const period = (state = getDefaultMonth(), action) => {
  switch (action.type) {
    case FILTER_BY_PERIOD:
      return action.period
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
  const { type, account } = action
  if (
    type === DESTROY_ACCOUNT &&
    state.filteringDoc &&
    state.filteringDoc.id === account.id
  ) {
    // reset the filter
    return { ...state, filteringDoc: null }
  }
  return state
}

const composeReducers = (...reducers) => (state, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state)

export default composeReducers(
  combineReducers({
    period,
    filteringDoc
  }),
  handleDestroyAccount
)
