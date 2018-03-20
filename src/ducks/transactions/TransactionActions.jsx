/**
 * Is used in both TransactionActionMenu and TransactionMenu
 * to show possible actions related to a transaction.
 *
 * The TransactionAction (the action the user is most susceptible
 * to need) can also be shown in desktop mode, directly in the
 * table.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { translate, Icon, MenuItem } from 'cozy-ui/react'
import { isHealthExpense } from 'ducks/categories/helpers'
import palette from 'cozy-ui/stylus/settings/palette.json'
import commentIcon from 'assets/icons/actions/icon-comment.svg'

import bellIcon from 'assets/icons/actions/icon-bell-16.svg'
import linkIcon from 'assets/icons/actions/icon-link.svg'
import fileIcon from 'assets/icons/actions/icon-file.svg'
import { getInvoice, getBill, getBillInvoice } from './helpers'
import FileOpener from './FileOpener'
import styles from './TransactionActions.styl'
import { getVendors } from 'ducks/health-expense'
import { findMatchingAction, addIcons } from './actions'

// constants
const ALERT_LINK = 'alert'
const ATTACH_LINK = 'attach'
const BILL_LINK = 'bill'
const COMMENT_LINK = 'comment'
const HEALTH_EXPENSE_BILL_LINK = 'healthExpenseBill'

const icons = {
  [ALERT_LINK]: bellIcon,
  [ATTACH_LINK]: linkIcon,
  [BILL_LINK]: fileIcon,
  [COMMENT_LINK]: commentIcon,
  [HEALTH_EXPENSE_BILL_LINK]: fileIcon
}
addIcons(icons)

// TODO delete or rename this variable (see https://gitlab.cozycloud.cc/labs/cozy-bank/merge_requests/237)
const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

export const getLinkType = (transaction, urls, brands) => {
  const actionProps = { urls, brands }
  const action = findMatchingAction(transaction, actionProps)
  if (action) {
    return action.name
  }
  if (getBill(transaction)) {
    return BILL_LINK
  }
  return undefined
}

export const ActionIcon = ({type, color, ...rest}) => {
  const icon = icons[type]
  return icon ? <Icon icon={icon} color={color} {...rest} /> : null
}

// TODO : Action is doing way too much diffent things. We must split it
class _Action extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.setInvoiceFileId()
  }

  getType = () => {
    const { type, transaction, urls, brands } = this.props
    return type || (transaction && getLinkType(transaction, urls, brands))
  }

  setInvoiceFileId = async () => {
    const type = this.getType()
    const { bill, transaction } = this.props
    if (!type) return
    let invoiceFileId
    try {
      if (type === BILL_LINK) {
        invoiceFileId = await getInvoice(transaction)
      } else if (type === HEALTH_EXPENSE_BILL_LINK && bill) {
        invoiceFileId = await getBillInvoice(bill)
      }
    } catch (e) {
      // TODO: Add sentry to watch if it's always on production
      console.log('no invoice', bill)
    }
    if (invoiceFileId) {
      this.setState({invoiceFileId})
    }
  }

  getInfo = () => {
    const type = this.getType()
    const { t, bill } = this.props

    if (type === HEALTH_EXPENSE_BILL_LINK && bill) {
      return {
        text: t(`Transactions.actions.${type}`).replace('%{vendor}', bill.vendor)
      }
    } else {
      return {
        text: t(`Transactions.actions.${type}`)
      }
    }
  }

  getGenericWidget = () => {
    const { onClick, color } = this.props
    const { href, text, target } = this.getInfo()

    return (
      <a
        href={href}
        target={target}
        onClick={onClick}
        style={{ color }}
        className={styles.TransactionAction}>
        {text}
      </a>
    )
  }

  getWidget = () => {
    const type = this.getType()
    const { invoiceFileId } = this.state
    const genericWidget = this.getGenericWidget()

    const isFileOpener = type === BILL_LINK || type === HEALTH_EXPENSE_BILL_LINK
    if (isFileOpener) {
      if (invoiceFileId) {
        return (
          <FileOpener getFileId={() => invoiceFileId}>
            { genericWidget }
          </FileOpener>
        )
      } else {
        return
      }
    }

    return genericWidget
  }

  getIconColor = () => {
    return this.props.color
  }

  render () {
    const type = this.getType()
    if (type === undefined) return

    const { transaction, urls, brands, showIcon, color } = this.props
    if (transaction) {
      const actionProps = { urls, brands }
      const action = findMatchingAction(transaction, actionProps)

      if (action) {
        const { Component } = action
        return (
          <span>
            {showIcon && <ActionIcon type={action.name} className='u-mr-half' color={color} />}
            <Component transaction={transaction} actionProps={actionProps} />
          </span>
        )
      }
    }

    const widget = this.getWidget()
    if (widget === undefined) return // invoice is not found
    const iconColor = this.getIconColor()

    return (
      <span>
        {showIcon && <ActionIcon type={type} className='u-mr-half' color={iconColor} />}
        {widget}
      </span>
    )
  }
}

export const Action = translate()(_Action)

/* Wraps the actions when they are displayed in Menu / ActionMenu */
const ActionMenuItem = ({disabled, onClick, type, color, bill}) => {
  return (
    <MenuItem disabled={disabled} onClick={onClick} icon={<ActionIcon type={type} color={color} />}>
      <Action type={type} color={color} bill={bill} />
    </MenuItem>
  )
}

/** This is used in Menu / ActionMenu */
const TransactionActions = ({transaction, urls, brands, withoutDefault, onSelect, onSelectDisabled}) => {
  const defaultActionName = getLinkType(transaction, urls, brands)
  const displayDefaultAction = !withoutDefault && defaultActionName
  const isHealthExpenseTransaction = isHealthExpense(transaction)

  const actionProps = { urls, brands }
  const action = findMatchingAction(transaction, actionProps)

  return (
    <div>
      {displayDefaultAction && !isHealthExpenseTransaction && !action && <MenuItem
        onClick={onSelect}
        icon={<PrimaryActionIcon type={defaultActionName} />}
      >
        <PrimaryAction transaction={transaction} urls={urls} brands={brands} onClick={onSelect} />
      </MenuItem>}
      {action && <MenuItem
        icon={<PrimaryActionIcon type={defaultActionName} />}
      >
        <PrimaryAction transaction={transaction} urls={urls} brands={brands} />
      </MenuItem>}
      {isHealthExpenseTransaction &&
        transaction.reimbursements &&
        transaction.reimbursements.map(
          reimbursement => reimbursement.bill && <ActionMenuItem type={HEALTH_EXPENSE_BILL_LINK} bill={reimbursement.bill} color={PRIMARY_ACTION_COLOR} />
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
  brands: PropTypes.array.isRequired,
  withoutDefault: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectDisabled: PropTypes.func.isRequired
}

export default TransactionActions
