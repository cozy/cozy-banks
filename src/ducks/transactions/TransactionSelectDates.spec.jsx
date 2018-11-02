import { getOptions } from './TransactionSelectDates'
import fixtures from 'test/fixtures'
import addMonths from 'date-fns/add_months'
import isBefore from 'date-fns/is_before'
import format from 'date-fns/format'
import includes from 'lodash/includes'

const transactions = fixtures['io.cozy.bank.operations']

const enabledMonth = [
  '2018-06',
  '2018-01',
  '2017-08',
  '2017-07',
  '2017-06'
]

const generateOption = date => {
  const month = format(date, 'YYYY-MM')
  return {
    "disabled": !includes(enabledMonth, month),
    "yearMonth": month,
  }
}

const generateOptions = () => {
  const options = []
  const startDate = new Date('2017-06-01')
  const endDate = new Date()
  let currentDate = startDate
  while (isBefore(currentDate, endDate)) {
    options.push(generateOption(currentDate))
    currentDate = addMonths(currentDate, 1)
  }

  return options.reverse()
}

describe('options from select dates', () => {
  it('should compute correctly', () => {
    expect(getOptions(transactions)).toEqual(generateOptions())
  })
})
