import { buildVirtualGroups, translateGroup, sortGroups } from './helpers'
import { associateDocuments } from 'ducks/client/utils'
import { ACCOUNT_DOCTYPE } from 'doctypes'

describe('buildVirtualGroups', () => {
  it('should generate a virtual group for every account types', () => {
    const accounts = [
      { _id: '1', type: 'checkings' },
      { _id: '2', type: 'savings' }
    ]

    const virtualGroups = buildVirtualGroups(accounts)

    const checkingsGroup = {
      _id: 'checkings',
      _type: 'io.cozy.bank.groups',
      label: 'checkings',
      virtual: true
    }

    const savingsGroup = {
      _id: 'savings',
      _type: 'io.cozy.bank.groups',
      label: 'savings',
      virtual: true
    }

    associateDocuments(checkingsGroup, 'accounts', ACCOUNT_DOCTYPE, [
      accounts[0]
    ])
    associateDocuments(savingsGroup, 'accounts', ACCOUNT_DOCTYPE, [accounts[1]])

    const expected = [checkingsGroup, savingsGroup]

    expect(virtualGroups).toEqual(expected)
  })

  it('should generate a group for accounts that have no type', () => {
    const accounts = [{ _id: '1' }]
    const virtualGroups = buildVirtualGroups(accounts)

    const expectedGroup = {
      _id: 'undefined',
      _type: 'io.cozy.bank.groups',
      label: 'undefined',
      virtual: true
    }

    associateDocuments(expectedGroup, 'accounts', ACCOUNT_DOCTYPE, accounts)

    expect(virtualGroups).toEqual([expectedGroup])
  })
})

describe('translateGroup', () => {
  const translate = jest.fn().mockReturnValue('translated')

  afterEach(() => {
    translate.mockReset()
  })

  it("should translate the group label only if it's a virtual group", () => {
    const virtualGroup = {
      virtual: true,
      label: 'label'
    }

    const normalGroup = {
      virtual: false,
      label: 'label'
    }

    expect(translateGroup(virtualGroup, translate)).toEqual({
      ...virtualGroup,
      label: 'translated'
    })
    expect(translateGroup(normalGroup, translate)).toEqual(normalGroup)
  })
})

describe('sortGroups', () => {
  const translate = jest.fn(key => key)

  afterEach(() => {
    translate.mockClear()
  })

  it('should sort groups by translated label', () => {
    const groups = [
      { virtual: true, label: 'C' },
      { virtual: false, label: 'A' },
      { virtual: false, label: 'B' }
    ]

    const expected = [
      { virtual: false, label: 'A' },
      { virtual: false, label: 'B' },
      { virtual: true, label: 'Data.accountTypes.C' }
    ]

    expect(sortGroups(groups, translate)).toEqual(expected)
  })

  it('should put group with label "undefined" at the end', () => {
    const groups = [
      { virtual: true, label: 'C' },
      { virtual: false, label: 'A' },
      { virtual: false, label: 'B' },
      { virtual: true, label: 'undefined' }
    ]

    const expected = [
      { virtual: false, label: 'A' },
      { virtual: false, label: 'B' },
      { virtual: true, label: 'Data.accountTypes.C' },
      { virtual: true, label: 'Data.accountTypes.undefined' }
    ]

    expect(sortGroups(groups, translate)).toEqual(expected)
  })
})
