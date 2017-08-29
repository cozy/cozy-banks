import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { startOfMonth, endOfMonth, isAfter, isBefore, parse } from 'date-fns'
import SelectDates from './SelectDates'
import { getOperations, getGroups, getAccounts } from 'selectors'
import { BANK_ACCOUNTS_DOCTYPE, BANK_ACCOUNT_GROUPS_DOCTYPE } from 'actions'

// constants
const FILTER_BY_DATES = 'FILTER_BY_DATES'
const FILTER_BY_ACCOUNT = 'FILTER_BY_ACCOUNT'
const FILTER_BY_GROUP = 'FILTER_BY_GROUP'
const RESET_ACCOUNT_OR_GROUP = 'RESET_ACCOUNT_OR_GROUP'

// selectors
export const getStartDate = state => state.filters.startDate
export const getEndDate = state => state.filters.endDate
export const getAccountOrGroupType = state => state.filters.accountOrGroupType
const getAccountOrGroupId = state => state.filters.accountOrGroupId

export const getAccountOrGroup = state => {
  const doctype = getAccountOrGroupType(state)
  const id = getAccountOrGroupId(state)
  let accountsOrGroups = []

  if (doctype === BANK_ACCOUNTS_DOCTYPE) {
    accountsOrGroups = getAccounts(state)
  } else if (doctype === BANK_ACCOUNT_GROUPS_DOCTYPE) {
    accountsOrGroups = getGroups(state)
  }

  return accountsOrGroups.find(accountOrGroup => accountOrGroup._id === id)
}

export const getAccountsFiltered = state => {
  const accountsFiltered = []

  const doctype = getAccountOrGroupType(state)
  const id = getAccountOrGroupId(state)
  const accounts = getAccounts(state)

  if (doctype === BANK_ACCOUNTS_DOCTYPE) {
    const account = accounts.find(account => account._id === id)
    if (account) {
      accountsFiltered.push(account)
    }
  } else if (doctype === BANK_ACCOUNT_GROUPS_DOCTYPE) {
    const group = getGroups(state).find(group => group._id === id)
    if (group) {
      group.accounts.map(accountId => {
        const account = accounts.find(account => account._id === accountId)
        if (account) {
          accountsFiltered.push(account)
        }
      })
    }
  } else {
    return accounts
  }

  return accountsFiltered
}

const getAccountIds = state => {
  const doctype = getAccountOrGroupType(state)
  const id = getAccountOrGroupId(state)

  let accountIds = []

  if (doctype === BANK_ACCOUNTS_DOCTYPE) {
    accountIds.push(id)
  } else if (doctype === BANK_ACCOUNT_GROUPS_DOCTYPE) {
    const group = getGroups(state).find(group => group._id === id)
    if (group) {
      accountIds = accountIds.concat(group.accounts)
    }
  }

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
export const resetAccountOrGroup = () => ({ type: RESET_ACCOUNT_OR_GROUP })
export const filterByAccount = account => ({ type: FILTER_BY_ACCOUNT, id: account._id })
export const filterByGroup = group => ({ type: FILTER_BY_GROUP, id: group._id })

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

const accountOrGroupType = (state = null, action) => {
  switch (action.type) {
    case FILTER_BY_ACCOUNT:
      return BANK_ACCOUNTS_DOCTYPE
    case FILTER_BY_GROUP:
      return BANK_ACCOUNT_GROUPS_DOCTYPE
    case RESET_ACCOUNT_OR_GROUP:
      return null
    default:
      return state
  }
}

const accountOrGroupId = (state = null, action) => {
  switch (action.type) {
    case FILTER_BY_ACCOUNT:
      return action.id
    case FILTER_BY_GROUP:
      return action.id
    case RESET_ACCOUNT_OR_GROUP:
      return null
    default:
      return state
  }
}

export default combineReducers({
  startDate,
  endDate,
  accountOrGroupType,
  accountOrGroupId
})
