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
import cx from 'classnames'

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

// TODO delete or rename this variable (see https://gitlab.cozycloud.cc/labs/cozy-bank/merge_requests/237)
const PRIMARY_ACTION_COLOR = palette['dodgerBlue']

// helpers
const getAppName = (urls, transaction) => {
  const label = transaction.label.toLowerCase()
  return findKey(urls, (url, appName) => url && label.indexOf(appName.toLowerCase()) !== -1)
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
class _Action extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.setType()
    this.setInvoiceFileId()
  }

  setType = newType => {
    const { type, transaction, urls } = this.props
    this.setState({type: newType || type || (transaction && getLinkType(transaction, urls))})
  }

  setInvoiceFileId = async () => {
    const { type } = this.state
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
    const { type } = this.state
    const { t, urls, transaction, bill } = this.props

    if (type === HEALTH_LINK) {
      return {
        href: urls['HEALTH'] + '/#/remboursements',
        text: t(`Transactions.actions.${type}`)
      }
    } else if (type === APP_LINK) {
      const appName = getAppName(urls, transaction)
      return {
        href: urls[appName],
        text: t(`Transactions.actions.${type}`, {appName})
      }
    } else if (type === URL_LINK) {
      const action = transaction.action
      return {
        text: action.trad,
        target: action.target,
        href: action.url
      }
    } else if (type === HEALTH_EXPENSE_BILL_LINK && bill) {
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
    const { type, invoiceFileId } = this.state

    if (type === HEALTH_EXPENSE_STATUS) {
      return <HealthExpenseStatus vendors={getVendors(this.props.transaction)} />
    }

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
    const { type } = this.state
    const isHealthExpense = type === HEALTH_EXPENSE_STATUS

    if (isHealthExpense && this.props.transaction) {
      const vendors = getVendors(this.props.transaction)
      const hasVendor = vendors && vendors.length > 0

      if (!hasVendor) {
        return palette.pomegranate
      }
    }

    return this.props.color
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.type !== this.state.type) {
      this.setType(nextProps.type)
    }
  }

  render () {
    const { type } = this.state
    const { showIcon } = this.props

    if (type === undefined) return

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
const TransactionActions = ({transaction, urls, withoutDefault, onSelect, onSelectDisabled}) => {
  const defaultActionName = getLinkType(transaction, urls)
  const displayDefaultAction = !withoutDefault && defaultActionName
  const isHealthExpenseTransaction = isHealthExpense(transaction)

  return (
    <div>
      {displayDefaultAction && <MenuItem
        onClick={isHealthExpenseTransaction ? undefined : onSelect}
        icon={
          isHealthExpenseTransaction
            ? <HealthExpenseStatusIcon type={defaultActionName} transaction={transaction} />
            : <PrimaryActionIcon type={defaultActionName} />
        }
        className={cx({
          [styles['TransactionAction-disabled']]: isHealthExpenseTransaction
        })}
      >
        <PrimaryAction transaction={transaction} urls={urls} onClick={onSelect} />
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
  withoutDefault: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectDisabled: PropTypes.func.isRequired
}

export default TransactionActions
