import { fetchCollection, createDocument, updateDocument } from 'redux-cozy-client'
import Settings from './Settings'

// constants
const DOCTYPE = 'io.cozy.bank.settings'
const COLLECTION_NAME = 'settings'
const DEFAULTS_SETTINGS = {
  montant: false
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
    return settingsCollection.data[0]
  } else {
    return DEFAULTS_SETTINGS
  }
}
