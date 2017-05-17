/* global cozy */
import { throwServerError } from './index.js'

export const INDEX_BANK_ACCOUNT_GROUPS_BY_ID = 'INDEX_BANK_ACCOUNT_GROUPS_BY_ID'
export const INDEX_BANK_ACCOUNT_GROUPS_BY_ID_SUCCESS = 'INDEX_BANK_ACCOUNT_GROUPS_BY_ID_SUCCESS'
export const FETCH_BANK_ACCOUNT_GROUPS = 'FETCH_BANK_ACCOUNT_GROUPS'
export const FETCH_BANK_ACCOUNT_GROUPS_SUCCESS = 'FETCH_BANK_ACCOUNT_GROUPS_SUCCESS'
export const UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS = 'UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS'
//export const SELECT_ACCOUNTS = 'SELECT_ACCOUNTS'

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
      fields: ['_id', 'label', 'accounts']
    }).then((groups) => {
      dispatch({type: FETCH_BANK_ACCOUNT_GROUPS_SUCCESS, groups})
    }).catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}

export const updateGroup = (groupId, data) => {
  return async (dispatch) => {
    return cozy.client.data.updateAttributes(BANK_ACCOUNT_GROUPS_DOCTYPE, groupId, data)
    .then(attributes => {
      dispatch({type: UPDATE_BANK_ACCOUNT_GROUPS_SUCCESS, group: {
        _id: attributes._id,
        label: attributes.label,
        accounts: attributes.accounts,
      }})
    })
  }
}

//export const selectAccounts = (accountIds = []) => ({
//  type: SELECT_ACCOUNTS,
//  accounts: accountIds
//})
