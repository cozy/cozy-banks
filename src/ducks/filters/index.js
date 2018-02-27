import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { subDays, parse, endOfDay, format, isWithinRange } from 'date-fns'
import SelectDates from './SelectDates'
import { getTransactions, getGroups, getAccounts } from 'selectors'
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
  [getTransactions, getFilteredAccountIds, getPeriod],
  (transactions, accountIds, period) => {
    if (accountIds) {
      transactions = filterByAccountIds(transactions, accountIds)
    }
    return filterByPeriod(transactions, period)
  }
)

const monthFormat = date => {
  return date && date.substr(0, 7)
}

const yearFormat = date => {
  return date && date.substr(0, 4)
}

// filters
const filterByPeriod = (transactions, period) => {
  let pred
  const l = period.length
  if (l === 4) {
    const formatter = yearFormat
    pred = date => formatter(date) === period
  } else if (l === 7) {
    const formatter = monthFormat
    pred = date => formatter(date) === period
  } else if (
    period === 'lastYear'
  ) {
    const now = endOfDay(new Date())
    const lastYear = subDays(now, 365)
    pred = date => {
      return isWithinRange(parse(date), lastYear, now)
    }
  } else {
    throw new Error('Invalid period: ' + period)
  }

  return transactions.filter(transaction => {
    const date = transaction.date
    if (!date) { return false }
    return pred(date)
  })
}

const filterByAccountIds = (transactions, accountIds) => transactions.filter(transaction => {
  return accountIds.indexOf(transaction.account) !== -1
})

// actions
export const addFilterByPeriod = (period, options = {}) => ({ type: FILTER_BY_PERIOD, period, ...options })
export const resetFilterByDoc = () => ({ type: RESET_FILTER_BY_DOC })
export const filterByDoc = doc => ({ type: FILTER_BY_DOC, doc })

export const addFilterForMostRecentTransactions = transactions => {
  const mostRecentTransaction = last(sortBy(transactions, 'date'))
  const date = mostRecentTransaction ? mostRecentTransaction.date : new Date()
  return addFilterByPeriod(monthFormat(date), { replace: false })
}
// components
export { SelectDates }

// reducers
const getDefaultMonth = () => monthFormat(format(new Date()))
const period = (state = getDefaultMonth(), action) => {
  switch (action.type) {
    case FILTER_BY_PERIOD:
      if (state !== getDefaultMonth() && action.replace === false) {
        return state
      }
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
    period,
    filteringDoc
  }),
  handleDestroyAccount
)
