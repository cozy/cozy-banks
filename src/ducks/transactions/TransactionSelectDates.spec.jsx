import { getOptions } from './TransactionSelectDates'
import fixtures from 'test/fixtures'

const transactions = fixtures['io.cozy.bank.operations']


describe('options from select dates', () => {
  it('should compute correctly', () => {
    expect(getOptions(transactions)).toMatchSnapshot()
  })
})
