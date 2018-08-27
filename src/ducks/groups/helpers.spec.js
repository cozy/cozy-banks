import { buildVirtualGroups } from './helpers'
import { associateDocuments } from 'utils/client'
import { ACCOUNT_DOCTYPE } from 'doctypes'

describe('buildVirtualGroups', () => {
  it('should generate a virtual group if there are two accounts with the same type', () => {
    const accounts = [
      { _id: '1', type: 'checkings' },
      { _id: '2', type: 'checkings' }
    ]

    const virtualGroups = buildVirtualGroups(accounts)
    const expected = {
      _id: 'checkings',
      _type: 'io.cozy.bank.groups',
      label: 'checkings',
      virtual: true
    }

    associateDocuments(expected, 'accounts', ACCOUNT_DOCTYPE, accounts)

    expect(virtualGroups).toHaveLength(1)
    expect(virtualGroups[0]).toEqual(expected)
  })

  it('should generate nothing if there a less than two accounts with the same type', () => {
    const accounts = [
      { _id: '1', type: 'checkings' },
      { _id: '2', type: 'epargne' }
    ]

    const virtualGroups = buildVirtualGroups(accounts)

    expect(virtualGroups).toHaveLength(0)
  })
})
