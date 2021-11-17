import {
  isTransactionAmountGreaterThan,
  getReimbursementBillId,
  getReimbursementBillIds,
  getScheduleDate
} from './helpers'

describe('isTransactionAmountGreaterThan', () => {
  it('should return if amount is geater then transation amount', () => {
    expect(isTransactionAmountGreaterThan(100)({ amount: 200 })).toBe(true)
    expect(isTransactionAmountGreaterThan(100)({ amount: 50 })).toBe(false)
  })
  it('should return false when maxAmount is null or undefined', () => {
    expect(isTransactionAmountGreaterThan(undefined)({ amount: 50 })).toBe(
      false
    )
    expect(isTransactionAmountGreaterThan(null)({ amount: 50 })).toBe(false)
  })
})

describe('getReimbursementBillId', () => {
  it('should return the bill id', () => {
    const reimbursement = { billId: 'io.cozy.bills:1' }

    expect(getReimbursementBillId(reimbursement)).toBe('1')
  })
})

describe('getReimbursementBillIds', () => {
  it('should return the bill ids', () => {
    const transactions = [
      { reimbursements: [{ billId: 'io.cozy.bills:1' }] },
      { reimbursements: [{ billId: 'io.cozy.bills:2' }] },
      { reimbursements: [{ billId: 'io.cozy.bills:3' }] },
      {} // it should not fail if a transaction has no reimbursements
    ]

    expect(getReimbursementBillIds(transactions)).toEqual(['1', '2', '3'])
  })
})

describe('getScheduleDate', () => {
  it('should return a date the next day at 6AM', () => {
    const date = new Date('2021-11-01T23:30:00')

    expect(getScheduleDate(date).getDay()).toBe(2)
    expect(getScheduleDate(date).getHours()).toBe(6)
  })

  it('should return the same date at 6AM', () => {
    const date = new Date('2021-11-02T01:30:00')

    expect(getScheduleDate(date).getDay()).toBe(2)
    expect(getScheduleDate(date).getHours()).toBe(6)
  })

  it('should return the same date and same hours', () => {
    const date = new Date('2021-11-01T22:30:00')

    expect(getScheduleDate(date).getDay()).toBe(1)
    expect(getScheduleDate(date).getHours()).toBe(22)
    expect(getScheduleDate(date).getMinutes()).toBe(30)

    const date2 = new Date('2021-11-02T06:30:00')

    expect(getScheduleDate(date2).getDay()).toBe(2)
    expect(getScheduleDate(date2).getHours()).toBe(6)
    expect(getScheduleDate(date2).getMinutes()).toBe(30)
  })
})
