import {
  SET_OPERATIONS
} from '../actions'

// reducer for the full bank operations list
export const operations = (state = [], action) => {
  switch (action.type) {
    case SET_OPERATIONS:
      return action.operations
    default:
      return state
  }
}

export default operations
