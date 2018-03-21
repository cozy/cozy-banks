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
import fileIcon from 'assets/icons/actions/icon-file.svg'
import { getVendors } from 'ducks/health-expense'
import { findMatchingAction, addIcons, getActionFromName } from './actions'

// constants
const HEALTH_EXPENSE_BILL_LINK = 'healthExpenseBill'

const icons = {
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
}

export const ActionIcon = ({type, color, ...rest}) => {
  const icon = icons[type]
  return icon ? <Icon icon={icon} color={color} {...rest} /> : null
}

// TODO : Action is doing way too much diffent things. We must split it
class _Action extends Component {
  state = {
    action: false
  }

  async componentDidMount () {
    const { transaction, urls, brands, bill } = this.props
    if (transaction) {
      const actionProps = { urls, brands, bill }
      const action = await findMatchingAction(transaction, actionProps)
      this.setState({action})
    }
  }

  render () {
    const { type, transaction, showIcon, color, urls, brands, bill } = this.props
    let action
    if (transaction) {
      action = this.state.action
    } else if (type) {
      action = getActionFromName(type)
    }
    if (action) {
      const { Component } = action
      const actionProps = { urls, brands, bill, color }
      return (
        <span>
          {showIcon && <ActionIcon type={action.name} className='u-mr-half' color={color} />}
          <Component transaction={transaction} actionProps={actionProps} />
        </span>
      )
    }
  }
}

export const Action = translate()(_Action)

/* Wraps the actions when they are displayed in Menu / ActionMenu */
const ActionMenuItem = ({disabled, onClick, type, color, bill}) => {
  if (disabled && !color) {
    color = palette.charcoalGrey
  }
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
      {displayDefaultAction && action && <MenuItem
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
      <ActionMenuItem type='attach' disabled onClick={onSelectDisabled} />
      <ActionMenuItem type='comment' disabled onClick={onSelectDisabled} />
      <ActionMenuItem type='alert' disabled onClick={onSelectDisabled} />
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
