import fixtures from 'test/fixtures'
import { makeRecurrenceFromTransaction } from './utils'

test('make recurrence from transaction', () => {
  const transaction = fixtures['io.cozy.bank.operations'][0]
  const account = fixtures['io.cozy.bank.accounts'][0]
  const hydratedTransaction = {
    ...transaction,
    account: {
      data: account
    }
  }
  const recurrence = makeRecurrenceFromTransaction(hydratedTransaction)
  expect(recurrence).toEqual({
    _type: 'io.cozy.bank.recurrence',

    accounts: ['compteisa4'],
    amounts: [-1231],
    automaticLabel: 'Remboursement Pret Lcl',
    categoryIds: ['401010'],
    latestDate: '2017-08-25T00:00:00Z',
    stats: {
      deltas: {
        median: 30
      }
    }
  })
})
