/* global PushNotification, cozy */

import { getDevicePlatform } from 'ducks/authentication/lib/client'
import localForage from 'localforage'
import { hashHistory } from 'react-router'

// constants
const INITIAL_SYNC_OK = 'INITIAL_SYNC_OK'
const REGISTER_PUSH_NOTIFICATIONS = 'REGISTER_PUSH_NOTIFICATIONS'
const UNREGISTER_PUSH_NOTIFICATIONS = 'UNREGISTER_PUSH_NOTIFICATIONS'

// action creators
export const registerPushNotifications = () => async (dispatch, getState) => {
  if (getState().mobile.push || !isAndroidDevice()) {
    return
  }

  /**
   * When we receive a notification while the app is in foreground, all on('notification')
   * handlers are executed. But we don't want to redirect the user without his consent.
   * So we redirect only when the user taps on the notification in the notification center.
   * In this case, the app is always in background.
   */
  const handleNotification = notification => {
    console.log('Received notification', notification)
    if (!notification.additionalData.foreground && notification.additionalData.route) {
      hashHistory.push(notification.additionalData.route)
    }
  }

  const push = initPushNotifications(handleNotification)

  dispatch({
    type: REGISTER_PUSH_NOTIFICATIONS,
    push
  })

  push.on('registration', ({registrationId}) => {
    cozy.client.auth.updateClient({
      ...getState().mobile.client,
      notificationDeviceToken: registrationId
    })
  })
}

export const unregisterPushNotifications = deviceName => async (dispatch, getState) => {
  if (!getState().mobile.push || !isAndroidDevice()) {
    return
  }

  cozy.client.auth.updateClient({
    ...getState().mobile.client,
    notificationDeviceToken: ''
  })

  dispatch({
    type: UNREGISTER_PUSH_NOTIFICATIONS
  })
}

// reducers
export const initialState = {
  push: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_SYNC_OK:
      setInitialSyncStatus(true)
      return state
    case REGISTER_PUSH_NOTIFICATIONS:
      return {
        ...state,
        push: action.push
      }
    case UNREGISTER_PUSH_NOTIFICATIONS:
      stopPushNotifications(state.push)
      return {
        ...state,
        push: null
      }
    default:
      return state
  }
}

export default reducer

// utils
export const setInitialSyncStatus = ok => localForage.setItem(INITIAL_SYNC_OK, ok)
export const getInitialSyncStatus = () => localForage.getItem(INITIAL_SYNC_OK)
export const isInitialSyncOK = async () => {
  const status = await getInitialSyncStatus()

  return status === true
}

const initPushNotifications = onReceive => {
  const push = PushNotification.init({
    android: {
      forceShow: true,
      clearNotifications: false
    }
  })

  push.on('notification', onReceive)
  push.on('error', (err) => console.log(err))

  return push
}

const stopPushNotifications = push => {
  push.unregister(
    () => console.log('unregister push notifications'),
    error => {
      throw new Error('error while unregistering notifications: ' + error)
    }
  )
}

const isAndroidDevice = () => getDevicePlatform() === 'android'
