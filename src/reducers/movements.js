import {
  FETCH_BANK_MOVEMENTS_SUCCESS
} from '../actions'

// reducer for the full bank movements list
export const movements = (state = [], action) => {
  switch (action.type) {
    case FETCH_BANK_MOVEMENTS_SUCCESS:
      return action.movements
    default:
      return state
  }
}

export default movements
