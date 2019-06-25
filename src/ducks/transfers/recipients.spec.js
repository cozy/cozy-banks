import { groupAsBeneficiary, createCategoryFilter } from './recipients'

const recipients = [
  {
    category: 'internal',
    label: 'My account',
    vendorAccountId: 1
  },
  {
    category: 'internal',
    label: 'My account',
    vendorAccountId: 2
  },
  {
    category: 'external',
    label: 'External 1',
    iban: 'FR763',
    vendorAccountId: 3
  },
  {
    category: 'external',
    label: 'External 1',
    iban: 'FR763',
    vendorAccountId: 4
  },
  {
    category: 'external',
    label: 'External 2',
    iban: 'FR764',
    vendorAccountId: 5
  }
]
const accounts = [
  { iban: 'FR761', label: 'My account', balance: 500 },
  { iban: 'FR764', label: 'External 2', balance: 500 }
]

describe('recipient utils', () => {
  it('should correctly group as beneficiary', () => {
    const beneficiaries = groupAsBeneficiary(recipients, accounts)
    expect(beneficiaries[0]).toMatchObject({
      category: 'internal',
      label: 'My account',
      iban: 'FR761',
      account: accounts[0]
    })
  })

  it('should correctly filter', () => {
    const isExternal = createCategoryFilter('external', accounts)
    const isInternal = createCategoryFilter('internal', accounts)

    // category is ok to discriminate
    expect(isExternal(recipients[0])).toBe(false)
    expect(isInternal(recipients[0])).toBe(true)

    // category is ok to discriminate
    expect(isExternal(recipients[3])).toBe(true)
    expect(isInternal(recipients[3])).toBe(false)

    // category is not sufficient, need to look at accounts
    expect(isExternal(recipients[4])).toBe(false)
    expect(isInternal(recipients[4])).toBe(true)
  })
})
