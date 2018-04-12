import { merge } from 'lodash'
import Settings from './Settings'
import AccountSettings from './AccountSettings'
import AccountsSettings from './AccountsSettings'
import GroupSettings, { NewGroupSettings } from './GroupSettings'
import GroupsSettings from './GroupsSettings'

// constants
export const DEFAULTS_SETTINGS = {
  notifications: {
    balanceLower: {
      value: 100,
      enabled: false
    },
    transactionGreater: {
      value: 30,
      enabled: false
    },
    healthBillLinked: {
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
export { Settings, AccountsSettings, AccountSettings, GroupsSettings, GroupSettings, NewGroupSettings }

// utils
export const getSettings = settingsCollection => {
  if (settingsCollection && settingsCollection.data && settingsCollection.data.length > 0) {
    const settings = settingsCollection.data[0]
    return merge(DEFAULTS_SETTINGS, settings)
  } else {
    return DEFAULTS_SETTINGS
  }
}
