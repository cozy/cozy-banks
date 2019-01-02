import { buildVirtualGroups } from './helpers'
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
