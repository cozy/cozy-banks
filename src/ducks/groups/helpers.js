import { groupBy, sortBy, deburr } from 'lodash'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { associateDocuments } from 'ducks/client/utils'
import { getAccountType } from 'ducks/account/helpers'
import flag from 'cozy-flags'

export const getGroupLabel = (group, t) => {
  if (group.virtual) {
    return (
      t(`Data.accountTypes.${group.label}`, { _: 'other' }) +
      (flag('debug-groups') ? ' (virtual)' : '')
    )
  } else {
    return group.label
  }
}

export const buildAutoGroup = (accountType, accounts, options = {}) => {
  const { virtual = true } = options
  const group = {
    _type: GROUP_DOCTYPE,
    label: accountType
  }

  if (virtual) {
    group.virtual = true
    group._id = accountType
  }

  associateDocuments(group, 'accounts', ACCOUNT_DOCTYPE, accounts)

  return group
}

export const buildAutoGroups = (accounts, options) => {
  const accountsByType = groupBy(accounts, getAccountType)

  const virtualGroups = Object.entries(accountsByType).map(
    ([accountType, accounts]) => buildAutoGroup(accountType, accounts, options)
  )

  return virtualGroups
}

/**
 * Returns a function that returns the translated label of a group
 *
 * @param {Object} group - Group
 * @param {Function} translate - Translation function
 * @returns {Object} Translated label
 */

const isOtherVirtualGroup = group => group.virtual && group.label === 'Other'

export const isReimbursementsVirtualGroup = group =>
  group.virtual && group._id === 'Reimbursements'

const getCategory = group => {
  if (isReimbursementsVirtualGroup(group)) {
    return 'virtualReimbursements'
  } else if (isOtherVirtualGroup(group)) {
    return 'virtualOther'
  } else {
    return 'normal'
  }
}

const groupSortingPriorities = {
  normal: 0,
  virtualOther: 1,
  virtualReimbursements: 2
}

/**
 * Translate groups labels then sort them on their translated label. But always put "others accounts" last
 * @param {Object[]} groups - The groups to sort
 * @param {Function} translate - The translation function
 * @returns {Object[]} The sorted wrapped groups ({ category, label, group })
 */
export const translateAndSortGroups = (groups, translate) => {
  // Wrap groups to add necessary information for sorting
  const wrappedGroups = groups.map(group => ({
    group,
    category: getCategory(group),
    label: getGroupLabel(group, translate)
  }))

  return sortBy(wrappedGroups, ({ label, category }) => [
    groupSortingPriorities[category],
    deburr(label).toLowerCase()
  ])
}
