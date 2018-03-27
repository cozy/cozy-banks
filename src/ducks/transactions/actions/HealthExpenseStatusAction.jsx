import React from 'react'
import { translate, Icon } from 'cozy-ui/react'
import icon from 'assets/icons/icon-hourglass.svg'
import ActionLink from './ActionLink'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { isHealthExpense } from 'ducks/categories/helpers'

const name = 'HealthExpenseStatus'

const getVendors = transaction => {
  return transaction && transaction.reimbursements
    ? transaction.reimbursements.map(reimbursement => reimbursement && reimbursement.bill && reimbursement.bill.vendor).filter(Boolean)
    : []
}

const formatVendor = vendor => {
  const vendorsMap = {
    Ameli: 'la CPAM'
  }

  return vendorsMap[vendor] || vendor
}

const isPending = transaction => {
  const vendors = getVendors(transaction)
  return vendors.length === 0
}

const Component = ({ t, transaction, color }) => {
  const vendors = getVendors(transaction)
  const formattedVendors = vendors.map(formatVendor)
  const text = isPending(transaction)
    ? t('Transactions.actions.healthExpensePending')
    : t('Transactions.actions.healthExpenseStatus').replace('%{vendors}', formattedVendors.join(` ${t('Transactions.actions.vendorsGlue')} `))
  return (
    <ActionLink
      text={text}
      color={color}
    />
  )
}

const action = {
  name,
  color: palette.charcoalGrey,
  getIcon: ({ transaction }) => {
    const color = isPending(transaction)
      ? palette.pomegranate
      : palette.dodgerBlue

    return <Icon icon={icon} color={color} />
  },
  match: (transaction) => isHealthExpense(transaction) && getVendors(transaction),
  Component: translate()(Component)
}

export default action
