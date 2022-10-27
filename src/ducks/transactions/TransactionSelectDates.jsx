import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import last from 'lodash/last'
import uniq from 'lodash/uniq'
import subMonths from 'date-fns/subMonths'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import isAfter from 'date-fns/isAfter'

import SelectDates, { monthRange } from 'components/SelectDates'
import { getDate } from 'ducks/transactions/helpers'
import useTransactionExtent from 'hooks/useTransactionExtent'

const rangeMonth = (startDate, endDate) => {
  const options = []

  for (let i = 0; i < differenceInCalendarMonths(endDate, startDate) + 1; i++) {
    options.push(subMonths(endDate, i))
  }

  return options
}

const getYearMonth = transaction => getDate(transaction).slice(0, 7)

export const getOptions = transactions => {
  const availableMonths = uniq(transactions.map(getYearMonth)).sort()

  const mAvailableMonths = new Set(availableMonths)

  const start = parse(availableMonths[0], 'yyyy-MM', new Date())
  const lastMonth = parse(last(availableMonths), 'yyyy-MM', new Date())
  const today = new Date()
  const end = isAfter(lastMonth, today) ? lastMonth : today

  return rangeMonth(start, end).map(month => {
    const fmted = format(month, 'yyyy-MM')
    return {
      yearMonth: fmted,
      disabled: !mAvailableMonths.has(fmted)
    }
  })
}

const getMonthFromTransaction = transaction => {
  return transaction.date.slice(0, 7)
}

const TransactionSelectDates = ({ onExtentLoad, ...props }) => {
  const [earliestTransaction, latestTransaction, loading] =
    useTransactionExtent()

  useEffect(() => {
    if (loading || !onExtentLoad) {
      return
    }
    onExtentLoad(
      earliestTransaction && latestTransaction
        ? [earliestTransaction, latestTransaction].map(getMonthFromTransaction)
        : []
    )
  }, [earliestTransaction, latestTransaction, loading, onExtentLoad])

  const options = useMemo(() => {
    if (!earliestTransaction || !latestTransaction) {
      return []
    }
    const { date: earliestDate } = earliestTransaction
    const { date: latestDate } = latestTransaction
    const range = monthRange(new Date(earliestDate), new Date(latestDate))
      .map(date => ({
        yearMonth: format(date, 'yyyy-MM'),
        disabled: false
      }))
      .reverse()
    return range
  }, [earliestTransaction, latestTransaction])

  return <SelectDates options={options} {...props} />
}

TransactionSelectDates.propTypes = {
  /**
   * When the time extent of the selector is available,
   * this callback is fired with [earliestMonth, latestMonth]
   *
   * @type {Function}
   */
  onExtentLoad: PropTypes.func
}

export default React.memo(TransactionSelectDates)
