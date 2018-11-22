import {
  getTransactionsForAccount,
  getBalanceHistory,
  getBalanceHistories
} from './helpers'
import { parse as parseDate } from 'date-fns'

describe('getTransactionsForAccount', () => {
  it('should return transactions of a particular account', () => {
    const transactions = [
      { account: '1' },
      { account: '2' },
      { account: '1' },
      { account: '3' },
      { account: '4' },
      { account: '1' },
      { account: '5' }
    ]

    expect(getTransactionsForAccount('1', transactions)).toEqual([
      transactions[0],
      transactions[2],
      transactions[5]
    ])
  })
})

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
    const transactions = [
      { date: '2018-06-25T00:00:00Z', amount: 100 },
      { date: '2018-06-24T00:00:00Z', amount: 10 },
      { date: '2018-06-23T00:00:00Z', amount: -300 },
      { date: '2018-06-22T00:00:00Z', amount: -15 }
    ]

    const history = getBalanceHistory(
      account,
      transactions,
      new Date(2018, 5, 26)
    )

    const expectedKeys = [
      '2018-06-26',
      '2018-06-25',
      '2018-06-24',
      '2018-06-23',
      '2018-06-22'
    ]

    const expectedValues = [8000, 7900, 7890, 8190, 8205]

    expect(Object.keys(history)).toEqual(expectedKeys)
    expect(Object.values(history)).toEqual(expectedValues)
  })
})

describe('getBalanceHistories', () => {
  it('should return null if there is no account', () => {
    expect(getBalanceHistories([], [{ amount: 42 }])).toBeNull()
  })

  it('should return null if there is no transaction', () => {
    expect(getBalanceHistories([{ balance: 8000 }], [])).toBeNull()
  })

  it('should return an object with a property for each account id, and a "all" property', () => {
    const accounts = [
      { _id: '1', balance: 8000 },
      { _id: '2', balance: 5000 },
      { _id: '3', balance: 2000 }
    ]

    const transactions = [{ account: '1', amount: 10 }]
    const from = new Date(2018, 10, 22)

    const histories = getBalanceHistories(accounts, transactions, from)

    expect(Object.keys(histories)).toEqual(['1', '2', '3', 'all'])
  })

  it('should return the right histories', () => {
    const accounts = [{ _id: '1', balance: 8000 }, { _id: '2', balance: 1000 }]
    const transactions = [
      { account: '1', amount: -1000, date: '2018-11-21' },
      { account: '2', amount: 1000, date: '2018-11-20' }
    ]
    const from = new Date(2018, 10, 22)

    const histories = getBalanceHistories(accounts, transactions, from)

    expect(histories[1]).toEqual({ '2018-11-22': 8000, '2018-11-21': 9000 })
    expect(histories[2]).toEqual({
      '2018-11-22': 1000,
      '2018-11-21': 1000,
      '2018-11-20': 0
    })
    expect(histories.all).toEqual({
      '2018-11-22': 9000,
      '2018-11-21': 10000,
      '2018-11-20': 0
    })
  })
})
