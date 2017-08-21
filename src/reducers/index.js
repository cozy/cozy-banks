import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import { accounts, groups } from './accounts'
import * as sharingStatus from 'modules/SharingStatus'
import filters from 'ducks/filters'
import apps from 'ducks/apps'

export const reducers = {
  alerts: alerterReducer,
  operations,
  filters,
  apps,
  accounts,
  groups,
  sharingStatus: sharingStatus.reducer
}

const combinedReducers = combineReducers(reducers)

export const getSharingInfo = (state, doctype, id) => {
  return sharingStatus.getSharingInfo(state.sharingStatus, doctype, id)
}
export default combinedReducers
