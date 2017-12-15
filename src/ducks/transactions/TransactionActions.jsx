/* global __TARGET__ */

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
import { connect } from 'react-redux'
import cx from 'classnames'

import { translate, Icon, Spinner, MenuItem } from 'cozy-ui/react'
import flash from 'ducks/flash'
import palette from 'cozy-ui/stylus/settings/palette.json'
import commentIcon from 'assets/icons/actions/icon-comment.svg'

import bellIcon from 'assets/icons/actions/icon-bell-16.svg'
import linkOutIcon from 'assets/icons/actions/icon-link-out.svg'
import linkIcon from 'assets/icons/actions/icon-link.svg'
import fileIcon from 'assets/icons/actions/icon-file.svg'
import { getInvoice, getBill } from './helpers'
import { checkApp, launchApp, DRIVE_INFO } from 'ducks/mobile/appAvailability'
import FileOpener from './FileOpener'
import { findKey } from 'lodash'
import styles from './TransactionActions.styl'

// constants
const ALERT_LINK = 'alert'
const APP_LINK = 'app'
const ATTACH_LINK = 'attach'
const BILL_LINK = 'bill'
const COMMENT_LINK = 'comment'
const HEALTH_LINK = 'refund'
const URL_LINK = 'url'

const icons = {
  [ALERT_LINK]: bellIcon,
  [APP_LINK]: linkOutIcon,
  [ATTACH_LINK]: linkIcon,
  [BILL_LINK]: fileIcon,
  [COMMENT_LINK]: commentIcon,
  [HEALTH_LINK]: linkOutIcon,
  [URL_LINK]: linkOutIcon
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
  if (isHealthCategory(transaction.categoryId) && urls['HEALTH']) {
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

export const Action = translate()(({t, transaction, showIcon, urls, onClick, type, color}) => {
  type = type || (transaction && getLinkType(transaction, urls))
  if (type === undefined) {
    return
  }

  let href, text, target
  if (type === HEALTH_LINK) {
    href = urls['HEALTH'] + '/#/remboursements'
    text = t(`Transactions.actions.${type}`)
  } else if (type === APP_LINK) {
    href = urls[appName]
    text = t(`Transactions.actions.${type}`, { appName : getAppName(urls, transaction) })
  } else if (type === URL_LINK) {
    const action = transaction.action
    text = action.trad
    target = action.target
    href = action.url
  } else {
    text = t(`Transactions.actions.${type}`)
  }

  let widget = <a
      href={href}
      target={target}
      href={href}
      onClick={onClick}
      style={{ color }}
      className={styles.TransactionAction}>
    {text}
  </a>
  if (type === BILL_LINK) {
    widget = <FileOpener getFileId={ () => getInvoice(transaction) }>
      { widget }
    </FileOpener>
  }

  return <span>
    {showIcon && <ActionIcon type={type} className='u-mr-half' color={color} />}
    {widget}
  </span>
})

/* Wraps the actions when they are displayed in Menu / ActionMenu */
const ActionMenuItem = ({disabled, onClick, type, color}) => {
  return (
    <MenuItem disabled={disabled} onClick={onClick} icon={<ActionIcon type={type} color={color} />}>
      <Action type={type} color={color} />
    </MenuItem>
  )
}

/** This is used in Menu / ActionMenu */
const TransactionActions = ({transaction, urls, withoutDefault, onSelect, onSelectDisabled}) => {
  const defaultActionName = getLinkType(transaction, urls)
  const displayDefaultAction = !withoutDefault && defaultActionName
  return (
    <div>
      { displayDefaultAction && <MenuItem
          onClick={onSelect}
          icon={<PrimaryActionIcon type={defaultActionName}/>}>
        <PrimaryTransactionAction transaction={transaction} urls={urls} onClick={onSelect} />
      </MenuItem> }
      <ActionMenuItem type={ATTACH_LINK} disabled onClick={onSelectDisabled} />
      <ActionMenuItem type={COMMENT_LINK} disabled onClick={onSelectDisabled} />
      <ActionMenuItem type={ALERT_LINK} disabled onClick={onSelectDisabled} />
    </div>
  )
}

export const PrimaryAction = props => (
  <Action {...props} color={PRIMARY_ACTION_COLOR}/>
)

export const PrimaryActionIcon = props => (
  <ActionIcon {...props} color={PRIMARY_ACTION_COLOR}/>
)

TransactionActions.propTypes = {
  transaction: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  withoutDefault: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectDisabled: PropTypes.func.isRequired
}

export default TransactionActions
