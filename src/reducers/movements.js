import {
  FETCH_BANK_OPERATIONS_SUCCESS
} from '../actions'

// reducer for the full bank movements list
export const movements = (state = [], action) => {
  switch (action.type) {
    case FETCH_BANK_OPERATIONS_SUCCESS:
      return action.operations
    default:
      return state
  }
}

export default movements
