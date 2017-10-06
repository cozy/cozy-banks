// action creators
export const SET_CLIENT = 'SET_CLIENT'
export const SET_URL = 'SET_URL'
export const REVOKE_CLIENT = 'REVOKE_CLIENT'

export const setClient = client => ({ type: SET_CLIENT, client })
export const setURL = url => ({ type: SET_URL, url })
export const revokeClient = () => ({ type: REVOKE_CLIENT })

// reducers
export const initialState = {
  url: '',
  client: null,
  revoked: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL:
      return { ...state, url: action.url }
    case SET_CLIENT:
      return { ...state, client: action.client, revoked: false }
    case REVOKE_CLIENT:
      return { ...state, revoked: true }
    default:
      return state
  }
}

export default reducer
