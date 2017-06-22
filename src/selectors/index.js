import { createSelector } from 'reselect'
import { BANK_ACCOUNT_GROUPS_DOCTYPE, BANK_ACCOUNTS_DOCTYPE } from '../actions'

export const getOperations = (state) => state.operations
export const getGroups = (state) => state.groups
export const getAccounts = state => state.filteredOperations.accounts

export const getFilteredOperations = createSelector(
  [ getOperations, getGroups, getAccounts ],
  (operations, groups, accounts) => {
    if (accounts.length === 0) return operations// If there is no active filter, return everything

    // create a list of all authorized account ids, combining groups and raw accounts
    let accountIds = []
    accounts.forEach(filter => {
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
