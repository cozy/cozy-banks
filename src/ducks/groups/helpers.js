import { groupBy, sortBy } from 'lodash'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { associateDocuments } from 'ducks/client/utils'

export const buildVirtualGroups = accounts => {
  const accountsByType = groupBy(accounts, account => account.type || 'other')

  const virtualGroups = Object.entries(accountsByType).map(
    ([type, accounts]) => {
      const group = {
        _id: type,
        _type: GROUP_DOCTYPE,
        label: type.toLowerCase(),
        virtual: true
      }

      associateDocuments(group, 'accounts', ACCOUNT_DOCTYPE, accounts)

      return group
    }
  )

  return virtualGroups
}

/**
 * Translate group properties
 * @param {Object} group - The group to translate
 * @param {Function} translate - The translation function
 * @returns {Object} The translated group
 */
export const translateGroup = (group, translate) => {
  return {
    ...group,
    label: group.virtual
      ? translate(`Data.accountTypes.${group.label}`, { _: 'other' })
      : group.label
  }
}

const isOtherVirtualGroup = group => group.virtual && group.label === 'other'

/**
 * Translate groups labels then sort them on their translated label. But always put "others accounts" last
 * @param {Object[]} groups - The groups to sort
 * @param {Function} translate - The translation function
 * @returns {Object[]} The sorted groups
 */
export const translateAndSortGroups = (groups, translate) => {
  const groupsToSort = groups
    .filter(group => !isOtherVirtualGroup(group))
    .map(group => translateGroup(group, translate))

  const sortedGroups = sortBy(groupsToSort, group => group.label)

  const otherGroup = groups.find(isOtherVirtualGroup)

  if (otherGroup) {
    sortedGroups.push(translateGroup(otherGroup, translate))
  }

  return sortedGroups
}
