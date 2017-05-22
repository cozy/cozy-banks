import {
  SET_OPERATIONS
} from '../actions'

// reducer for the full bank operations list
export const operations = (state = [], action) => {
  switch (action.type) {
    case SET_OPERATIONS:
      return action.operations
    case 'ATTACH_ACTION':
      return state.map(operation => operation._id === action.id
        ? { ...operation, action: action.action }
        : operation
      )
    default:
      return state
  }
}

export default operations
