/* global cozy */
import React from 'react'
import { Item } from 'ducks/menu'
import { translate } from 'cozy-ui/react/I18n'
import FileOpener from 'components/FileOpener'
import Spinner from 'components/Spinner'
import styles from './OperationActions.styl'
import _ from 'lodash'

// constants
const HEALTH_LINK = 'refund'
const APP_LINK = 'app'
const BILL_LINK = 'bill'
const URL_LINK = 'url'

// helpers
const getAppName = (urls, operation) => {
  let appName
  Object.keys(urls).map(key => {
    if (urls[key] !== undefined && operation.label.indexOf(key) !== -1) {
      appName = key
    }
  })
  return appName
}

const getOperationBill = operation => _.get(operation, 'bills[0]')

const getLinkType = (operation, urls) => {
  const action = operation.action
  const appName = getAppName(urls, operation)
  if (operation.category === 'health_costs' && urls['HEALTH']) {
    return HEALTH_LINK
  } else if (appName) {
    return APP_LINK
  } else if (getOperationBill(operation)) {
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
class BillAction extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
  }

  onClick () {
    this.setState({ loading: true })
    this.fetchFile().then(() => {
      this.setState({ loading: false })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  onCloseModal () {
    this.setState({ file: null })
  }

  fetchFile () {
    const { operation } = this.props
    const billRef = getOperationBill(operation)
    const [doctype, id] = billRef.split(':')
    return cozy.client.data.find(doctype, id).then(doc => {
      const [doctype, id] = doc.invoice.split(':')
      this.setState({file: {doctype, id}})
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

export const OperationAction = ({operation, urls, onClick, type, className}) => {
  type = type || getLinkType(operation, urls)
  const appName = getAppName(urls, operation)

  let options = {
    name: type,
    className,
    actionName: type
  }

  let widget

  if (type === HEALTH_LINK) {
    options.href = urls['HEALTH'] + '/#/remboursements'
  } else if (type === APP_LINK) {
    options.href = urls[appName]
    options.appName = appName
  } else if (type === URL_LINK) {
    const action = operation.action
    options.actionValue = action.trad
    options.target = action.target
    options.onClick = onClick
  }

  if (type === BILL_LINK) {
    widget = <BillAction operation={operation} {...options} />
  } else {
    widget = <Action {...{options}} />
  }

  return widget ? <Item>{widget}</Item> : null
}

const OperationActions = ({operation, urls, withoutDefault, onClose}) => {
  const type = getLinkType(operation, urls)
  const displayDefaultAction = !withoutDefault && type
  return (
    <div>
      {displayDefaultAction &&
        <OperationAction operation={operation} urls={urls} onClick={onClose} />}
      <Action name='attach' onClick={onClose} />
      <Action name='comment' onClick={onClose} />
      <Action name='alert' onClick={onClose} />
    </div>
  )
}

export default OperationActions
