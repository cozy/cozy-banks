import {
  getAccountUpdateDateDistance,
  distanceInWords,
  getAccountType,
  getAccountBalance,
  buildHealthReimbursementsVirtualAccount,
  buildVirtualAccounts
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
  it('should map types correctly', () => {
    const accountTypes = {
      Other: ['Unkown', 'None'],
      LongTermSavings: [
        'Article83',
        'LifeInsurance',
        'Madelin',
        'Market',
        'Mortgage',
        'PEA',
        'PEE',
        'Perco',
        'Perp',
        'RSP'
      ],
      Business: ['Asset', 'Capitalisation', 'Liability'],
      Checkings: ['Bank', 'Cash', 'Deposit'],
      Loan: ['ConsumerCredit', 'RevolvingCredit'],
      CreditCard: ['Credit card']
    }

    for (const [mapped, originals] of Object.entries(accountTypes)) {
      for (const original of originals) {
        expect(getAccountType({ type: original })).toBe(mapped)
      }
    }
  })
})

describe('getAccountBalance', () => {
  it('should return the comingBalance if the account is a CreditCard one and it has a comingBalance', () => {
    const account = {
      type: 'CreditCard',
      comingBalance: 100,
      balance: 200
    }

    expect(getAccountBalance(account)).toBe(account.comingBalance)
  })

  it('should return the balance if the account is a CreditCard one but it has no comingBalance', () => {
    const account = {
      type: 'CreditCard',
      balance: 200
    }

    expect(getAccountBalance(account)).toBe(account.balance)
  })

  it('should return the balance if the account is not a CreditCard one', () => {
    const account = { type: 'Checkings', balance: 200 }

    expect(getAccountBalance(account)).toBe(account.balance)
  })
})

describe('buildHealthReimbursementsVirtualAccount', () => {
  let transactions

  beforeEach(() => {
    transactions = [
      { manualCategoryId: '400610', amount: -10, date: '2019-01-02' },
      { manualCategoryId: '400610', amount: -10, date: '2019-01-02' },
      { manualCategoryId: '400610', amount: -10, date: '2019-01-02' },
      { manualCategoryId: '400610', amount: -10, date: '2019-01-02' },
      { manualCategoryId: '400610', amount: -10, date: '2018-01-02' },
      { manualCategoryId: '400470', amount: 10 }
    ]
  })

  it('should return a balance equals to 0 if no transactions', () => {
    const virtualAccount = buildHealthReimbursementsVirtualAccount([])
    expect(virtualAccount.balance).toBe(0)
  })

  it('should sum only this year transactions amounts', () => {
    const virtualAccount = buildHealthReimbursementsVirtualAccount(transactions)

    expect(virtualAccount.balance).toBe(40)
  })

  it('should take reimbursements into account', () => {
    transactions[0].reimbursements = {
      target: {
        reimbursements: [{ amount: 5 }]
      }
    }

    const virtualAccount = buildHealthReimbursementsVirtualAccount(transactions)

    expect(virtualAccount.balance).toBe(35)
  })

  it('should return a well formed account', () => {
    const expected = {
      _id: 'health_reimbursements',
      virtual: true,
      balance: expect.any(Number),
      label: 'Data.virtualAccounts.healthReimbursements',
      type: 'Reimbursements',
      currency: '€'
    }

    expect(buildHealthReimbursementsVirtualAccount(transactions)).toMatchObject(
      expected
    )
  })
})

describe('buildVirtualAccounts', () => {
  it('should contain a health reimbursements virtual account', () => {
    const virtualAccounts = buildVirtualAccounts([])
    const healthReimbursementsAccount = virtualAccounts.filter(
      a => a._id === 'health_reimbursements'
    )
    expect(healthReimbursementsAccount).toHaveLength(1)
  })
})
