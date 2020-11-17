import { createSelector } from 'reselect'
import addDays from 'date-fns/add_days'

import { getRecurrences } from 'selectors'
import { getFilteredAccountIds } from 'ducks/filters'
import { nextDate, STATUS_FINISHED } from 'ducks/recurrence'

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
    const res = []
    for (let recurrence of recurrences) {
      if (recurrence.status === STATUS_FINISHED) {
        continue
      }

      if (!recurrence.latestDate) {
        continue
      }

      if (
        filteredAccountIds &&
        filteredAccountIds.indexOf(recurrence.lastBankAccount) === -1
      ) {
        continue
      }

      const futureDate = nextDate(recurrence).toISOString()
      if (futureDate > maxDate) {
        continue
      }

      res.push({
        label: recurrence.automaticLabel,
        date: futureDate,
        amount: recurrence.amounts[0],
        account: recurrence.lastBankAccount,
        automaticCategoryId: recurrence.categoryIds[0]
      })
    }
    return res
  }
)
