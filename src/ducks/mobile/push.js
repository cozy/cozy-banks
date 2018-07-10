/* global cozy */
import { hashHistory } from 'react-router'
import { getSettingsFromState, isNotificationEnabled } from 'ducks/settings'

let push

export const registerPushNotifications = () => async (dispatch, getState) => {
  const state = getState()

  const settings = getSettingsFromState(state)
  const client = state.mobile.client

  return startPushNotifications(settings, client)
}

export const startPushNotifications = (settings, client) => {
  if (push || !isNotificationEnabled(settings)) {
    return
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
  push.on('registration', ({ registrationId }) => {
    cozy.client.auth.updateClient({
      ...client,
      notificationDeviceToken: registrationId
    })
  })
}

export const stopPushNotifications = () => {
  if (push) {
    push.unregister(
      () => {
        push = null
      },
      error => {
        throw new Error('error while unregistering notifications: ' + error)
      }
    )
  }
}
