/**
  Bank movements related features
**/

import { TRANSACTION_DOCTYPE } from 'doctypes'
import { addFilterForMostRecentTransactions } from 'ducks/filters'
import { fetchCollection } from 'cozy-client'

let firstFetch = true
const fetchTransactions = () => {
  const action = fetchCollection('transactions', TRANSACTION_DOCTYPE, {
    sort: {date: 'desc'},
    descending: true,
    limit: 100,
    fields: ['date', 'manualCategoryId', 'automaticCategoryId', 'currency', 'amount', 'label', 'bills', 'account']
  })

  const promiser = action.promise
  action.promise = (client, dispatch) => {
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
