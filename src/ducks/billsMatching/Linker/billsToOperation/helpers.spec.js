import {
  getIdentifiers,
  getOperationAmountFromBill,
  getOperationDateFromBill,
  getDateRangeFromBill,
  getAmountRangeFromBill,
  getTotalReimbursements,
  sortedOperations
} from './helpers'

const OK = 'ok'

describe('getterHelper', () => {
  test('getIdentifiers', () => {
    expect(getIdentifiers({ identifiers: OK })).toBe(OK)
  })

  describe('getOperationAmountFromBill', () => {
    const amount = 7.5
    const originalAmount = 25
    const bill1 = { amount, originalAmount }
    const bill2 = { amount }

    test('find debit amount', () => {
      expect(getOperationAmountFromBill(bill1)).toBe(-originalAmount)
      expect(getOperationAmountFromBill(bill2)).toBe(-amount)
    })
    test('find credit amount', () => {
      expect(getOperationAmountFromBill(bill1, { credit: true })).toBe(amount)
    })
  })

  describe('getOperationDateFromBill', () => {
    const date = '2018-01-08'
    const originalDate = '2018-01-03'
    const bill1 = { date, originalDate }
    const bill2 = { date }

    it('should find debit date', () => {
      expect(getOperationDateFromBill(bill1)).toEqual(new Date(originalDate))
      expect(getOperationDateFromBill(bill2)).toEqual(new Date(date))
    })
    it('should find credit date', () => {
      expect(getOperationDateFromBill(bill1, { credit: true })).toEqual(
        new Date(date)
      )
    })
  })

  describe('getDateRangeFromBill', () => {
    const pastWindow = 1
    const futureWindow = 1
    const date = '2018-01-08'
    const originalDate = '2018-01-03'

    const bill = { date, originalDate }
    const options = { pastWindow, futureWindow }
    const creditOptions = { ...options, credit: true }

    it('should find debit date range', () => {
      const { minDate, maxDate } = getDateRangeFromBill(bill, options)
      expect(minDate).toEqual(new Date('2018-01-02'))
      expect(maxDate).toEqual(new Date('2018-01-04'))
    })

    it('should find credit date range', () => {
      const { minDate, maxDate } = getDateRangeFromBill(bill, creditOptions)
      expect(minDate).toEqual(new Date('2018-01-07'))
      expect(maxDate).toEqual(new Date('2018-01-09'))
    })
  })

  describe('getAmountRangeFromBill', () => {
    const minAmountDelta = 1
    const maxAmountDelta = 1
    const amount = 7.5
    const originalAmount = 25

    const bill1 = { amount }
    const bill2 = { amount, originalAmount }
    const options = { minAmountDelta, maxAmountDelta }
    const creditOptions = { ...options, credit: true }

    it('should find debit amount range (negative)', () => {
      const { minAmount, maxAmount } = getAmountRangeFromBill(bill1, options)
      expect(minAmount).toEqual(-8.5)
      expect(maxAmount).toEqual(-6.5)
    })

    it('should find debit amount range of bill with originalAmount (negative)', () => {
      const { minAmount, maxAmount } = getAmountRangeFromBill(bill2, options)
      expect(minAmount).toEqual(-26)
      expect(maxAmount).toEqual(-24)
    })

    it('sould find credit amount range (positive)', () => {
      const { minAmount, maxAmount } = getAmountRangeFromBill(
        bill1,
        creditOptions
      )
      expect(minAmount).toEqual(6.5)
      expect(maxAmount).toEqual(8.5)
    })

    it('should find credit amount range of bill with originalAmount (positive)', () => {
      const { minAmount, maxAmount } = getAmountRangeFromBill(
        bill2,
        creditOptions
      )
      expect(minAmount).toEqual(6.5)
      expect(maxAmount).toEqual(8.5)
    })
  })

  describe('getTotalReimbursements', () => {
    it('should return 0 when no reimbursements field', () => {
      const op = {}
      expect(getTotalReimbursements(op)).toEqual(0)
    })

    it('should return the total amount of reimbursements field', () => {
      const amount1 = 3
      const amount2 = 2
      const op = { reimbursements: [{ amount: amount1 }, { amount: amount2 }] }
      expect(getTotalReimbursements(op)).toEqual(5) // amount1 + amount2
    })
  })

  describe('sortedOperations', () => {
    const bill = { date: new Date(2017, 0, 17), amount: 10 }

    test('op.date === bill.date && op.amount === bill.amount', () => {
      const operations = [
        { id: 1, date: new Date(2017, 0, 16), amount: -10 },
        { id: 3, date: new Date(2017, 0, 17), amount: -10 },
        { id: 2, date: new Date(2017, 0, 17), amount: -11 }
      ]
      expect(sortedOperations(bill, operations)[0]).toEqual(operations[1])
    })

    test('op.date === bill.date, so only amount is important', () => {
      const operations = [
        { id: 1, date: new Date(2017, 0, 17), amount: -8 },
        { id: 2, date: new Date(2017, 0, 17), amount: -9 },
        { id: 3, date: new Date(2017, 0, 17), amount: -12 }
      ]
      expect(sortedOperations(bill, operations)[0]).toEqual(operations[1])
    })

    test('op.amount === bill.amount, so only date is important', () => {
      const operations = [
        { id: 1, date: new Date(2017, 0, 15), amount: -10 },
        { id: 2, date: new Date(2017, 0, 18), amount: -10 },
        { id: 3, date: new Date(2017, 0, 19), amount: -10 }
      ]
      expect(sortedOperations(bill, operations)[0]).toEqual(operations[1])
    })

    test('amount & date are different', () => {
      const operations = [
        { id: 1, date: new Date(2017, 0, 16), amount: -12 },
        { id: 2, date: new Date(2017, 0, 18), amount: -11 },
        { id: 3, date: new Date(2017, 0, 19), amount: -13 }
      ]
      expect(sortedOperations(bill, operations)[0]).toEqual(operations[1])
    })
  })
})
