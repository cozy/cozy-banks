import min from 'lodash/min'
import max from 'lodash/max'
import formatDate from 'date-fns/format'
import addYears from 'date-fns/addYears'
import subYears from 'date-fns/subYears'
import parseISO from 'date-fns/parseISO'

import { Bill } from 'models'
import Linker from './Linker/Linker'

export default async function matchFromTransactions(transactions) {
  const transactionsDates = transactions.map(transaction =>
    parseISO(transaction.date)
  )
  const dateMin = subYears(min(transactionsDates), 1)
  const dateMax = addYears(max(transactionsDates), 1)

  const selector = {
    date: {
      $gt: formatDate(dateMin, 'yyyy-MM-dd'),
      $lt: formatDate(dateMax, 'yyyy-MM-dd')
    }
  }

  const bills = await Bill.queryAll(selector)

  const linker = new Linker()
  const results = await linker.linkBillsToOperations(bills, transactions)

  return results
}
