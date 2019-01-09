import { groupBy, sortBy } from 'lodash'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { associateDocuments } from 'ducks/client/utils'

export const buildVirtualGroups = accounts => {
  const accountsByType = groupBy(accounts, account => account.type)

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
      ? translate(`Data.accountTypes.${group.label}`)
      : group.label
  }
}
/**
 * Translate groups labels then sort them on their translated label. But always put "others accounts" last
 * @param {Object[]} groups - The groups to sort
 * @param {Function} translate - The translation function
 * @returns {Object[]} The sorted groups
 */
export const translateAndSortGroups = (groups, translate) => {
  const othersGroup = groups.find(g => g.virtual && g.label === 'undefined')

  const sortedGroups = sortBy(
    groups
      .filter(g => g !== othersGroup)
      .map(g => translateGroup(g, translate)),
    g => g.label
  )

  if (othersGroup) {
    sortedGroups.push(translateGroup(othersGroup, translate))
  }

  return sortedGroups
}
