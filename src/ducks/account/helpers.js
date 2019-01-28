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

export const distanceInWords = distance => {
  if (!Number.isFinite(distance)) {
    return 'Balance.updated_at.unknown'
  }

  if (distance === 0) {
    return 'Balance.updated_at.today'
  }

  if (distance === 1) {
    return 'Balance.updated_at.yesterday'
  }

  return 'Balance.updated_at.n_days_ago'
}

export const accountTypesWithTranslation = [
  'Asset',
  'Bank',
  'Capitalisation',
  'Cash',
  'Checkings',
  'ConsumerCredit',
  'CreditCard',
  'Credit Card',
  'Deposit',
  'Joint',
  'Liability',
  'LifeInsurance',
  'Loan',
  'Madelin',
  'Market',
  'Mortgage',
  'PEA',
  'PEE',
  'RevolvingCredit',
  'RSP',
  'Savings',
  'Other',
  'RetirementPlan'
]

export const getAccountType = account => {
  const accountTypesMap = {
    Unkown: 'Other',
    None: 'Other',
    'Credit card': 'CreditCard',
    Perco: 'RetirementPlan',
    Perp: 'RetirementPlan',
    Article83: 'RetirementPlan'
  }

  const mappedType = accountTypesMap[account.type] || account.type || 'Other'
  const type = accountTypesWithTranslation.includes(mappedType)
    ? mappedType
    : 'Other'

  return type
}

export const getAccountInstitutionSlug = account =>
  get(account, 'cozyMetadata.createdByApp')

export const getAccountBalance = account => {
  if (account.type === 'CreditCard' && account.comingBalance) {
    return account.comingBalance
  }

  return account.balance
}
