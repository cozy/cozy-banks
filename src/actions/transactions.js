/**
  Bank movements related features
**/

import { TRANSACTION_DOCTYPE } from 'doctypes'
import { addFilterForMostRecentTransactions } from 'ducks/filters'
import { fetchCollection } from 'cozy-client'

let firstFetch = true
const fetchTransactions = (dispatch) => {
  const action = fetchCollection('transactions', TRANSACTION_DOCTYPE, {
    selector: {date: {'$gt': null}},
    sort: {date: 'desc'},
    descending: true,
    limit: 100,
    fields: ['date', 'categoryId', 'currency', 'amount', 'label', 'bills', 'account']
  })

  const promiser = action.promise
  action.promise = (client) => {
    return promiser(client).then(res => {
      if (firstFetch) {
        firstFetch = false
        dispatch(addFilterForMostRecentTransactions(res.data))
      }

      return res
    })
  }

  return action
}

export { fetchTransactions }
