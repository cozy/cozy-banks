import { queryDataSelector } from 'selectors'

export const getSettings = queryDataSelector('settings')

export const getNotificationFromSettings = (settings, name) => {
  if (!settings || settings.length === 0) {
    return null
  }
  return settings[0].notifications[name]
}
