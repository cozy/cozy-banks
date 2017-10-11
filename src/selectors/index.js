import { getCollection } from 'cozy-client'

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
