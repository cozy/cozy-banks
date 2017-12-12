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

import { translate, Icon, Spinner } from 'cozy-ui/react'
import { MenuItem } from 'cozy-ui/react/Menu'
import FileOpener from 'components/FileOpener'
import flash from 'ducks/flash'
import palette from 'cozy-ui/stylus/settings/palette.json'
import commentIcon from 'assets/icons/actions/icon-comment.svg'

import bellIcon from 'assets/icons/actions/icon-bell-16.svg'
import linkOutIcon from 'assets/icons/actions/icon-link-out.svg'
import linkIcon from 'assets/icons/actions/icon-link.svg'
import fileIcon from 'assets/icons/actions/icon-file.svg'
import { getURL } from 'reducers'
import { getInvoice, getBill } from './helpers'


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

const DEFAULT_COLOR = palette['dodgerBlue']

// helpers
const getAppName = (urls, transaction) => {
  let appName
  Object.keys(urls).map(key => {
    if (urls[key] !== undefined && transaction.label.indexOf(key) !== -1) {
      appName = key
    }
  })
  return appName
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

export const ActionIcon = ({action, color = DEFAULT_COLOR, ...rest}) => {
  if (icons[action]) {
    return <Icon icon={icons[action]} color={color} {...rest} />
  } else {
    return null
  }
}

// components
export const Action = translate()(({t, actionValue, showIcon, name, appName, href, color = DEFAULT_COLOR, style, ...rest}) => (
  <a className='u-p-0' href={href} target='_blank' style={{ color, ...style }}>
    { showIcon ? <ActionIcon name={name} color={color} /> : null }
    {actionValue || t(`Transactions.actions.${name}`, { appName })}
  </a>
))

const billSpinnerStyle = { marginLeft: '-0.25rem', marginRight: '-1rem' }

const buildAppURL = function (cozyURL, app, hash) {
  const splitted = cozyURL.split('/')
  const protocol = splitted[0]
  const hostSplitted = splitted[2].split('.')
  const slug = hostSplitted[0]
  const domain = hostSplitted.slice(1).join('.')
  return `${protocol}//${slug}-${app}.${domain}/#${hash}`
}

export const BillAction = connect(state => ({
  cozyURL: getURL(state)
}))(class extends Component {
  onClick = () => {
    return this.fetchFile()
  }

  onCloseModal = (err) => {
    this.setState({ file: null })
    if (err) {
      flash('error', JSON.stringify(err, null, 2))
    }
  }

  fetchFile = async () => {
    const { transaction } = this.props
    try {
      this.setState({ loading: true })
      const [doctype, id] = await getInvoice(transaction)
      if (__TARGET__ === 'browser') {
        // Open in a modal
        this.setState({file: {doctype, id}})
      } else {
        // Open drive in a new window
        const driveURL = buildAppURL(this.props.cozyURL, 'drive', `/file/${id}`)
        window.open(driveURL, '_system')
      }
    } catch (err) {
      flash('error', `Impossible de trouver la facture associée`)
      console.warn(err, transaction)
    } finally {
      this.setState({ loading: false })
    }
  }

  render (props, { loading, file }) {
    const actionStyle = {}
    if (loading) { actionStyle.background = 'none' }
    return (
      <span onClick={this.onClick}>
        {file && <FileOpener
          onClose={this.onCloseModal}
          onError={this.onCloseModal}
          file={file} autoopen />}
        {loading ? <Spinner style={billSpinnerStyle} /> : null}
        <Action {...props} style={actionStyle} />
      </span>
    )
  }
})

export const TransactionAction = ({transaction, showIcon, urls, onClick, type}) => {
  type = type || getLinkType(transaction, urls)
  if (type === undefined) {
    return
  }

  let options = {
    name: type,
    actionName: type
  }

  let widget

  if (type === HEALTH_LINK) {
    options.href = urls['HEALTH'] + '/#/remboursements'
  } else if (type === APP_LINK) {
    const appName = getAppName(urls, transaction)
    options.href = urls[appName]
    options.appName = appName
  } else if (type === URL_LINK) {
    const action = transaction.action
    options.actionValue = action.trad
    options.target = action.target
    options.href = action.url
    options.onClick = onClick
  }

  if (type === BILL_LINK) {
    widget = <BillAction transaction={transaction} {...options} />
  } else {
    widget = <Action {...options} />
  }

  return widget ? <span>
    {showIcon && <ActionIcon action={type} className='u-mr-half' />}
    {widget}
  </span> : null
}

const ActionMenuItem = ({disabled, onClick, action, color}) => {
  return <MenuItem disabled={disabled} onClick={onClick} icon={<ActionIcon action={action} color={color} />}>
    <Action name={action} color={color} />
  </MenuItem>
}

/** This is used in Menu / ActionMenu */
const TransactionActions = ({transaction, urls, withoutDefault, onSelect, onSelectDisabled}) => {
  const defaultActionName = getLinkType(transaction, urls)
  const displayDefaultAction = !withoutDefault && defaultActionName
  const defaultAction = <TransactionAction transaction={transaction} urls={urls} onClick={onSelect} />
  return (
    <div>
      { displayDefaultAction && <MenuItem onClick={onSelect} icon={<ActionIcon action={defaultActionName} />}>
        { defaultAction }
      </MenuItem> }
      <ActionMenuItem action={ATTACH_LINK} disabled onClick={onSelectDisabled} color='black' />
      <ActionMenuItem action={COMMENT_LINK} disabled onClick={onSelectDisabled} color='black' />
      <ActionMenuItem action={ALERT_LINK} disabled onClick={onSelectDisabled} color='black' />
    </div>
  )
}

TransactionActions.propTypes = {
  transaction: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  withoutDefault: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectDisabled: PropTypes.func.isRequired
}

export default TransactionActions
