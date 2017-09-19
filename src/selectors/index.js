import { getCollection } from 'redux-cozy-client'

export const getTransactions = state => state.transactions
export const getGroups = state => {
  const col = getCollection(state, 'groups')
  return (col && col.data) || []
}
export const getAccounts = state => {
  const col = getCollection(state, 'accounts')
  return (col && col.data) || []
}
