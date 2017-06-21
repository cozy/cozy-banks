import { combineReducers } from 'redux'
import { startOfMonth, endOfDay, isAfter, parse } from 'date-fns'
import SelectDates from './SelectDates'

// constants
const FILTER_BY_DATES = 'FILTER_BY_DATES'

// selectors
export const getStartDate = state => state.filteredOperations.startDate
export const getEndDate = state => state.filteredOperations.endDate
export const getFilteredOperations = state => state.filteredOperations.operations

// actions
export const filterOperationsByDate = (operations, startDate, endDate) => {
  return { type: FILTER_BY_DATES, operations, startDate, endDate }
}

// components
export { SelectDates }

// reducers
const operations = (state = [], action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.operations.filter(operation => {
        const date = parse(operation.date)
        return isAfter(date, action.startDate) && isAfter(action.endDate, date)
      })
    default:
      return state
  }
}

const getDefaultStartDate = () => startOfMonth(new Date())
const startDate = (state = getDefaultStartDate(), action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.startDate
    default:
      return state
  }
}

const getDefaultEndDate = () => endOfDay(new Date())
const endDate = (state = getDefaultEndDate(), action) => {
  switch (action.type) {
    case FILTER_BY_DATES:
      return action.endDate
    default:
      return state
  }
}

export default combineReducers({
  startDate,
  endDate,
  operations
})
