import {
  SET_TRANSACTIONS
} from '../actions'

// reducer for the full bank transactions list
export const transactions = (state = [], action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}

export default transactions
