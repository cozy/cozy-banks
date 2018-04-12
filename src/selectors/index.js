import { getCollection } from 'cozy-client'
import { createSelector } from 'reselect'
import groupBy from 'lodash/groupBy'
import { GROUP_DOCTYPE } from 'doctypes'

export const getTransactions = state => {
  const col = getCollection(state, 'transactions')
  return (col && col.data) || []
}
export const getGroups = state => {
  const col = getCollection(state, 'groups')
  return (col && col.data) || []
}
export const getAccounts = state => {
  const col = getCollection(state, 'accounts')
  return (col && col.data) || []
}

export const getVirtualGroups = createSelector([getAccounts], accounts => {
  const accountsByType = groupBy(accounts, account => account.type)

  const virtualGroups = Object.entries(accountsByType)
    .filter(([type, accounts]) => type !== 'undefined' && accounts.length > 1)
    .map(([type, accounts]) => ({
      _id: type,
      _type: GROUP_DOCTYPE,
      label: type.toLowerCase(),
      accounts: accounts.map(account => account._id),
      virtual: true
    }))

  return virtualGroups
})

export const getAllGroups = createSelector(
  [getGroups, getVirtualGroups],
  (groups, virtualGroups) => [...groups, ...virtualGroups]
)
