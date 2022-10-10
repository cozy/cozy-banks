import matchFromTransactions from './matchFromTransactions'
import { Bill } from 'models'

jest.mock('./Linker/Linker')

const transactions = [
  { date: '2019-07-01T00:00:00.000Z' },
  { date: '2019-07-20T00:00:00.000Z' },
  { date: '2019-08-21T00:00:00.000Z' }
]

beforeEach(() => {
  jest.spyOn(Bill, 'queryAll').mockImplementation(() => {})
})

it('should fetch the potentials bills', async () => {
  await matchFromTransactions(transactions)

  expect(Bill.queryAll).toHaveBeenCalledWith({
    date: {
      $gt: '2018-07-01',
      $lt: '2020-08-21'
    }
  })
})
