import {
  startOfMonth,
  endOfMonth,
  subMonths,
  differenceInMonths
} from 'date-fns'
import { BankTransaction } from 'cozy-doctypes'
import { sumBy } from 'lodash'

export const getPeriod = () => {
  const today = new Date()
  const end = endOfMonth(subMonths(today, 1))
  const start = startOfMonth(subMonths(end, 2))

  return { start, end }
}

export const fetchTransactionsForPeriod = period => {
  return BankTransaction.queryAll({
    date: {
      $gt: period.start,
      $lt: period.end
    }
  })
}

export const getMeanOnPeriod = (transactions, period) => {
  const nbMonths = differenceInMonths(period.end, period.start)
  const total = Math.abs(sumBy(transactions, transaction => transaction.amount))
  const mean = total / nbMonths

  return mean
}
