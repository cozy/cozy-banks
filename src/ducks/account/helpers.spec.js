import {
  getAccountUpdateDateDistance,
  distanceInWords,
  getAccountType
} from './helpers'

describe('getAccountUpdateDateDistance', () => {
  it('should return null if an argument is missing', () => {
    const account = { cozyMetadata: { updatedAt: new Date(2019, 0, 10) } }
    const from = new Date(2019, 0, 10)

    expect(getAccountUpdateDateDistance()).toBeNull()
    expect(getAccountUpdateDateDistance(account)).toBeNull()
    expect(getAccountUpdateDateDistance(undefined, from)).toBeNull()
  })

  it('should return the right distance in days', () => {
    const account = { cozyMetadata: { updatedAt: new Date(2019, 0, 1) } }

    expect(getAccountUpdateDateDistance(account, new Date(2019, 0, 10))).toBe(9)
    expect(getAccountUpdateDateDistance(account, new Date(2019, 0, 2))).toBe(1)
  })
})

describe('distanceInWords', () => {
  it('should return the right string for a given distance', () => {
    expect(distanceInWords(0)).toBe('Balance.updated_at.today')
    expect(distanceInWords(1)).toBe('Balance.updated_at.yesterday')
    expect(distanceInWords(2)).toBe('Balance.updated_at.n_days_ago')
    expect(distanceInWords(10)).toBe('Balance.updated_at.n_days_ago')
    expect(distanceInWords()).toBe('Balance.updated_at.unknown')
  })
})

describe('getAccountType', () => {
  it('should map Unkown/None to Other', () => {
    const accounts = [{ type: 'Unkown' }, { type: 'None' }, { type: 'Other' }]

    expect(getAccountType(accounts[0])).toBe('Other')
    expect(getAccountType(accounts[1])).toBe('Other')
    expect(getAccountType(accounts[2])).toBe('Other')
  })

  it('should map PERCO/PERP/Article83 to RetirementPlan', () => {
    const accounts = [
      { type: 'Perco' },
      { type: 'Perp' },
      { type: 'Article83' }
    ]

    expect(getAccountType(accounts[0])).toBe('RetirementPlan')
    expect(getAccountType(accounts[1])).toBe('RetirementPlan')
    expect(getAccountType(accounts[2])).toBe('RetirementPlan')
  })
})
