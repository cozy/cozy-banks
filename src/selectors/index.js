import { createSelector } from 'reselect'

const getOperations = (state) => state.operations
const getSelectedAccounts = (state) => state.selectedAccounts

export const getFilteredOperations = createSelector(
  [ getOperations, getSelectedAccounts ],
  (operations, selectedAccountIds) => {
    if (selectedAccountIds.length === 0) return operations// If there is no active filter, return everything

    return operations.filter(operation => (selectedAccountIds.indexOf(operation.account) >= 0))
  }
)
