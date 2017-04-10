/* global cozy */

/**
  Bank movements related features
**/

export const INDEX_BANK_OPERATIONS_BY_DATE = 'INDEX_BANK_OPERATIONS_BY_DATE'
export const INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS = 'INDEX_BANK_OPERATIONS_BY_DATE_SUCCESS'
export const FETCH_BANK_OPERATIONS = 'FETCH_BANK_OPERATIONS'
export const FETCH_BANK_OPERATIONS_SUCCESS = 'FETCH_BANK_OPERATIONS_SUCCESS'

export const BANK_OPERATIONS_DOCTYPE = 'io.cozy.bank_operations'

// Mango: Index bank operations
export const indexOperationsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_OPERATIONS_BY_DATE })
    const fields = [ 'date' ]
    return await cozy.client.data.defineIndex(BANK_OPERATIONS_DOCTYPE, fields)
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

// helper to hanlde server error
export const throwServerError = (error) => {
  throw new Error(error.response
    ? error.response.statusText
    : error
  )
}

// Returns bank operations
export const fetchOperations = (mangoIndex) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BANK_OPERATIONS })
    return await cozy.client.data.query(mangoIndex, {
      selector: {'date': {'$gt': null}},
      fields: ['_id', 'operationType', 'name', 'amount', 'currency', 'date', 'action'],
      descending: true
    }).then((operations) => {
      dispatch({type: FETCH_BANK_OPERATIONS_SUCCESS, operations})
    }).catch(fetchError => {
      if (fetchError instanceof Error) throw fetchError
      throwServerError(fetchError)
    })
  }
}
