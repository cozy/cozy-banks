/* global cozy */

/**
  Bank movements related features
**/
import { throwServerError } from './index'
import { BANK_ACCOUNTS_DOCTYPE } from './accounts'

export const INDEX_BANK_OPERATIONS_BY_DATE = 'INDEX_BANK_OPERATIONS_BY_DATE'
export const INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS = 'INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS'
export const SET_OPERATIONS = 'SET_OPERATIONS'

export const BANK_OPERATIONS_DOCTYPE = 'io.cozy.bank.operations'
export const DOCTYPE_BILL = 'io.cozy.files'

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

const removeAccountPrefix = (operations) => operations.map(operation => {
  if (operation.account.indexOf(BANK_ACCOUNTS_DOCTYPE) === 0) {
    operation.account = operation.account.substring(BANK_ACCOUNTS_DOCTYPE.length + 1)
  }
  return operation
})

// Returns bank operations
export const fetchOperations = (mangoIndex) => {
  return async (dispatch) => {
    return cozy.client.data.query(mangoIndex, {
      selector: {'date': {'$gt': null}},
      descending: true
    })
    .then(removeAccountPrefix)
    .then(operations => {
      dispatch({type: SET_OPERATIONS, operations})
      return operations
    })
    .then(operations => operations.map(operation => {
      if (operation.bill) {
        const [ doctype, id ] = operation.bill.split(':')
        const action = {
          type: 'bill',
          payload: {
            doctype,
            id
          }
        }
        dispatch({ type: 'ATTACH_ACTION', id: operation._id, action })
      }
      return operations
    }))
    .catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}
