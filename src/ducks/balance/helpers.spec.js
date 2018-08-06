import { getBalanceHistory } from './helpers'
import { parse as parseDate } from 'date-fns'

describe('getBalanceHistory', () => {
  it('should return only the current balance if there is no transactions', () => {
    const account = { _id: 'test', balance: 8000 }
    const transactions = []
    const date = '2018-08-01'
    const from = parseDate(date)
    const history = getBalanceHistory(account, transactions, from)

    expect(Object.keys(history)).toEqual([date])
    expect(history[date]).toBe(8000)
  })

  it('should return the right balances if there are transactions', () => {
    const account = { _id: 'test', balance: 8000 }
    const dates = [
      '2018-06-26',
      '2018-06-25',
      '2018-06-24',
      '2018-06-23',
      '2018-06-22'
    ]
    const transactions = [
      { date: parseDate(dates[1]), amount: 100 },
      { date: parseDate(dates[2]), amount: 10 },
      { date: parseDate(dates[3]), amount: -300 },
      { date: parseDate(dates[4]), amount: -15 }
    ]

    const history = getBalanceHistory(
      account,
      transactions,
      parseDate(dates[0])
    )

    expect(Object.keys(history)).toEqual(dates)
    expect(Object.values(history)).toEqual([8000, 7900, 7890, 8190, 8205])
  })
})
