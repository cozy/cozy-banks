import {
  transactionsConn,
  HasManyReimbursements,
  makeFilteredTransactionsConn
} from './doctypes'
import getClient from 'test/client'

const client = getClient()

describe('transactionsConn', () => {
  it('should have no limit', () => {
    expect(transactionsConn.query(client).limit).toBeNull()
  })
})

describe('HasManyReimbursements', () => {
  describe('query', () => {
    it('should return a QueryDefinition with the right ids', () => {
      const doc = {
        reimbursements: [
          { billId: 'io.cozy.bills:b1' },
          { billId: 'io.cozy.bills:b2' },
          { billId: 'io.cozy.bills:b3' },
          {} // just to test that docs without billId are handled
        ]
      }

      const assoc = { name: 'reimbursements' }
      const queryDefinition = HasManyReimbursements.query(doc, null, assoc)

      expect(queryDefinition.ids).toEqual(['b1', 'b2', 'b3'])
    })
  })
})

describe('makeFilteredTransactionsConn', () => {
  it('should output a disabled query if accounts/groups have not been fetched yet', () => {
    const conn1 = makeFilteredTransactionsConn({
      groups: {},
      accounts: {},
      filteringDoc: {
        _id: 'g1',
        _type: 'io.cozy.bank.groups'
      }
    })
    expect(conn1.enabled).toBe(false)
  })

  it('should output a query if accounts/groups have been fetched yet', () => {
    const conn1 = makeFilteredTransactionsConn({
      groups: {
        lastUpdate: Date.now(),
        data: [
          {
            _id: 'g1',
            accounts: {
              raw: ['a1', 'a2', 'a3']
            }
          }
        ]
      },
      accounts: {
        lastUpdate: Date.now()
      },
      filteringDoc: {
        _id: 'g1',
        _type: 'io.cozy.bank.groups'
      }
    })
    expect(conn1.enabled).toBe(true)
    const query = conn1.query()
    expect(query).toEqual(
      expect.objectContaining({
        indexedFields: ['account', 'date'],
        selector: {
          $or: [{ account: 'a1' }, { account: 'a2' }, { account: 'a3' }]
        },
        sort: [{ account: 'desc' }, { date: 'desc' }]
      })
    )
  })
})
