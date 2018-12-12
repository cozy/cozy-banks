import React, { PureComponent } from 'react'
import SelectDates from 'components/SelectDates'
import { uniq } from 'lodash'
import { subMonths, format, parse, differenceInCalendarMonths } from 'date-fns'

const rangeMonth = (startDate, endDate) => {
  const options = []

  for (let i = 0; i < differenceInCalendarMonths(endDate, startDate) + 1; i++) {
    options.push(subMonths(endDate, i))
  }

  return options
}

const getYearMonth = transaction => transaction.date.slice(0, 7)

export const getOptions = transactions => {
  const availableMonths = uniq(transactions.map(getYearMonth)).sort()

  const mAvailableMonths = new Set(availableMonths)

  const start = parse(availableMonths[0], 'YYYY-MM')
  const end = new Date()

  return rangeMonth(start, end).map(month => {
    const fmted = format(month, 'YYYY-MM')
    return {
      yearMonth: fmted,
      disabled: !mAvailableMonths.has(fmted)
    }
  })
}

class TransactionSelectDates extends PureComponent {
  render() {
    const { onChange, transactions, value } = this.props
    const options = getOptions(transactions)

    return <SelectDates onChange={onChange} options={options} value={value} />
  }
}

export default TransactionSelectDates
