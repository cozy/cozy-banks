import { createSelector } from 'reselect'

const getOperations = (state) => state.operations
const getAccounts = (state) => state.accounts
const getSelectedAccounts = (state) => state.selectedAccounts

export const getFilteredOperations = createSelector(
  [ getOperations, getAccounts, getSelectedAccounts ],
  (operations, accounts, selectedAccountIds) => {
    if (selectedAccountIds.length === 0) return operations// If there is no active filter, return everything

    const selectedAccountNames = accounts.filter(account => (selectedAccountIds.indexOf(account._id) >= 0)).map(account => (account.bank))

    return operations.filter(operation => (selectedAccountNames.indexOf(operation.bankAccount) >= 0))
  }
)
