import { resetClient } from 'ducks/authentication/lib/client'

// constants
const SET_TOKEN = 'SET_TOKEN'
const REVOKE_CLIENT = 'REVOKE_CLIENT'
const UNLINK = 'UNLINK'
const STORE_CREDENTIALS = 'STORE_CREDENTIALS'

// action creators
export const setToken = token => ({ type: SET_TOKEN, token })
export const storeCredentials = (url, client, token) =>
  ({ type: STORE_CREDENTIALS, url, client, token })
export const revokeClient = () => ({ type: REVOKE_CLIENT })
export const unlink = (clientInfo) => {
  resetClient(clientInfo)
  return { type: UNLINK }
}

// reducers
export const initialState = {
  url: '',
  client: null,
  token: null,
  revoked: false
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
    default:
      return state
  }
}

export default reducer

// selectors
export const getURL = state => state.url
export const getAccessToken = state => state.token ? state.token.accessToken : null
