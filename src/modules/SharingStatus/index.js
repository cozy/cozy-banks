/* global cozy */

import { findSharing } from 'lib/sharings'

const FETCH_DOC_SHARING = 'FETCH_DOC_SHARING'
const FETCH_DOC_SHARING_SUCCESS = 'FETCH_DOC_SHARING_SUCCESS'
const FETCH_DOC_SHARING_ERROR = 'FETCH_DOC_SHARING_ERROR'

// ACTIONS
export const fetchSharingInfo = (doctype, id) => dispatch => {
  dispatch({ type: FETCH_DOC_SHARING, doctype, id })
  return findSharing(cozy.client, doctype, id).then(resp => {
    return dispatch({
      type: FETCH_DOC_SHARING_SUCCESS,
      doctype,
      id,
      sharing: resp
    })
  }, error => {
    return dispatch({
      type: FETCH_DOC_SHARING_ERROR,
      doctype,
      id,
      error
    })
  })
}

const key = (doctype, id) => {
  return `${doctype}/${id}`
}
// REDUCERS
// doctype+id -> { shared: true|false, fetching: true|false }
const initialState = {}
export const reducer = (state = initialState, action) => {
  const { type, doctype, id } = action
  const docKey = key(doctype, id)
  const docInfo = state[docKey] || {}
  let newDocInfo
  switch (type) {
    case FETCH_DOC_SHARING:
      newDocInfo = {
        ...docInfo,
        fetching: true
      }
      return { ...state, [docKey]: newDocInfo }
    case FETCH_DOC_SHARING_SUCCESS:
      newDocInfo = {
        ...docInfo,
        fetching: false,
        info: action.sharing
      }
      return { ...state, [docKey]: newDocInfo }
    case FETCH_DOC_SHARING_ERROR:
      newDocInfo = {
        ...docInfo,
        fetching: false
      }
      return { ...state, [docKey]: newDocInfo }
  }
  return state
}

// SELECTORS
export const getSharingInfo = function (state, doctype, id) {
  return state[key(doctype, id)]
}
