import {
  FETCH_BANK_OPERATIONS_SUCCESS
} from '../actions'

// reducer for the full bank operations list
export const operations = (state = [], action) => {
  switch (action.type) {
    case FETCH_BANK_OPERATIONS_SUCCESS:
      return action.operations
    default:
      return state
  }
}

export default operations
