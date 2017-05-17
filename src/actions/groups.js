/* global cozy */
import { throwServerError } from './index.js'

export const INDEX_BANK_ACCOUNT_GROUPS_BY_ID = 'INDEX_BANK_ACCOUNT_GROUPS_BY_ID'
export const INDEX_BANK_ACCOUNT_GROUPS_BY_ID_SUCCESS = 'INDEX_BANK_ACCOUNT_GROUPS_BY_ID_SUCCESS'
export const FETCH_BANK_ACCOUNT_GROUPS = 'FETCH_BANK_ACCOUNT_GROUPS'
export const FETCH_BANK_ACCOUNT_GROUPS_SUCCESS = 'FETCH_BANK_ACCOUNT_GROUPS_SUCCESS'
export const CREATE_BANK_ACCOUNT_GROUPS_SUCCESS = 'CREATE_BANK_ACCOUNT_GROUPS_SUCCESS'
export const UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS = 'UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS'
export const DELETE_BANK_ACCOUNT_GROUPS_SUCCESS = 'DELETE_BANK_ACCOUNT_GROUPS_SUCCESS'
export const FILTER_GROUPS = 'FILTER_GROUPS'

export const BANK_ACCOUNT_GROUPS_DOCTYPE = 'io.cozy.bank.accountGroups'

export const indexAccountGroups = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_ACCOUNT_GROUPS_BY_ID })
    const fields = [ '_id' ]
    return cozy.client.data.defineIndex(BANK_ACCOUNT_GROUPS_DOCTYPE, fields)
      .then((mangoIndexByDate) => {
        dispatch({
          type: INDEX_BANK_ACCOUNT_GROUPS_BY_ID_SUCCESS,
          mangoIndexByDate
        })
        return mangoIndexByDate
      }).catch(fetchError => {
        if (fetchError instanceof Error) throw fetchError
        throwServerError(fetchError)
      })
  }
}

// Returns bank accounts
export const fetchAccountGroups = (mangoIndex) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BANK_ACCOUNT_GROUPS })
    return cozy.client.data.query(mangoIndex, {
      selector: {'_id': {'$gt': null}},
      fields: ['_id', '_rev', 'label', 'accounts']
    }).then((groups) => {
      dispatch({type: FETCH_BANK_ACCOUNT_GROUPS_SUCCESS, groups})
    }).catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}

export const createGroup = (data) => {
  return async (dispatch) => {
    return cozy.client.data.create(BANK_ACCOUNT_GROUPS_DOCTYPE, data)
    .then(group => {
      dispatch({
        type: CREATE_BANK_ACCOUNT_GROUPS_SUCCESS,
        group: group
      })
    })
    .catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}

export const updateGroup = (groupId, data) => {
  return async (dispatch) => {
    return cozy.client.data.updateAttributes(BANK_ACCOUNT_GROUPS_DOCTYPE, groupId, data)
    .then(group => {
      dispatch({
        type: UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS,
        group: group
      })
    })
    .catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}

export const deleteGroup = (group) => {
  return async (dispatch) => {
    return cozy.client.data.delete(BANK_ACCOUNT_GROUPS_DOCTYPE, group)
    .then(() => {
      dispatch({
        type: DELETE_BANK_ACCOUNT_GROUPS_SUCCESS,
        group: group
      })
    })
    .catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}

export const filterGroups = (groupIds = []) => {
  return {
    type: FILTER_GROUPS,
    groups: groupIds.map(id => (BANK_ACCOUNT_GROUPS_DOCTYPE + ':' + id))
  }
}
