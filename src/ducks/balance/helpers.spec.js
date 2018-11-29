import {
  getTransactionsForAccount,
  getBalanceHistory,
  getBalanceHistories,
  sumBalanceHistories,
  getAllDates,
  balanceHistoryToChartData
} from './helpers'
import { format as formatDate } from 'date-fns'

describe('getTransactionsForAccount', () => {
  describe('With included relationship', () => {
    it('should return transactions of a particular account', () => {
      const transactions = [
        { account: { data: { _id: '1' } } },
        { account: { data: { _id: '2' } } },
        { account: { data: { _id: '1' } } },
        { account: { data: { _id: '3' } } },
        { account: { data: { _id: '4' } } },
        { account: { data: { _id: '1' } } },
        { account: { data: { _id: '5' } } }
      ]

      expect(getTransactionsForAccount('1', transactions)).toEqual([
        transactions[0],
        transactions[2],
        transactions[5]
      ])
    })
  })

  describe('Without included relationship', () => {
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
})

describe('getBalanceHistory', () => {
  it('should return only the latest balance if there is no transaction and from is not specified', () => {
    const account = { _id: 'test', balance: 8000 }
    const transactions = []
    const to = new Date()
    const date = formatDate(to, 'YYYY-MM-DD')
    const history = getBalanceHistory(account, transactions, to)

    expect(Object.keys(history)).toEqual([date])
    expect(history[date]).toBe(8000)
  })

  it('should return the same balance for all dates if there is no transaction and from is specified', () => {
    const account = { _id: 'test', balance: 8000 }
    const transactions = []
    const to = new Date(2018, 5, 26)
    const from = new Date(2018, 5, 24)
    const history = getBalanceHistory(account, transactions, to, from)

    const expectedKeys = ['2018-06-26', '2018-06-25', '2018-06-24']
    const expectedValues = [8000, 8000, 8000]

    expect(Object.keys(history)).toEqual(expectedKeys)
    expect(Object.values(history)).toEqual(expectedValues)
  })

  it('should return history from the earliest transaction date if from is not specified', () => {
    const account = { _id: 'test', balance: 8000 }
    const transactions = [
      { date: '2018-06-25T00:00:00Z', amount: 100 },
      { date: '2018-06-24T00:00:00Z', amount: 10 },
      { date: '2018-06-23T00:00:00Z', amount: -300 },
      { date: '2018-06-22T00:00:00Z', amount: -15 }
    ]
    const to = new Date(2018, 5, 26)
    const history = getBalanceHistory(account, transactions, to)

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

  it('should return history from the specified date if from is specified', () => {
    const account = { _id: 'test', balance: 8000 }
    const transactions = [
      { date: '2018-06-25T00:00:00Z', amount: 100 },
      { date: '2018-06-24T00:00:00Z', amount: 10 },
      { date: '2018-06-23T00:00:00Z', amount: -300 },
      { date: '2018-06-22T00:00:00Z', amount: -15 }
    ]
    const to = new Date(2018, 5, 26)
    const from = new Date(2018, 5, 24)
    const history = getBalanceHistory(account, transactions, to, from)

    const expectedKeys = ['2018-06-26', '2018-06-25', '2018-06-24']
    const expectedValues = [8000, 7900, 7890]

    expect(Object.keys(history)).toEqual(expectedKeys)
    expect(Object.values(history)).toEqual(expectedValues)
  })
})

describe('getAllDates', () => {
  it('should return all the unique dates for a given set of balance histories', () => {
    const histories = [
      { '2018-11-22': 8000, '2018-11-21': 9000 },
      { '2018-11-22': 5000 },
      { '2018-11-22': 1000, '2018-11-21': 500, '2018-11-20': 600 }
    ]

    const expected = ['2018-11-22', '2018-11-21', '2018-11-20']
    const result = getAllDates(histories)

    expect(result).toEqual(expected)
  })
})

describe('sumBalanceHistories', () => {
  it('should return a single balance history that is the sum of histories in params', () => {
    const histories = [
      { '2018-11-22': 8000, '2018-11-21': 9000 },
      { '2018-11-22': 5000 },
      { '2018-11-22': 1000, '2018-11-21': 500, '2018-11-20': 600 }
    ]

    const expected = {
      '2018-11-22': 14000,
      '2018-11-21': 9500,
      '2018-11-20': 600
    }

    const result = sumBalanceHistories(histories)

    expect(result).toEqual(expected)
  })
})

describe('getBalanceHistories', () => {
  it('should return null if there is no account', () => {
    expect(getBalanceHistories([], [{ amount: 42 }])).toBeNull()
  })

  it('should return an object with a property for each account id', () => {
    const accounts = [
      { _id: 'acc1', balance: 8000 },
      { _id: 'acc2', balance: 5000 },
      { _id: 'acc3', balance: 2000 }
    ]

    const transactions = []
    const to = new Date(2018, 5, 26)
    const histories = getBalanceHistories(accounts, transactions, to)

    expect(Object.keys(histories)).toEqual(['acc1', 'acc2', 'acc3'])
  })

  it('should return the right histories if there is no transaction', () => {
    const accounts = [
      { _id: 'acc1', balance: 8000 },
      { _id: 'acc2', balance: 5000 },
      { _id: 'acc3', balance: 2000 }
    ]

    const transactions = []

    const to = new Date(2018, 5, 26)
    const from = new Date(2018, 5, 24)

    const histories = getBalanceHistories(accounts, transactions, to, from)

    expect(histories['acc1']).toEqual({
      '2018-06-26': 8000,
      '2018-06-25': 8000,
      '2018-06-24': 8000
    })

    expect(histories['acc2']).toEqual({
      '2018-06-26': 5000,
      '2018-06-25': 5000,
      '2018-06-24': 5000
    })

    expect(histories['acc3']).toEqual({
      '2018-06-26': 2000,
      '2018-06-25': 2000,
      '2018-06-24': 2000
    })
  })

  it('should return the right histories if there is transactions', () => {
    const accounts = [
      { _id: 'acc1', balance: 8000 },
      { _id: 'acc2', balance: 1000 }
    ]

    const transactions = [
      { account: 'acc1', amount: -1000, date: '2018-11-21' },
      { account: 'acc2', amount: 1000, date: '2018-11-20' }
    ]

    const to = new Date(2018, 10, 22)
    const from = new Date(2018, 10, 20)

    const histories = getBalanceHistories(accounts, transactions, to, from)

    expect(histories['acc1']).toEqual({
      '2018-11-22': 8000,
      '2018-11-21': 9000,
      '2018-11-20': 9000
    })

    expect(histories['acc2']).toEqual({
      '2018-11-22': 1000,
      '2018-11-21': 1000,
      '2018-11-20': 0
    })
  })
})

describe('balanceHistoryToChartData', () => {
  it('should sort by date desc', () => {
    const history = { '2018-11-22': 1000, '2018-11-21': 500, '2018-11-20': 600 }
    const expected = ['2018-11-22', '2018-11-21', '2018-11-20']
    const chartData = balanceHistoryToChartData(history)
    const dates = chartData.map(item => formatDate(item.x, 'YYYY-MM-DD'))

    expect(dates).toEqual(expected)
  })

  it('should return the right data', () => {
    const history = { '2018-11-22': 1000, '2018-11-21': 500, '2018-11-20': 600 }
    const expected = [1000, 500, 600]
    const chartData = balanceHistoryToChartData(history)
    const values = chartData.map(item => item.y)

    expect(values).toEqual(expected)
  })
})
