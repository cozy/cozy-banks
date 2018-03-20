/* global PushNotification, cozy */

import { resetClient, getDevicePlatform } from 'ducks/authentication/lib/client'
import localForage from 'localforage'
import { hashHistory } from 'react-router'

// constants
const SET_TOKEN = 'SET_TOKEN'
const REVOKE_CLIENT = 'REVOKE_CLIENT'
const UNLINK = 'UNLINK'
const STORE_CREDENTIALS = 'STORE_CREDENTIALS'
const INITIAL_SYNC_OK = 'INITIAL_SYNC_OK'
const REGISTER_PUSH_NOTIFICATIONS = 'REGISTER_PUSH_NOTIFICATIONS'
const UNREGISTER_PUSH_NOTIFICATIONS = 'UNREGISTER_PUSH_NOTIFICATIONS'

// action creators
export const setToken = token => ({ type: SET_TOKEN, token })
export const storeCredentials = (url, client, token) =>
  ({ type: STORE_CREDENTIALS, url, client, token })
export const revokeClient = () => ({ type: REVOKE_CLIENT })
export const unlink = (clientInfo) => {
  resetClient(clientInfo)
  return { type: UNLINK }
}
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
  url: '',
  client: null,
  token: null,
  revoked: false,
  push: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CREDENTIALS:
      return { ...state, url: action.url, client: action.client, token: action.token, revoked: false }
    case SET_TOKEN:
      return { ...state, token: action.token }
    case REVOKE_CLIENT:
      return { ...state, revoked: true }
    case UNLINK:
      return initialState
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

// selectors
export const getURL = state => state.url
export const getAccessToken = state => state.token ? state.token.accessToken : null

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
      forceShow: true
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
