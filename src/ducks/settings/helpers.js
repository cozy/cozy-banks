import { merge, get } from 'lodash'
import { DOCTYPE, DEFAULTS_SETTINGS } from './constants'

export const isNotificationEnabled = settings => {
  return (
    get(settings, 'notifications.balanceLower.enabled') ||
    get(settings, 'notifications.transactionGreater.enabled') ||
    get(settings, 'notifications.healthBillLinked.enabled')
  )
}

export const getSettings = async client => {
  const settingsCol = await client.query(client.find(DOCTYPE))
  return getSettingsFromCollection(settingsCol)
}

export const getSettingsFromCollection = col =>
  merge(DEFAULTS_SETTINGS, get(col, 'data[0]'))
