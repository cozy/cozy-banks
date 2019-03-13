/* global __TARGET__ */

import { LOCAL_MODEL_USAGE_THRESHOLD } from 'ducks/categories/helpers'
import { getTracker } from 'ducks/tracking'
import { categorize } from 'cozy-konnector-libs'

export const categorizes = async transactions => {
  await categorize(transactions)

  const tracker = getTracker(__TARGET__, { e_a: 'LocalCategorization' })
  const nbTransactionsAboveThreshold = transactions.reduce(
    (sum, transaction) => {
      if (transaction.localCategoryProba > LOCAL_MODEL_USAGE_THRESHOLD) {
        return sum + 1
      }

      return sum
    },
    0
  )

  tracker.trackEvent({
    e_n: 'TransactionsUsingLocalCategory',
    e_v: nbTransactionsAboveThreshold
  })

  return transactions
}
