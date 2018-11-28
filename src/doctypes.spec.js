import { transactionsConn } from './doctypes'
import getClient from 'test/client'

const client = getClient()

describe('transactionsConn', () => {
  it('should have no limit', () => {
    expect(transactionsConn.query(client).limit).toBeNull()
  })
})
