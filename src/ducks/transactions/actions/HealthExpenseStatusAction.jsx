import React from 'react'
import {
  translate,
  Icon,
  ButtonAction,
  Menu,
  MenuItem,
  Badge,
  withBreakpoints
} from 'cozy-ui/react'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { isHealthExpense } from 'ducks/categories/helpers'
import allBrands from 'ducks/brandDictionary/brands.json'
import { BillComponent } from './BillAction'
import styles from '../TransactionActions.styl'
import ActionLink from './ActionLink'
import { flowRight as compose } from 'lodash'

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

const Component = ({
  t,
  transaction,
  compact,
  menuPosition,
  onlyItems,
  breakpoints: { isDesktop }
}) => {
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
  const icon = pending ? 'hourglass' : 'file'

  if (pending) {
    if (onlyItems) {
      return <ActionLink text={text} icon={icon} color={palette.pomegranate} />
    }

    return (
      <ButtonAction
        label={text}
        type={type}
        rightIcon={<Icon icon={icon} />}
        compact={compact}
      />
    )
  }

  const items = transaction.reimbursements.map(reimbursement => {
    if (!reimbursement.bill) {
      return
    }
    return (
      <MenuItem
        key={reimbursement.bill.vendor}
        onSelect={() => false}
        className={styles.TransactionActionMenuItem}
      >
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
  })

  if (onlyItems) {
    return <div>{items}</div>
  }

  if (isDesktop) {
    return (
      <Menu
        className={styles.TransactionActionMenu}
        position={menuPosition}
        component={
          <ButtonAction
            label={text}
            type={type}
            rightIcon={<Icon icon={icon} />}
            compact={compact}
          />
        }
      >
        {items}
      </Menu>
    )
  }

  return (
    <Menu
      className={styles.TransactionActionMenu}
      position={menuPosition}
      component={
        <Badge content={transaction.reimbursements.length} type={type}>
          <ButtonAction
            label={text}
            type={type}
            rightIcon={<Icon icon={icon} />}
            compact={compact}
          />
        </Badge>
      }
    >
      {items}
    </Menu>
  )
}

const allHealthBrands = allBrands.filter(brand => brand.health)
const userCanInstallHealthKonnector = brands => {
  const installedHealthBrands = brands.filter(brand => brand.health)
  return allHealthBrands.length > installedHealthBrands.length
}

const action = {
  name,
  color: palette.charcoalGrey,
  // eslint-disable-next-line react/display-name
  getIcon: ({ transaction }) => {
    const color = isPending(transaction)
      ? palette.pomegranate
      : palette.dodgerBlue

    return <Icon icon="hourglass" color={color} />
  },
  match: (transaction, { brands }) => {
    return (
      userCanInstallHealthKonnector(brands) &&
      isHealthExpense(transaction) &&
      getVendors(transaction)
    )
  },
  Component: compose(withBreakpoints(), translate())(Component)
}

export default action
