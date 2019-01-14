import { isTransactionAmountGreaterThan, getBanksUrl } from './helpers'

describe('getBanksUrl', () => {
  it('should should append "-banks" to the first component', () => {
    expect(getBanksUrl('https://test.cozy.works')).toBe(
      'https://test-banks.cozy.works/#/'
    )
  })

  it('should append the path to the end of the URL', () => {
    expect(getBanksUrl('https://test.cozy.works', '/transactions')).toBe(
      'https://test-banks.cozy.works/#/transactions'
    )
  })
})

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
