/* global __DEV__ */

import { hashHistory } from 'react-router'
import { fetchSettings, isNotificationEnabled } from 'ducks/settings/helpers'

let push

export const startPushNotificationsIfSettingEnabled = async cozyClient => {
  const settings = await fetchSettings(cozyClient)
  if (!isNotificationEnabled(settings)) {
    return
  }
  return startPushNotifications(cozyClient)
}

/**
 * When we receive a notification while the app is in foreground, all on('notification')
 * handlers are executed. But we don't want to redirect the user without his consent.
 * So we redirect only when the user taps on the notification in the notification center.
 * In this case, the app is always in background.
 */
const handleNotification = notification => {
  if (
    !notification.additionalData.foreground &&
    notification.additionalData.route
  ) {
    hashHistory.push(notification.additionalData.route)
  }
}

export const startPushNotifications = cozyClient => {
  if (push) {
    // eslint-disable-next-line no-console
    console.warn('Push notifications already started')
    return
  }

  if (!window.PushNotification) {
    // eslint-disable-next-line no-console
    console.warn('No window.PushNotification, did not start push notifications')
    return
  }

  push = window.PushNotification.init({
    android: {
      forceShow: true,
      clearNotifications: false
    },
    ios: {
      alert: 'true',
      badge: 'true',
      sound: 'true'
    }
  })

  push.on('notification', handleNotification)
  // eslint-disable-next-line no-console
  push.on('error', err => console.log(err))
  push.on('registration', async ({ registrationId }) => {
    const clientInfos = cozyClient.stackClient.oauthOptions
    cozyClient.stackClient.updateInformation({
      ...clientInfos,
      notificationDeviceToken: registrationId
    })
  })
}

export const _stopPushNotifications = () =>
  new Promise((resolve, reject) => {
    if (push) {
      push.unregister(
        () => {
          push = null
          resolve()
        },
        error => {
          reject(new Error('error while unregistering notifications: ' + error))
        }
      )
    } else {
      reject(
        new Error("Can't stop push notifications because they were not started")
      )
    }
  })

export const stopPushNotifications = async () => {
  try {
    await _stopPushNotifications()

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.info('Stopped push notifications')
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('Error while stopping push notification', e)
    }
  }
}

/**
 * Push plugin for CozyClient
 *
 * Registers lifecycle handlers to
 *
 * - register push notifications on login
 * - stop push notifications on logout
 */
export default client => {
  client.on('login', async () => {
    await startPushNotificationsIfSettingEnabled(client)
  })

  client.on('logout', async () => {
    await stopPushNotifications()
  })
}
