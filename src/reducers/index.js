import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import { accounts, groups, accountFilters } from './accounts'
import * as sharingStatus from 'modules/SharingStatus'


export const reducers = {
  alerts: alerterReducer,
  operations,
  accounts,
  groups,
  accountFilters,
  sharingStatus: sharingStatus.reducer
}

const combinedReducers = combineReducers(reducers)

export const getSharingInfo = function (state, doctype, id) {
  return sharingStatus.getSharingInfo(state.sharingStatus, doctype, id)
}
export default combinedReducers
