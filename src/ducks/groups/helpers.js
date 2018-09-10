import { groupBy } from 'lodash'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { associateDocuments } from 'ducks/client/utils'

export const buildVirtualGroups = accounts => {
  const accountsByType = groupBy(accounts, account => account.type)

  const virtualGroups = Object.entries(accountsByType)
    .filter(([type, accounts]) => type !== 'undefined' && accounts.length > 1)
    .map(([type, accounts]) => {
      const group = {
        _id: type,
        _type: GROUP_DOCTYPE,
        label: type.toLowerCase(),
        virtual: true
      }

      associateDocuments(group, 'accounts', ACCOUNT_DOCTYPE, accounts)

      return group
    })

  return virtualGroups
}
