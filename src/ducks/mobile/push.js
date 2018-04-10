/* global PushNotification, cozy */
import { getDevicePlatform } from 'ducks/authentication/lib/client'
import { hashHistory } from 'react-router'

let push

const isAndroidDevice = () => getDevicePlatform() === 'android'

export const registerPushNotifications = () => async (dispatch, getState) => {
  if (push || !isAndroidDevice()) {
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

  push = PushNotification.init({
    android: {
      forceShow: true,
      clearNotifications: false
    }
  })

  push.on('notification', handleNotification)
  // eslint-disable-next-line no-console
  push.on('error', err => console.log(err))
  push.on('registration', ({ registrationId }) => {
    cozy.client.auth.updateClient({
      ...getState().mobile.client,
      notificationDeviceToken: registrationId
    })
  })
}

export const stopPushNotifications = () => {
  if (push) {
    push.unregister(
      // eslint-disable-next-line no-console
      () => console.log('unregister push notifications'),
      error => {
        throw new Error('error while unregistering notifications: ' + error)
      }
    )
  }
}
