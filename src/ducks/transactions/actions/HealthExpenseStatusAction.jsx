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
import { TransactionModalRow } from '../TransactionModal'

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
  isModalItem,
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
    if (isModalItem) {
      return (
        <TransactionModalRow
          iconLeft={<Icon icon={icon} color={palette.pomegranate} />}
          style={{
            color: palette.pomegranate
          }}
        >
          {text}
        </TransactionModalRow>
      )
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

  if (isModalItem) {
    const items = transaction.reimbursements.map(reimbursement => {
      if (!reimbursement.bill) {
        return
      }
      return (
        <BillComponent
          key={reimbursement.bill.vendor}
          isModalItem
          t={t}
          actionProps={{
            bill: reimbursement.bill,
            text: t(`Transactions.actions.healthExpenseBill`).replace(
              '%{vendor}',
              reimbursement.bill.vendor
            )
          }}
        />
      )
    })

    return <div>{items}</div>
  }

  const rightIcon = <Icon icon={icon} width={16} />
  const enhancedRightIcon = isDesktop ? (
    rightIcon
  ) : (
    <Badge type={type} content={transaction.reimbursements.length}>
      {rightIcon}
    </Badge>
  )

  return (
    <Menu
      className={styles.TransactionActionMenu}
      position={menuPosition}
      component={
        <ButtonAction
          label={text}
          type={type}
          rightIcon={enhancedRightIcon}
          compact={compact}
          className={styles.TransactionActionButton}
        />
      }
    >
      {transaction.reimbursements.map(reimbursement => {
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
      })}
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
