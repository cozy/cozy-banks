import { createSelector } from 'reselect'
import addDays from 'date-fns/add_days'

import { getRecurrences } from 'selectors'
import { getFilteredAccountIds } from 'ducks/filters'
import { nextDate, STATUS_FINISHED } from 'ducks/recurrence'
import getClient from 'selectors/getClient'
import { TRANSACTION_DOCTYPE } from 'doctypes'

export const getMaxDate = () => {
  return addDays(new Date(Date.now()), 30)
    .toISOString()
    .slice(0, 10)
}

/**
 * Returns planned transactions based on recurrences
 */
export const getPlannedTransactions = createSelector(
  [getRecurrences, getFilteredAccountIds, getMaxDate],
  (recurrences, filteredAccountIds, maxDate) => {
    const client = getClient()
    const res = []
    for (let recurrence of recurrences) {
      if (recurrence.status === STATUS_FINISHED) {
        continue
      }

      if (!recurrence.latestDate) {
        continue
      }

      const lastBankAccount = recurrence.accounts && recurrence.accounts[0]
      if (
        filteredAccountIds &&
        filteredAccountIds.indexOf(lastBankAccount) === -1
      ) {
        continue
      }

      const futureDate = nextDate(recurrence).toISOString()
      if (futureDate > maxDate) {
        continue
      }

      const transaction = client.hydrateDocument({
        _type: TRANSACTION_DOCTYPE,
        label: recurrence.automaticLabel,
        date: futureDate,
        amount: recurrence.amounts[0],
        account: lastBankAccount,
        automaticCategoryId: recurrence.categoryIds[0]
      })
      res.push(transaction)
    }
    return res
  }
)
