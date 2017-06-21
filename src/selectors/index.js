import { createSelector } from 'reselect'
import { BANK_ACCOUNT_GROUPS_DOCTYPE, BANK_ACCOUNTS_DOCTYPE } from '../actions'

export const getOperations = (state) => state.operations
const getGroups = (state) => state.groups
const getAccountFilters = (state) => state.accountFilters

export const getFilteredOperations = createSelector(
  [ getOperations, getGroups, getAccountFilters ],
  (operations, groups, accountFilters) => {
    if (accountFilters.length === 0) return operations// If there is no active filter, return everything

    // create a list of all authorized account ids, combining groups and raw accounts
    let accountIds = []
    accountFilters.forEach(filter => {
      let [ doctype, id ] = filter.split(':')

      if (doctype === BANK_ACCOUNTS_DOCTYPE) accountIds.push(id)
      else if (doctype === BANK_ACCOUNT_GROUPS_DOCTYPE) {
        let group = groups.find(group => (group._id === id))
        accountIds = accountIds.concat(group.accounts)
      }
    })

    return operations.filter(operation => (accountIds.indexOf(operation.account) >= 0))
  }
)
