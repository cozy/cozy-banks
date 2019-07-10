import moment from 'moment'
import { BankTransaction } from 'cozy-doctypes'
import { sumBy } from 'lodash'

export const getPeriod = () => {
  const end = moment()
    .utc()
    .subtract(1, 'month')
    .endOf('month')

  const start = end
    .clone()
    .subtract(2, 'month')
    .startOf('month')

  return { start, end }
}

export const fetchTransactionsForPeriod = period => {
  return BankTransaction.queryAll({
    date: {
      $gte: period.start,
      $lte: period.end
    }
  })
}

export const getMeanOnPeriod = (transactions, period) => {
  const end = moment(period.end).utc()
  const start = moment(period.start).utc()
  const nbMonths = end.diff(start, 'months')
  const total = Math.abs(sumBy(transactions, transaction => transaction.amount))
  const mean = total / nbMonths

  return mean
}
