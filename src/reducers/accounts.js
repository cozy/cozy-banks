import {
  FETCH_BANK_ACCOUNTS_SUCCESS,
  FETCH_BANK_ACCOUNT_GROUPS_SUCCESS,
  SELECT_ACCOUNTS
} from '../actions'

export const accounts = (state = [], action) => {
  switch (action.type) {
    case FETCH_BANK_ACCOUNTS_SUCCESS:
      return action.accounts
    default:
      return state
  }
}

export const groups = (state = [], action) => {
  switch (action.type) {
    case FETCH_BANK_ACCOUNT_GROUPS_SUCCESS:
      return action.groups
    default:
      return state
  }
}

export const selectedAccounts = (state = [], action) => {
  switch (action.type) {
    case SELECT_ACCOUNTS:
      return action.accounts
    default:
      return state
  }
}

export default accounts
