import { buildVirtualGroups } from './helpers'

describe('buildVirtualGroups', () => {
  it('should generate a virtual group if there are two accounts with the same type', () => {
    const accounts = [
      { _id: '1', type: 'checkings' },
      { _id: '2', type: 'checkings' }
    ]

    const virtualGroups = buildVirtualGroups(accounts)
    const expected = [
      {
        _id: 'checkings',
        _type: 'io.cozy.bank.groups',
        label: 'checkings',
        accounts: {
          data: accounts
        },
        virtual: true
      }
    ]

    expect(virtualGroups).toEqual(expected)
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
