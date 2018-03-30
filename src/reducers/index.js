import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import * as sharingStatus from 'modules/SharingStatus'
import filters from 'ducks/filters'
import mobile, * as fromMobile from 'ducks/mobile'
import apps from 'ducks/apps'

const combinedReducers = client => combineReducers({
  alerts: alerterReducer,
  filters,
  mobile,
  apps,
  sharingStatus: sharingStatus.reducer,
  cozy: client.reducer()
})

export const getSharingInfo = (state, doctype, id) => {
  return sharingStatus.getSharingInfo(state.sharingStatus, doctype, id)
}

export const getURL = state => fromMobile.getURL(state.mobile)
export default combinedReducers
