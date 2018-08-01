import { merge, get } from 'lodash'
import Settings from './Settings'
import AccountSettings from './AccountSettings'
import AccountsSettings from './AccountsSettings'
import GroupSettings, { NewGroupSettings } from './GroupSettings'
import GroupsSettings from './GroupsSettings'
import Configuration from './Configuration'
import { DEFAULTS_SETTINGS } from './constants'

// components
export {
  Settings,
  AccountsSettings,
  AccountSettings,
  GroupsSettings,
  GroupSettings,
  NewGroupSettings,
  Configuration
}

// helpers
export const isNotificationEnabled = settings => {
  return (
    get(settings, 'notifications.balanceLower.enabled') ||
    get(settings, 'notifications.transactionGreater.enabled') ||
    get(settings, 'notifications.healthBillLinked.enabled')
  )
}

export const getSettingsFromCollection = col =>
  merge(DEFAULTS_SETTINGS, get(col, 'data[0]'))
