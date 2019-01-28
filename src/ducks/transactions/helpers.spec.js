import configureStore from 'store/configureStore'
import { hydrateTransaction, getDate } from './helpers'
import { BILLS_DOCTYPE } from 'doctypes'

const fakeCozyClient = {
  attachStore: () => {},
  createDocument: (doctype, doc) => {
    doc._type = doctype
    doc.id = doc._id
    return Promise.resolve({ data: [doc] })
  }
}

xdescribe('transaction', () => {
  const healthId = '400610'
  const BILL_ID = '1234'
  let store, transaction // , bill
  beforeEach(() => {
    transaction = {
      automaticCategoryId: healthId,
      amount: -10,
      reimbursements: [{ billId: `${BILLS_DOCTYPE}:${BILL_ID}` }]
    }
    // bill = { _id: BILL_ID, invoice: 'io.cozy.files:4567' }
    store = configureStore(fakeCozyClient)
    // store.dispatch(createDocument(BILLS_DOCTYPE, bill))
  })

  describe('reimbursements', () => {
    it('should be hydrated if transaction in health category', () => {
      const transactions = [transaction].map(t =>
        hydrateTransaction(store.getState(), t)
      )
      expect(transactions[0].reimbursements[0].bill).toBeTruthy()
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
        { ...transaction, reimbursements: [{ billId: undefined }] }
      ].map(t => hydrateTransaction(store.getState(), t))
      expect(transactions[0].reimbursements[0].bill).toBe(undefined)
    })
  })
})

describe('getDate', () => {
  it('should return realisation date if there is one', () => {
    const transaction = {
      realisationDate: '2019-01-28T00:00:00Z',
      date: '2019-01-31T00:00:00Z'
    }

    expect(getDate(transaction)).toBe('2019-01-28')
  })

  it('should return the date if there is no relation date', () => {
    const transaction = { date: '2019-01-31T00:00:00Z' }

    expect(getDate(transaction)).toBe('2019-01-31')
  })
})
