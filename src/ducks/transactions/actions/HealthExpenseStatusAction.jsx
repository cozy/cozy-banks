import React from 'react'
import { translate, Icon, ButtonAction, Menu, MenuItem } from 'cozy-ui/react'
import hourglassIcon from 'assets/icons/icon-hourglass.svg'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { isHealthExpense } from 'ducks/categories/helpers'
import allBrands from 'ducks/brandDictionary/brands.json'
import { Component as BillComponent } from './BillAction'

const name = 'HealthExpenseStatus'

const getVendors = transaction => {
  return transaction && transaction.reimbursements
    ? transaction.reimbursements
        .map(
          reimbursement =>
            reimbursement && reimbursement.bill && reimbursement.bill.vendor
        )
        .filter(Boolean)
    : []
}

const isPending = transaction => {
  const vendors = getVendors(transaction)
  return vendors.length === 0
}

const Component = ({ t, transaction }) => {
  const pending = isPending(transaction)
  const vendors = getVendors(transaction)
  const text = pending
    ? t('Transactions.actions.healthExpensePending')
    : vendors.length > 1
      ? t('Transactions.actions.healthExpenseProcessed.plural').replace(
          '%{nbReimbursements}',
          vendors.length
        )
      : t('Transactions.actions.healthExpenseProcessed.single')

  // Normally, pending color is not error/red, but for now we handle this state like this
  const type = pending ? 'error' : 'normal'
  const icon = pending ? hourglassIcon : 'file'

  if (pending) {
    return (
      <ButtonAction label={text} type={type} rightIcon={<Icon icon={icon} />} />
    )
  }

  return (
    <Menu
      component={
        <ButtonAction
          label={text}
          type={type}
          rightIcon={<Icon icon={icon} />}
        />
      }
    >
      {transaction.reimbursements.map(reimbursement => {
        if (!reimbursement.bill) {
          return
        }
        return (
          <MenuItem key={reimbursement.bill.vendor}>
            <BillComponent
              isMenuItem
              t={t}
              actionProps={{
                bill: reimbursement.bill,
                text: t(`Transactions.actions.healthExpenseBill`).replace(
                  '%{vendor}',
                  reimbursement.bill.vendor
                )
              }}
            />
          </MenuItem>
        )
      })}
    </Menu>
  )
}

const action = {
  name,
  color: palette.charcoalGrey,
  // eslint-disable-next-line react/display-name
  getIcon: ({ transaction }) => {
    const color = isPending(transaction)
      ? palette.pomegranate
      : palette.dodgerBlue

    return <Icon icon={hourglassIcon} color={color} />
  },
  match: (transaction, { brands }) => {
    const allBrandsHealth = allBrands.filter(brand => brand.health)
    const brandsHealth = brands.filter(brand => brand.health)

    return (
      allBrandsHealth.length > brandsHealth.length &&
      isHealthExpense(transaction) &&
      getVendors(transaction)
    )
  },
  Component: translate()(Component)
}

export default action
