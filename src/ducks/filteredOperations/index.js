import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { startOfMonth, endOfDay, isAfter, isBefore, parse } from 'date-fns'
import SelectDates from './SelectDates'
import { getOperations, getGroups } from 'selectors'
import { BANK_ACCOUNTS_DOCTYPE, BANK_ACCOUNT_GROUPS_DOCTYPE } from 'actions'

// constants
const FILTER_BY_DATES = 'FILTER_BY_DATES'
const FILTER_BY_ACCOUNTS = 'FILTER_BY_ACCOUNTS'
const FILTER_BY_ACCOUNTS_RESET = 'FILTER_BY_ACCOUNTS_RESET'
const FILTER_BY_GROUPS = 'FILTER_BY_GROUPS'

// selectors
export const getStartDate = state => state.filteredOperations.startDate
export const getEndDate = state => state.filteredOperations.endDate
export const getAccounts = state => state.filteredOperations.accounts

export const getAccountIds = state => {
  const groups = getGroups(state)
  let accountIds = []
  getAccounts(state).forEach(filter => {
    const [ doctype, id ] = filter.split(':')

    if (doctype === BANK_ACCOUNTS_DOCTYPE) {
      accountIds.push(id)
    } else if (doctype === BANK_ACCOUNT_GROUPS_DOCTYPE && groups !== undefined) {
      const group = groups.find(group => group._id === id)
      if (group) accountIds = accountIds.concat(group.accounts)
    }
  })
  return accountIds
}

export const getFilteredOperations = createSelector([getOperations, getAccountIds, getStartDate, getEndDate],
  (operations, accountIds, startDate, endDate) => {
    if (accountIds && accountIds.length > 0) {
      operations = filterByAccountIds(operations, accountIds)
    }
    return filterByDates(operations, startDate, endDate)
  }
)

// filters
const filterByDates = (operations, startDate, endDate) => operations.filter(operation => {
  const date = parse(operation.date)
  return isAfter(date, startDate) && isBefore(date, endDate)
})

const filterByAccountIds = (operations, accountIds) => operations.filter(operation => {
  return accountIds.indexOf(operation.account) !== -1
})

// actions
export const addFilterByDates = (startDate, endDate) => ({ type: FILTER_BY_DATES, startDate, endDate })
export const resetFilterByAccounts = () => ({ type: FILTER_BY_ACCOUNTS_RESET })

export const filterAccounts = (accountIds = []) => {
  const accounts = accountIds.map(id => (BANK_ACCOUNTS_DOCTYPE + ':' + id))
  return { type: FILTER_BY_ACCOUNTS, accounts }
}

export const filterGroups = (groupIds = []) => {
  const groups = groupIds.map(id => (BANK_ACCOUNT_GROUPS_DOCTYPE + ':' + id))
  return { type: FILTER_BY_GROUPS, groups }
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

const getDefaultEndDate = () => endOfDay(new Date())
const endDate = (state = getDefaultEndDate(), action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.endDate
    default:
      return state
  }
}

export const accounts = (state = [], action) => {
  switch (action.type) {
    case FILTER_BY_ACCOUNTS:
      return action.accounts
    case FILTER_BY_GROUPS:
      return action.groups
    case FILTER_BY_ACCOUNTS_RESET:
      return []
    default:
      return state
  }
}

export default combineReducers({
  startDate,
  endDate,
  accounts
})
