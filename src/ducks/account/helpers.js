import { get, sumBy } from 'lodash'
import { getDate } from 'ducks/transactions/helpers'
import { isHealthExpense } from 'ducks/categories/helpers'
import { differenceInCalendarDays, isThisYear } from 'date-fns'
import flag from 'cozy-flags'

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
  'Business',
  'Checkings',
  'CreditCard',
  'Joint',
  'Loan',
  'LongTermSavings',
  'Other',
  'Reimbursements',
  'Savings'
]

export const getAccountType = account => {
  const accountTypesMap = {
    Article83: 'LongTermSavings',
    Asset: 'Business',
    Bank: 'Checkings',
    Capitalisation: 'Business',
    Cash: 'Checkings',
    ConsumerCredit: 'Loan',
    'Credit card': 'CreditCard',
    Deposit: 'Checkings',
    Liability: 'Business',
    LifeInsurance: 'LongTermSavings',
    Madelin: 'LongTermSavings',
    Market: 'LongTermSavings',
    Mortgage: 'LongTermSavings',
    None: 'Other',
    PEA: 'LongTermSavings',
    PEE: 'LongTermSavings',
    Perco: 'LongTermSavings',
    Perp: 'LongTermSavings',
    RevolvingCredit: 'Loan',
    RSP: 'LongTermSavings',
    Unkown: 'Other'
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

export const getAccountUpdatedAt = account => {
  if (flag('demo')) {
    return {
      translateKey: distanceInWords(0),
      params: { nbDays: 0 }
    }
  }
  const today = new Date()
  const updateDistance = getAccountUpdateDateDistance(account, today)
  const updateDistanceInWords = distanceInWords(updateDistance)

  return {
    translateKey: updateDistanceInWords,
    params: { nbDays: updateDistance }
  }
}

export const buildHealthReimbursementsVirtualAccount = transactions => {
  const healthExpenses = transactions.filter(transaction => {
    return isHealthExpense(transaction) && isThisYear(getDate(transaction))
  })

  const balance = sumBy(healthExpenses, expense => {
    const reimbursements = get(expense, 'reimbursements.target.reimbursements')
    const hasReimbursements = reimbursements && reimbursements.length > 0

    if (!hasReimbursements) {
      return -expense.amount
    }

    const reimbursedAmount = sumBy(reimbursements, r => r.amount)

    return -expense.amount - reimbursedAmount
  })

  const account = {
    _id: 'health_reimbursements',
    label: 'Data.virtualAccounts.healthReimbursements',
    balance,
    type: 'Reimbursements',
    currency: '€',
    virtual: true
  }

  return account
}

export const buildVirtualAccounts = transactions => {
  return [buildHealthReimbursementsVirtualAccount(transactions)]
}
