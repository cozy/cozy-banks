/* global cozy */

/**
  Bank movements related features
**/
import { throwServerError } from './index'
import { ACCOUNT_DOCTYPE, OPERATION_DOCTYPE } from 'doctypes'
import { addFilterForMostRecentOperations } from 'ducks/filters'

export const INDEX_BANK_OPERATIONS_BY_DATE = 'INDEX_BANK_OPERATIONS_BY_DATE'
export const INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS = 'INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS'
export const SET_OPERATIONS = 'SET_OPERATIONS'

export const DOCTYPE_BILL = 'io.cozy.files'

// Mango: Index bank operations
export const indexOperationsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_OPERATIONS_BY_DATE })
    const fields = [ 'date' ]
    return cozy.client.data.defineIndex(OPERATION_DOCTYPE, fields)
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

const removeAccountPrefix = operations => operations.map(operation => {
  if (operation.account && operation.account.indexOf(ACCOUNT_DOCTYPE) === 0) {
    operation.account = operation.account.substring(ACCOUNT_DOCTYPE.length + 1)
  }
  return operation
})

// Returns bank operations
const baseFetchOperations = mangoIndex => async dispatch => {
  try {
    let operations = await cozy.client.data.query(mangoIndex, {
      selector: {'date': {'$gt': null}},
      descending: true
    })
    operations = removeAccountPrefix(operations)
    dispatch({type: SET_OPERATIONS, operations})
    return operations
  } catch (fetchError) {
    if (fetchError instanceof Error) throw fetchError
    throwServerError(fetchError)
  }
}

let firstFetch = true
const fetchOperations = mangoIndex => async dispatch => {
  const operations = await dispatch(baseFetchOperations(mangoIndex))
  if (firstFetch) {
    firstFetch = false
    dispatch(addFilterForMostRecentOperations(operations))
  }
  return operations
}

export { fetchOperations }
