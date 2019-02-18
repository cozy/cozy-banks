import { get } from 'lodash'
import { startPushNotifications } from './push'

// constants
const SET_TOKEN = 'SET_TOKEN'
const REVOKE_CLIENT = 'REVOKE_CLIENT'
const EXPIRE_TOKEN = 'EXPIRE_TOKEN'
export const UNLINK = 'UNLINK'
const STORE_CREDENTIALS = 'STORE_CREDENTIALS'
const INITIAL_SYNC_OK = 'INITIAL_SYNC_OK'
const RECEIVE_UPDATED_DOCUMENTS_FROM_POUCH =
  'RECEIVE_UPDATED_DOCUMENTS_FROM_POUCH'

// action creators
export const setToken = token => ({ type: SET_TOKEN, token })
export const expireToken = () => ({ type: EXPIRE_TOKEN })
export const storeCredentials = (url, client, token) => ({
  type: STORE_CREDENTIALS,
  url,
  client,
  token
})
export const revokeClient = () => ({ type: REVOKE_CLIENT })
export const unlink = () => ({ type: UNLINK })

// reducers
export const initialState = {
  url: '',
  client: null,
  token: null,
  revoked: false,
  syncOk: false,
  push: null
}

const DAY = 1000 * 60 * 60 * 24

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CREDENTIALS:
      return {
        ...state,
        url: action.url,
        client: action.client,
        token: action.token,
        revoked: false
      }
    case SET_TOKEN:
      return {
        ...state,
        token: {
          ...action.token,
          issuedAt: new Date()
        }
      }
    case EXPIRE_TOKEN: // Useful for tests
      return {
        ...state,
        token: {
          ...(state.token || {}),
          issuedAt: new Date(Date.now() - 8 * DAY)
        }
      }
    case REVOKE_CLIENT:
      return { ...state, revoked: true }
    case UNLINK:
      return initialState
    case INITIAL_SYNC_OK:
      return { ...state, syncOk: true }
    case RECEIVE_UPDATED_DOCUMENTS_FROM_POUCH:
      if (
        get(action, 'doctype') === 'io.cozy.bank.settings' &&
        get(action, 'docs[0]')
      ) {
        startPushNotifications(action.docs[0], state.client)
      }
      return state
    default:
      return state
  }
}

export default reducer

// selectors
export const getURL = state => state.url
export const getAccessToken = state =>
  state.token ? state.token.accessToken : null
export const isInitialSyncOK = state => state.syncOk === true
