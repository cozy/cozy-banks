import { combineReducers } from 'redux'

import * as sharingStatus from 'modules/SharingStatus'
import filters from 'ducks/filters'
import mobile, * as fromMobile from 'ducks/mobile'
import apps from 'ducks/apps'
import { reducer } from 'cozy-client'

export const reducers = {
  filters,
  mobile,
  apps,
  sharingStatus: sharingStatus.reducer,
  cozy: reducer
}

const combinedReducers = combineReducers(reducers)

export const getSharingInfo = (state, doctype, id) => {
  return sharingStatus.getSharingInfo(state.sharingStatus, doctype, id)
}

export const getURL = state => fromMobile.getURL(state.mobile)
export default combinedReducers
