import { combineReducers } from 'redux'

import filters from 'ducks/filters'
import mobile, * as fromMobile from 'ducks/mobile'
import { reducer } from 'old-cozy-client'

export const reducers = {
  filters,
  mobile,
  cozy: reducer
}

const combinedReducers = combineReducers(reducers)

export const getURL = state => fromMobile.getURL(state.mobile)
export default combinedReducers
