import { getBalanceHistory } from './helpers'

describe('getBalanceHistory', () => {
  it('should return only the current balance if there is no transactions', () => {
    const account = { id: 'test', balance: 8000 }
    const transactions = []
    const history = getBalanceHistory(account, transactions, new Date())

    expect(history).toHaveLength(1)
    expect(history[0].balance).toBe(8000)
  })

  it('should return the right balances if there are transactions', () => {
    const account = { id: 'test', balance: 8000 }
    const transactions = [
      { date: new Date(2018, 5, 25), amount: 100 },
      { date: new Date(2018, 5, 24), amount: 10 },
      { date: new Date(2018, 5, 23), amount: -300 },
      { date: new Date(2018, 5, 22), amount: -15 }
    ]

    const history = getBalanceHistory(
      account,
      transactions,
      new Date(2018, 5, 26)
    )

    expect(history).toHaveLength(5)
    expect(history.map(h => h.balance)).toEqual([8000, 7900, 7890, 8190, 8205])
  })
})
