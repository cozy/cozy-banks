import { createSelector } from 'reselect'
import { buildAutoGroups, isAutoGroup } from 'ducks/groups/helpers'
import { buildVirtualAccounts } from 'ducks/account/helpers'

const getCollection = (state, attr) => {
  const col = state[attr]
  if (!col) {
    console.warn(`Collection ${attr} is not in state`) // eslint-disable-line no-console
  }
  return col
}

export const getTransactions = state => {
  const col = getCollection(state, 'transactions')
  return (col && col.data.filter(Boolean)) || []
}

export const getGroups = state => {
  const col = getCollection(state, 'groups')
  return (col && col.data) || []
}

export const getAccounts = state => {
  const col = getCollection(state, 'accounts')
  return (col && col.data) || []
}

export const getVirtualAccounts = createSelector(
  [getTransactions],
  transactions => {
    return buildVirtualAccounts(transactions)
  }
)

export const getVirtualGroups = createSelector(
  [getAccounts],
  accounts => {
    return buildAutoGroups(accounts)
  }
)

export const getAllGroups = createSelector(
  [getGroups, getVirtualGroups],
  (groups, virtualGroups) => [...groups, ...virtualGroups]
)

export const getAppUrlById = (state, id) => {
  const apps = state.apps
  if (apps && apps.data && apps.data.length > 0) {
    for (const app of apps.data) {
      if (app._id === id) {
        return app.links.related
      }
    }
  }
  return
}
