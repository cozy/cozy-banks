/**
  Bank movements related features
**/

import { TRANSACTION_DOCTYPE } from 'doctypes'
import { addFilterForMostRecentTransactions } from 'ducks/filters'
import { fetchCollection } from 'cozy-client'
import { isHealthExpense } from 'ducks/categories/helpers'
import { fetchBill } from 'actions/bills'

let firstFetch = true
const handleFirstFetch = (dispatch, res) => {
  if (firstFetch) {
    firstFetch = false
    dispatch(addFilterForMostRecentTransactions(res.data))
  }

  return res
}

const fetchTransactions = () => {
  const action = fetchCollection('transactions', TRANSACTION_DOCTYPE, {
    sort: {date: 'desc'},
    descending: true,
    limit: 100,
    fields: ['date', 'manualCategoryId', 'automaticCategoryId', 'currency', 'amount', 'label', 'bills', 'account']
  })

  const promiser = action.promise
  action.promise = (client, dispatch) => {
    return promiser(client)
      .then(res => handleFirstFetch(dispatch, res))
      .then(res => {
        const docIds = res.data.reduce((docIds, transaction) => {
          if (!isHealthExpense(transaction)) {
            return docIds
          }

          return [
            ...docIds,
            ...transaction.reimbursements.map(reimbursement => reimbursement.billId.split(':')[1])
          ]
        }, [])

        docIds.forEach(id => dispatch(fetchBill(id)))

        return res
      })
  }

  return action
}

export { fetchTransactions }
