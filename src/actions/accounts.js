/* global cozy */
import { throwServerError } from './index.js'

export const INDEX_BANK_ACCOUNTS_BY_ID = 'INDEX_BANK_ACCOUNTS_BY_ID'
export const INDEX_BANK_ACCOUNTS_BY_ID_SUCCESS = 'INDEX_BANK_ACCOUNTS_BY_ID_SUCCESS'
export const FETCH_BANK_ACCOUNTS = 'FETCH_BANK_ACCOUNTS'
export const FETCH_BANK_ACCOUNTS_SUCCESS = 'FETCH_BANK_ACCOUNTS_SUCCESS'

export const BANK_ACCOUNTS_DOCTYPE = 'io.cozy.bank.accounts'

// Mango: Index bank accounts
export const indexAccounts = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_ACCOUNTS_BY_ID })
    const fields = [ '_id' ]
    return cozy.client.data.defineIndex(BANK_ACCOUNTS_DOCTYPE, fields)
      .then((mangoIndexByDate) => {
        dispatch({
          type: INDEX_BANK_ACCOUNTS_BY_ID_SUCCESS,
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
export const fetchAccounts = mangoIndex => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BANK_ACCOUNTS })
    return cozy.client.data.query(mangoIndex, {
      selector: {'_id': {'$gt': null}},
      fields: ['_id', 'label', 'institutionLabel', 'number', 'balance']
    }).then((accounts) => {
      dispatch({type: FETCH_BANK_ACCOUNTS_SUCCESS, accounts})
    }).catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}
