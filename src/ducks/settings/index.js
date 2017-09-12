import { fetchCollection, createDocument, updateDocument } from 'redux-cozy-client'
import { merge } from 'lodash'
import Settings from './Settings'
import GroupSettings, { NewGroupSettings } from './GroupSettings'
import GroupsSettings from './GroupsSettings'

// constants
const DOCTYPE = 'io.cozy.bank.settings'
const COLLECTION_NAME = 'settings'
const DEFAULTS_SETTINGS = {
  notifications: {
    solde: {
      value: 100,
      enabled: false
    },
    operationGreater: {
      value: 100,
      enabled: false
    },
    salaire: {
      enabled: false
    },
    hebdo: {
      enabled: false
    },
    mensuel: {
      enabled: false
    }
  }
}

// components
export { Settings, GroupsSettings, GroupSettings, NewGroupSettings }

// actions
export const fetchSettingsCollection = () => fetchCollection(COLLECTION_NAME, DOCTYPE)
export const createSettings = settings => createDocument({ type: DOCTYPE, ...settings }, { updateCollections: [COLLECTION_NAME] })
export const updateSettings = settings => updateDocument(settings)

// utils
export const getSettings = settingsCollection => {
  if (settingsCollection && settingsCollection.data && settingsCollection.data.length > 0) {
    const settings = settingsCollection.data[0]
    return merge(DEFAULTS_SETTINGS, settings)
  } else {
    return DEFAULTS_SETTINGS
  }
}
