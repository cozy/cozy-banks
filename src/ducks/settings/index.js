import { fetchCollection, createDocument, updateDocument } from 'redux-cozy-client'
import Settings from './Settings'

// constants
const DOCTYPE = 'io.cozy.bank.settings'
const COLLECTION_NAME = 'settings'
const DEFAULTS_SETTINGS = {
  notifications: {
    movementGreater: {
      value: 30,
      enable: false
    }
  }
}

// components
export { Settings }

// actions
export const fetchSettingsCollection = () => fetchCollection(COLLECTION_NAME, DOCTYPE)
export const createSettings = settings => createDocument({ type: DOCTYPE, ...settings }, { updateCollections: [COLLECTION_NAME] })
export const updateSettings = settings => updateDocument(settings)

// utils
export const getSettings = settingsCollection => {
  if (settingsCollection && settingsCollection.data && settingsCollection.data.length > 0) {
    const settings = settingsCollection.data[0]
    return { ...DEFAULTS_SETTINGS, ...settings }
  } else {
    return DEFAULTS_SETTINGS
  }
}
