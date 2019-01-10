import { get } from 'lodash'
import { differenceInCalendarDays } from 'date-fns'

const PARTS_TO_DELETE = ['(sans Secure Key)']

export const getAccountInstitutionLabel = account => {
  if (!account) {
    return account
  }
  const label = PARTS_TO_DELETE.reduce(
    (label, partToDelete) => label.replace(partToDelete, ''),
    account.institutionLabel || ''
  )

  return label
}

export const getAccountLabel = account =>
  account ? account.shortLabel || account.label : ''

export const getAccountUpdateDate = account =>
  get(account, 'cozyMetadata.updatedAt')

export const getAccountUpdateDateDistance = (account, from) => {
  const updateDate = getAccountUpdateDate(account)

  if (!updateDate || !from) {
    return null
  }

  return differenceInCalendarDays(from, updateDate)
}
