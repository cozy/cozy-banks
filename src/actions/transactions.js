/* global cozy */

/**
  Bank movements related features
**/
import { throwServerError } from './index'
import { ACCOUNT_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'
import { addFilterForMostRecentTransactions } from 'ducks/filters'

export const INDEX_BANK_TRANSACTIONS_BY_DATE = 'INDEX_BANK_TRANSACTIONS_BY_DATE'
export const INDEX_BANK_TRANSACTIONS_BY_DATE_SUCCESS = 'INDEX_BANK_TRANSACTIONS_BY_DATE_SUCCESS'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'

export const DOCTYPE_BILL = 'io.cozy.files'

// Mango: Index bank transactions
export const indexTransactionsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_BANK_TRANSACTIONS_BY_DATE })
    const fields = [ 'date' ]
    return cozy.client.data.defineIndex(TRANSACTION_DOCTYPE, fields)
      .then((mangoIndexByDate) => {
        dispatch({
          type: INDEX_BANK_TRANSACTIONS_BY_DATE_SUCCESS,
          mangoIndexByDate
        })
        return mangoIndexByDate
      }).catch(fetchError => {
        if (fetchError instanceof Error) throw fetchError
        throwServerError(fetchError)
      })
  }
}

const removeAccountPrefix = transactions => transactions.map(transaction => {
  if (transaction.account && transaction.account.indexOf(ACCOUNT_DOCTYPE) === 0) {
    transaction.account = transaction.account.substring(ACCOUNT_DOCTYPE.length + 1)
  }
  return transaction
})

// Returns bank transactions
const baseFetchTransactions = mangoIndex => async dispatch => {
  try {
    let transactions = await cozy.client.data.query(mangoIndex, {
      selector: {'date': {'$gt': null}},
      descending: true
    })
    transactions = removeAccountPrefix(transactions)
    dispatch({type: SET_TRANSACTIONS, transactions})
    return transactions
  } catch (fetchError) {
    if (fetchError instanceof Error) throw fetchError
    throwServerError(fetchError)
  }
}

let firstFetch = true
const fetchTransactions = mangoIndex => async dispatch => {
  const transactions = await dispatch(baseFetchTransactions(mangoIndex))
  if (firstFetch) {
    firstFetch = false
    dispatch(addFilterForMostRecentTransactions(transactions))
  }
  return transactions
}

export { fetchTransactions }
