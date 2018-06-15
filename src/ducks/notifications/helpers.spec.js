import { getBanksUrl } from './helpers'

describe.only('getBanksUrl', () => {
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
