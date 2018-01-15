/**
 * Is used in both TransactionActionMenu and TransactionMenu
 * to show possible actions related to a transaction.
 *
 * The TransactionAction (the action the user is most susceptible
 * to need) can also be shown in desktop mode, directly in the
 * table.
 */

import React from 'react'
import PropTypes from 'prop-types'

import { translate, Icon, MenuItem } from 'cozy-ui/react'
import { getCategoryId, isHealthExpense } from 'ducks/categories/helpers'
import palette from 'cozy-ui/stylus/settings/palette.json'
import commentIcon from 'assets/icons/actions/icon-comment.svg'

import bellIcon from 'assets/icons/actions/icon-bell-16.svg'
import linkOutIcon from 'assets/icons/actions/icon-link-out.svg'
import linkIcon from 'assets/icons/actions/icon-link.svg'
import fileIcon from 'assets/icons/actions/icon-file.svg'
import hourglassIcon from 'assets/icons/icon-hourglass.svg'
import { getInvoice, getBill, getBillInvoice } from './helpers'
import FileOpener from './FileOpener'
import { findKey } from 'lodash'
import styles from './TransactionActions.styl'
import { HealthExpenseStatus, getVendors } from 'ducks/health-expense'

// constants
const ALERT_LINK = 'alert'
const APP_LINK = 'app'
const ATTACH_LINK = 'attach'
const BILL_LINK = 'bill'
const COMMENT_LINK = 'comment'
const HEALTH_LINK = 'refund'
const HEALTH_EXPENSE_STATUS = 'healthExpenseStatus'
const HEALTH_EXPENSE_BILL_LINK = 'healthExpenseBill'
const URL_LINK = 'url'

const icons = {
  [ALERT_LINK]: bellIcon,
  [APP_LINK]: linkOutIcon,
  [ATTACH_LINK]: linkIcon,
  [BILL_LINK]: fileIcon,
  [COMMENT_LINK]: commentIcon,
  [HEALTH_LINK]: linkOutIcon,
  [URL_LINK]: linkOutIcon,
  [HEALTH_EXPENSE_STATUS]: hourglassIcon,
  [HEALTH_EXPENSE_BILL_LINK]: fileIcon
}

const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

// helpers
const getAppName = (urls, transaction) => {
  const label = transaction.label.toLowerCase()
  return findKey(urls, (url, appName) => url && label.indexOf(appName) !== -1)
}

const isHealthCategory = (categoryId) =>
  categoryId === '400600' || categoryId === '400610' || categoryId === '400620'

export const getLinkType = (transaction, urls) => {
  const action = transaction.action
  const appName = getAppName(urls, transaction)
  if (isHealthExpense(transaction)) {
    return HEALTH_EXPENSE_STATUS
  } else if (isHealthCategory(getCategoryId(transaction)) && urls['HEALTH']) {
    return HEALTH_LINK
  } else if (appName) {
    return APP_LINK
  } else if (getBill(transaction)) {
    return BILL_LINK
  } else if (action && action.type === URL_LINK) {
    return URL_LINK
  }
  return undefined
}

export const ActionIcon = ({type, color, ...rest}) => {
  const icon = icons[type]
  return icon ? <Icon icon={icon} color={color} {...rest} /> : null
}

// TODO : Action is doing way too much diffent things. We must split it
export const Action = translate()(({t, transaction, showIcon, urls, onClick, type, color, bill}) => {
  type = type || (transaction && getLinkType(transaction, urls))
  if (type === undefined) {
    return
  }

  let href, text, target
  if (type === HEALTH_LINK) {
    href = urls['HEALTH'] + '/#/remboursements'
    text = t(`Transactions.actions.${type}`)
  } else if (type === APP_LINK) {
    const appName = getAppName(urls, transaction)
    href = urls[appName]
    text = t(`Transactions.actions.${type}`, {appName})
  } else if (type === URL_LINK) {
    const action = transaction.action
    text = action.trad
    target = action.target
    href = action.url
  } else if (type === HEALTH_EXPENSE_BILL_LINK) {
    text = t(`Transactions.actions.${type}`).replace('%{vendor}', bill.vendor)
  } else {
    text = t(`Transactions.actions.${type}`)
  }

  let widget = (
    <a
      href={href}
      target={target}
      onClick={onClick}
      style={{ color }}
      className={styles.TransactionAction}>
      {text}
    </a>
  )

  if (type === BILL_LINK) {
    widget = (
      <FileOpener getFileId={() => getInvoice(transaction)}>
        { widget }
      </FileOpener>
    )
  }

  if (type === HEALTH_EXPENSE_BILL_LINK) {
    widget = (
      <FileOpener getFileId={() => getBillInvoice(bill)}>
        {widget}
      </FileOpener>
    )
  }

  let iconColor = color

  if (type === HEALTH_EXPENSE_STATUS) {
    const vendors = getVendors(transaction)

    widget = (
      <HealthExpenseStatus
        className={styles.TransactionAction}
        color={color}
        vendors={vendors}
      />
    )

    if (vendors.length === 0) {
      iconColor = palette.pomegranate
    }
  }

  return (
    <span>
      {showIcon && <ActionIcon type={type} className='u-mr-half' color={iconColor} />}
      {widget}
    </span>
  )
})

/* Wraps the actions when they are displayed in Menu / ActionMenu */
const ActionMenuItem = ({disabled, onClick, type, color, bill}) => {
  return (
    <MenuItem disabled={disabled} onClick={onClick} icon={<ActionIcon type={type} color={color} />}>
      <Action type={type} color={color} bill={bill} />
    </MenuItem>
  )
}

/** This is used in Menu / ActionMenu */
const TransactionActions = ({transaction, urls, withoutDefault, onSelect, onSelectDisabled}) => {
  const defaultActionName = getLinkType(transaction, urls)
  const displayDefaultAction = !withoutDefault && defaultActionName
  return (
    <div>
      {displayDefaultAction && <MenuItem
        onClick={onSelect}
        icon={
          isHealthExpense(transaction)
            ? <HealthExpenseStatusIcon type={defaultActionName} transaction={transaction} />
            : <PrimaryActionIcon type={defaultActionName} />
        }>
        <PrimaryAction transaction={transaction} urls={urls} onClick={onSelect} />
      </MenuItem>}
      {isHealthExpense(transaction) &&
        transaction.reimbursements &&
        transaction.reimbursements.map(
          reimbursement => reimbursement.bill && <ActionMenuItem type={HEALTH_EXPENSE_BILL_LINK} bill={reimbursement.bill} color='inherit' />
        ).filter(Boolean)
      }
      <ActionMenuItem type={ATTACH_LINK} disabled onClick={onSelectDisabled} />
      <ActionMenuItem type={COMMENT_LINK} disabled onClick={onSelectDisabled} />
      <ActionMenuItem type={ALERT_LINK} disabled onClick={onSelectDisabled} />
    </div>
  )
}

export const PrimaryAction = props => (
  <Action {...props} color={PRIMARY_ACTION_COLOR} />
)

export const PrimaryActionIcon = props => (
  <ActionIcon {...props} color={PRIMARY_ACTION_COLOR} />
)

export const HealthExpenseStatusIcon = ({transaction, ...rest}) => {
  const vendors = getVendors(transaction)

  const color = vendors.length > 0 ? PRIMARY_ACTION_COLOR : palette.pomegranate

  return <ActionIcon {...rest} color={color} />
}

TransactionActions.propTypes = {
  transaction: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  withoutDefault: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectDisabled: PropTypes.func.isRequired
}

export default TransactionActions
