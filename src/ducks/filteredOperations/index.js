import { combineReducers } from 'redux'
import { startOfMonth, endOfDay, isAfter, isBefore, parse } from 'date-fns'
import SelectDates from './SelectDates'
import { getOperations } from 'selectors'

// constants
const FILTER_BY_DATES = 'FILTER_BY_DATES'

// selectors
export const getStartDate = state => state.filteredOperations.startDate
export const getEndDate = state => state.filteredOperations.endDate
export const getFilteredOperations = state => {
  const operations = getOperations(state)
  const startDate = getStartDate(state)
  const endDate = getEndDate(state)

  return operations.filter(operation => {
    const date = parse(operation.date)
    return isAfter(date, startDate) && isBefore(date, endDate)
  })
}

// actions
export const addFilterByDates = (startDate, endDate) => {
  return { type: FILTER_BY_DATES, startDate, endDate }
}

// components
export { SelectDates }

// reducers
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
  endDate
})
