import React from 'react'
import { Item } from 'ducks/menu'
import { translate } from 'cozy-ui/react/I18n'
import FileOpener from 'components/FileOpener'

import styles from './OperationActions.styl'

// constants

const HEALTH_LINK = 'refund'
const APP_LINK = 'app'
const FILE_LINK = 'bill'
const URL_LINK = 'link'

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

const getLinkType = (operation, urls) => {
  const action = operation.action
  const appName = getAppName(urls, operation)
  if (operation.category === 'health_costs' && urls['HEALTH']) {
    return HEALTH_LINK
  } else if (appName) {
    return APP_LINK
  } else if (action && action.payload) {
    return FILE_LINK
  } else if (action && action.url) {
    return URL_LINK
  }
  return undefined
}

// components

export const Action = translate()(({t, actionName, appName, onClick, href, target, className}) => (
  <Item>
    <a className={className || styles[`action-${actionName}`]} onClick={onClick} href={href} target={target}>
      {t(`Movements.actions.${actionName}`, { appName: appName })}
    </a>
  </Item>
))

const ActionWithFile = translate()(({t, actionName, operation, onClick, className}) => (
  <Item>
    <OperationFileAction t={t} operation={operation}>
      <a className={className || styles[`action-${actionName}`]} onClick={onClick}>
        {t(`Movements.actions.${actionName}`)}
      </a>
    </OperationFileAction>
  </Item>
))

const OperationFileAction = ({ children, t, operation }) => {
  if (operation.action && operation.action.payload) {
    return (
      <FileOpener t={t} file={operation.action.payload}>
        {children}
      </FileOpener>
    )
  }
  return {children}
}

export const OperationAction = ({operation, urls, onClick, type, className}) => {
  type = type || getLinkType(operation, urls)
  const appName = getAppName(urls, operation)

  switch (type) {
    case HEALTH_LINK:
      return <Action actionName={type} href={urls['HEALTH'] + '/#/remboursements'} className={className} />
    case APP_LINK:
      return <Action actionName={type} appName={appName} href={urls[appName]} className={className} />
    case URL_LINK:
      return <Action actionName={type} href={operation.action.url} target='_blank' onClick={onClick} className={className} />
    case FILE_LINK:
      return <ActionWithFile actionName={type} operation={operation} onClick={onClick} className={className} />
    default:
      return undefined
  }
}

const OperationActions = ({operation, urls, withoutDefault, onClose}) => {
  const type = getLinkType(operation, urls)
  const displayDefaultAction = !withoutDefault && type
  return (
    <div>
      {displayDefaultAction &&
        <OperationAction operation={operation} urls={urls} onClick={onClose} />}
      {type !== FILE_LINK && operation.action && operation.action.payload &&
        <OperationAction operation={operation} urls={urls} onClick={onClose} type='bill' />}
      <Action actionName='attach' onClick={onClose} />
      <Action actionName='comment' onClick={onClose} />
      <Action actionName='alert' onClick={onClose} />
    </div>
  )
}

export default OperationActions
