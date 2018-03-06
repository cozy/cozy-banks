const transactions = require('./transactions')

describe('transactions', () => {
  beforeEach(() => {
    transactions.fetchTransactions = jest.fn()
  })
  it('should be able to fetch for a specific month', () => {
    transactions.fetchTransactionsFor({
      month: '2012-12'
    })
    expect(transactions.fetchTransactions).toHaveBeenCalledWith({
      selector: {
        date: {
          $lt: '2013-01',
          $gt: '2012-12'
        }
      }
    })
  })
})
