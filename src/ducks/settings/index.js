import {
  getCollection,
  fetchCollection,
  createDocument,
  updateDocument
} from 'cozy-client'
import { merge, get } from 'lodash'
import Settings from './Settings'
import AccountSettings from './AccountSettings'
import AccountsSettings from './AccountsSettings'
import GroupSettings, { NewGroupSettings } from './GroupSettings'
import GroupsSettings from './GroupsSettings'
import { DOCTYPE, COLLECTION_NAME, DEFAULTS_SETTINGS } from './constants'

// components
export {
  Settings,
  AccountsSettings,
  AccountSettings,
  GroupsSettings,
  GroupSettings,
  NewGroupSettings
}

// helpers

export const isNotificationEnabled = settings => {
  return (
    get(settings, 'notifications.balanceLower.enabled') ||
    get(settings, 'notifications.transactionGreater.enabled') ||
    get(settings, 'notifications.healthBillLinked.enabled')
  )
}

const getSettingsFromCollection = col => get(col, 'data[0]')

// selectors

export const getSettingsFromState = state =>
  getSettingsFromCollection(getCollection(state, 'settings'))

export const getSettings = state => {
  const settings = getSettingsFromState(state)

  return merge(DEFAULTS_SETTINGS, settings)
}

// actions
export const fetchSettingsCollection = () =>
  fetchCollection(COLLECTION_NAME, DOCTYPE)
export const createSettings = settings =>
  createDocument(DOCTYPE, settings, { updateCollections: [COLLECTION_NAME] })
export const updateSettings = settings => updateDocument(settings)
export const initSettings = () => createSettings(DEFAULTS_SETTINGS)

// async actions
export const setupSettings = () => async (dispatch, getState) => {
  await dispatch(fetchSettingsCollection())
  const settings = getSettingsFromState(getState())
  if (!settings) {
    await dispatch(initSettings())
  }
}
