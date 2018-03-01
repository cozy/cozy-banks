import configureStore from 'store/configureStore'
import { createDocument } from 'cozy-client'
import { hydrateTransaction } from './transaction'
import { BILLS_DOCTYPE } from 'doctypes'

const fakeCozyClient = {
  attachStore: () => {},
  createDocument: (doctype, doc) => {
    doc._type = doctype
    doc.id = doc._id
    return Promise.resolve({ data: [doc] })
  }
}

describe('transaction', () => {
  const healthId = '400610'
  const BILL_ID = '1234'
  let store, transaction, bill
  beforeEach(() => {
    transaction = {
      automaticCategoryId: healthId,
      amount: -10,
      reimbursements: [{ billId: `${BILLS_DOCTYPE}:${BILL_ID}` }]
    }
    bill = { _id: BILL_ID, invoice: 'io.cozy.files:4567' }
    store = configureStore(fakeCozyClient)
    store.dispatch(createDocument(BILLS_DOCTYPE, bill))
  })

  describe('reimbursements', () => {
    it('should be hydrated if transaction in health category', () => {
      const transactions = [transaction].map(t =>
        hydrateTransaction(store.getState(), t)
      )
      expect(transactions[0].reimbursements[0].bill._id).toBe(BILL_ID)
    })

    it('should not be hydrated if transaction not in the health category', () => {
      const transactions = [
        { ...transaction, automaticCategoryId: '1000' }
      ].map(t => hydrateTransaction(store.getState(), t))
      expect(transactions[0].reimbursements[0].bill).toBe(undefined)
    })

    it('should not be hydrated if bill does not exist in store', () => {
      const transactions = [
        { ...transaction, reimbursements: [{billId: undefined}] }
      ].map(t => hydrateTransaction(store.getState(), t))
      expect(transactions[0].reimbursements[0].bill).toBe(undefined)
    })
  })
})
