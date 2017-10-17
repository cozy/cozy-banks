/* global cozy */
/* global __TARGET__ */

import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import { Item } from 'ducks/menu'
import { translate, Icon, Spinner } from 'cozy-ui/react'
import FileOpener from 'components/FileOpener'
import styles from './TransactionActions.styl'
import flash from 'ducks/flash'
import palette from 'utils/palette.json'
import commentIcon from 'assets/icons/actions/icon-comment.svg'

import bellIcon from 'assets/icons/actions/icon-bell-16.svg'
import linkOutIcon from 'assets/icons/actions/icon-link-out.svg'
import linkIcon from 'assets/icons/actions/icon-link.svg'
import fileIcon from 'assets/icons/actions/icon-file.svg'

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

const getTransactionBill = transaction => _.get(transaction, 'bills[0]')

const isHealthCategory = (categoryId) =>
  categoryId === '400600' || categoryId === '400610' || categoryId === '400620'

export const getLinkType = (transaction, urls) => {
  const action = transaction.action
  const appName = getAppName(urls, transaction)
  if (isHealthCategory(transaction.categoryId) && urls['HEALTH']) {
    return HEALTH_LINK
  } else if (appName) {
    return APP_LINK
  } else if (getTransactionBill(transaction)) {
    return BILL_LINK
  } else if (action && action.type === URL_LINK) {
    return URL_LINK
  }
  return undefined
}

const DEFAULT_COLOR = palette['dodger-blue']

export const getIcon = (name, color = DEFAULT_COLOR) => {
  if (icons[name]) {
    return <Icon icon={icons[name]} color={color} />
  }
}

// components
export const Action = translate()(({t, actionValue, name, appName, className, color = DEFAULT_COLOR, style, ...rest}) => (
  <a className={classNames(className, styles['action'])} {...rest} style={{ color, ...style }}>
    {getIcon(name, color)}
    {actionValue || t(`Transactions.actions.${name}`, { appName })}
  </a>
))

const billSpinnerStyle = { marginLeft: '-0.25rem', marginRight: '-1rem' }
class BillAction extends Component {
  onClick = () => {
    this.setState({ loading: true })
    this.fetchFile().then(() => {
      this.setState({ loading: false })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  onCloseModal = (err) => {
    this.setState({ file: null })
    if (err) {
      flash('error', JSON.stringify(err, null, 2))
    }
  }

  fetchFile = () => {
    const { transaction } = this.props
    const billRef = getTransactionBill(transaction)
    const [doctype, id] = billRef.split(':')
    return cozy.client.data.find(doctype, id).then(doc => {
      const [doctype, id] = doc.invoice.split(':')
      if (!doctype || !id) {
        throw new Error('Invoice is malformed. invoice: ' + doc.invoice)
      }
      if (__TARGET__ === 'browser') {
        // Open in a modal
        this.setState({file: {doctype, id}})
      } else {
        // Open drive in a new window
        const baseUrl = 'http://grrecette-drive.cozy.works'
        window.open(`${baseUrl}/#/show/${id}`, '_system')
      }
    }).catch(err => {
      flash('error', `Impossible de trouver la facture associée (${doctype}:${id})`)
      console.warn(err)
    })
  }

  render (props, { loading, file }) {
    const actionStyle = {}
    if (loading) { actionStyle.background = 'none' }
    return (
      <span>
        {file && <FileOpener
          onClose={this.onCloseModal}
          onError={this.onCloseModal}
          file={file} autoopen />}
        {loading ? <Spinner style={billSpinnerStyle} /> : null}
        <Action {...props} onClick={this.onClick} style={actionStyle} />
      </span>
    )
  }
}

export const TransactionAction = ({transaction, urls, onClick, type, className}) => {
  type = type || getLinkType(transaction, urls)
  if (type === undefined) {
    return
  }

  let options = {
    name: type,
    className,
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

  return widget ? <Item>{widget}</Item> : null
}

const TransactionActions = ({transaction, urls, withoutDefault, onClose}) => {
  const type = getLinkType(transaction, urls)
  const displayDefaultAction = !withoutDefault && type
  return (
    <div>
      {displayDefaultAction &&
        <TransactionAction transaction={transaction} urls={urls} onClick={onClose} />}
      <Item disabled>
        <Action name={ATTACH_LINK} onClick={onClose} color={palette['cool-grey']} />
      </Item>
      <Item disabled>
        <Action name={COMMENT_LINK} onClick={onClose} color={palette['cool-grey']} />
      </Item>
      <Item disabled>
        <Action name={ALERT_LINK} onClick={onClose} color={palette['cool-grey']} />
      </Item>
    </div>
  )
}

export default TransactionActions
