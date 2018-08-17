import { combineReducers } from 'redux'

import filters from 'ducks/filters'
import mobile, * as fromMobile from 'ducks/mobile'

export const reducers = {
  filters,
  mobile
}

const combinedReducers = combineReducers(reducers)

export const getURL = state => fromMobile.getURL(state.mobile)
export default combinedReducers
