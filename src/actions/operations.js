/* global cozy */

/**
  Bank movements related features
**/
import { throwServerError } from './index'
import { BANK_ACCOUNTS_DOCTYPE } from './accounts'

export const INDEX_BANK_OPERATIONS_BY_DATE = 'INDEX_BANK_OPERATIONS_BY_DATE'
export const INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS = 'INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS'
export const FETCH_BANK_OPERATIONS = 'FETCH_BANK_OPERATIONS'
export const FETCH_BANK_OPERATIONS_SUCCESS = 'FETCH_BANK_OPERATIONS_SUCCESS'

export const BANK_OPERATIONS_DOCTYPE = 'io.cozy.bank.operations'

// Mango: Index bank operations
export const indexOperationsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_OPERATIONS_BY_DATE })
    const fields = [ 'date' ]
    return cozy.client.data.defineIndex(BANK_OPERATIONS_DOCTYPE, fields)
      .then((mangoIndexByDate) => {
        dispatch({
          type: INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS,
          mangoIndexByDate
        })
        return mangoIndexByDate
      }).catch(fetchError => {
        if (fetchError instanceof Error) throw fetchError
        throwServerError(fetchError)
      })
  }
}

// Returns bank operations
export const fetchOperations = (mangoIndex) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BANK_OPERATIONS })
    return cozy.client.data.query(mangoIndex, {
      selector: {'date': {'$gt': null}},
      fields: ['_id', 'category', 'account', 'label', 'amount', 'currency', 'date', 'action'],
      descending: true
    }).then((operations) => {
      // remove the prefix from account ids
      operations = operations.map(operation => {
        if (operation.account.indexOf(BANK_ACCOUNTS_DOCTYPE) === 0) operation.account = operation.account.substring(BANK_ACCOUNTS_DOCTYPE.length + 1)
        return operation
      })

      dispatch({type: FETCH_BANK_OPERATIONS_SUCCESS, operations})
    }).catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}
