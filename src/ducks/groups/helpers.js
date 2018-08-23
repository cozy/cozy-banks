import { groupBy } from 'lodash'
import { GROUP_DOCTYPE } from 'doctypes'

export const buildVirtualGroups = accounts => {
  const accountsByType = groupBy(accounts, account => account.type)

  const virtualGroups = Object.entries(accountsByType)
    .filter(([type, accounts]) => type !== 'undefined' && accounts.length > 1)
    .map(([type, accounts]) => ({
      _id: type,
      _type: GROUP_DOCTYPE,
      label: type.toLowerCase(),
      accounts: {
        data: accounts
      },
      virtual: true
    }))

  return virtualGroups
}
