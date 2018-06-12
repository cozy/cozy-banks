import React from 'react'
import SelectDates from 'components/SelectDates'
import uniq from 'lodash/uniq'
import { subMonths, format, parse, differenceInCalendarMonths } from 'date-fns'

const rangeMonth = (startDate, endDate) => {
  const options = []

  for (let i = 0; i < differenceInCalendarMonths(endDate, startDate); i++) {
    options.push(subMonths(endDate, i))
  }

  return options
}

const getYearMonth = transaction => transaction.date.slice(0, 7)

export const getOptions = transactions => {
  const availableMonths = uniq(transactions.map(getYearMonth)).sort()

  const mAvailableMonths = new Set(availableMonths)

  const start = parse(availableMonths[0], 'YYYY-MM')
  const end = parse(availableMonths[availableMonths.length - 1], 'YYYY-MM')

  return rangeMonth(start, end).map(month => {
    const fmted = format(month, 'YYYY-MM')
    return {
      yearMonth: fmted,
      disabled: !mAvailableMonths.has(fmted)
    }
  })
}

const TransactionSelectDates = ({ onChange, transactions, value }) => {
  return (
    <SelectDates
      onChange={onChange}
      options={getOptions(transactions)}
      value={value}
    />
  )
}

export default TransactionSelectDates
