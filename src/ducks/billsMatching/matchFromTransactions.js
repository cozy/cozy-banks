import { max, min } from 'lodash'
import { DEFAULT_FUTURE_WINDOW, DEFAULT_PAST_WINDOW } from './Linker/Linker'
import { format as formatDate, addDays, subDays } from 'date-fns'
import { Bill } from 'models'
import Linker from './Linker/Linker'

export default async function matchFromTransactions(transactions) {
  const transactionsDates = transactions.map(transaction => transaction.date)
  const dateMin = subDays(min(transactionsDates), DEFAULT_FUTURE_WINDOW)
  const dateMax = addDays(max(transactionsDates), DEFAULT_PAST_WINDOW)

  const selector = {
    date: {
      $gt: formatDate(dateMin, 'YYYY-MM-DD'),
      $lt: formatDate(dateMax, 'YYYY-MM-DD')
    }
  }

  const bills = await Bill.queryAll(selector)

  const linker = new Linker()
  const results = await linker.linkBillsToOperations(bills, transactions)

  return results
}
