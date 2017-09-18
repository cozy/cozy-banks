import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import transactions from './transactions'
import * as sharingStatus from 'modules/SharingStatus'
import filters from 'ducks/filters'
import apps from 'ducks/apps'
import { reducer } from 'redux-cozy-client'

export const reducers = {
  alerts: alerterReducer,
  transactions,
  filters,
  apps,
  sharingStatus: sharingStatus.reducer,
  cozy: reducer
}

const combinedReducers = combineReducers(reducers)

export const getSharingInfo = (state, doctype, id) => {
  return sharingStatus.getSharingInfo(state.sharingStatus, doctype, id)
}
export default combinedReducers
