import { merge, get } from 'lodash'
import { DEFAULTS_SETTINGS } from './constants'

export const isNotificationEnabled = settings => {
  return (
    get(settings, 'notifications.balanceLower.enabled') ||
    get(settings, 'notifications.transactionGreater.enabled') ||
    get(settings, 'notifications.healthBillLinked.enabled')
  )
}

export const getSettingsFromCollection = col =>
  merge(DEFAULTS_SETTINGS, get(col, 'data[0]'))
