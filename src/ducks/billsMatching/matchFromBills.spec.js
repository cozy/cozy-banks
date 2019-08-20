import matchFromBills from './matchFromBills'
import { Transaction } from 'models'

jest.mock('./Linker/Linker')

const bills = [
  { originalDate: '2019-07-01', date: '2019-07-05' },
  { date: '2019-07-19' },
  { date: '2019-08-01' },
  { date: '2019-08-20' }
]

beforeEach(() => {
  jest.spyOn(Transaction, 'queryAll').mockImplementation(() => {})
})

it('should fetch the potentials bills', async () => {
  await matchFromBills(bills)

  expect(Transaction.queryAll).toHaveBeenCalledWith({
    date: {
      $gt: '2019-06-16',
      $lt: '2019-09-18'
    }
  })
})
