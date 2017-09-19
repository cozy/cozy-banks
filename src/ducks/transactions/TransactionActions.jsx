/* global cozy */
import React, { Component } from 'react'
import { Item } from 'ducks/menu'
import { translate } from 'cozy-ui/react/I18n'
import FileOpener from 'components/FileOpener'
import Spinner from 'cozy-ui/react/Spinner'
import styles from './TransactionActions.styl'
import _ from 'lodash'
import flash from 'ducks/flash'

// constants
const HEALTH_LINK = 'refund'
const APP_LINK = 'app'
const BILL_LINK = 'bill'
const URL_LINK = 'url'

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

const getLinkType = (transaction, urls) => {
  const action = transaction.action
  const appName = getAppName(urls, transaction)
  if (transaction.category === 'health_costs' && urls['HEALTH']) {
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

// components
export const Action = translate()(({t, actionValue, name, appName, className, ...rest}) => (
  <a className={className || styles[`action-${name}`]} {...rest}>
    {actionValue || t(`Movements.actions.${name}`, { appName: appName })}
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

  onCloseModal = () => {
    this.setState({ file: null })
  }

  fetchFile = () => {
    const { transaction } = this.props
    const billRef = getTransactionBill(transaction)
    const [doctype, id] = billRef.split(':')
    return cozy.client.data.find(doctype, id).then(doc => {
      const [doctype, id] = doc.invoice.split(':')
      this.setState({file: {doctype, id}})
    }).catch(() => {
      flash('error', `Impossible de trouver la facture associée (${doctype}:${id}])`)
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
      <Item>
        <Action name='attach' onClick={onClose} />
      </Item>
      <Item>
        <Action name='comment' onClick={onClose} />
      </Item>
      <Item>
        <Action name='alert' onClick={onClose} />
      </Item>
    </div>
  )
}

export default TransactionActions
