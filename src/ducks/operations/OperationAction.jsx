import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import FileOpener from 'components/FileOpener'
import styles from './OperationAction.styl'

const HEALTH_LINK = 'HEALTH_LINK'
const APP_LINK = 'APP_LINK'
export const FILE_LINK = 'FILE_LINK'
const URL_LINK = 'URL_LINK'

const Link = ({ children, href, newContext }) => (
  <a className={styles['bnk-table-actions-link']} href={href} target={newContext ? '_blank' : '_self'}>
    {children}
  </a>
)

const getAppName = (urls, operation) => {
  let appName
  Object.keys(urls).map(key => {
    if (urls[key] !== undefined && operation.label.indexOf(key) !== -1) {
      appName = key
    }
  })
  return appName
}

export const getLinkType = (operation, urls) => {
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

export const OperationFileAction = ({ children, t, operation }) => {
  if (operation.action && operation.action.payload) {
    return (
      <FileOpener t={t} file={operation.action.payload}>
        {children}
      </FileOpener>
    )
  }
  return {children}
}

const OperationAction = ({ t, operation, urls }) => {
  const type = getLinkType(operation, urls)
  switch (type) {
    case HEALTH_LINK:
      return (
        <Link href={urls['HEALTH'] + '/#/remboursements'}>
          {t(`Movements.actions.refund`)}
        </Link>
      )
    case APP_LINK:
      const appName = getAppName(urls, operation)
      return (
        <Link href={urls[appName]}>
          {t(`Movements.actions.app`, {appName: appName})}
        </Link>
      )
    case FILE_LINK:
      return (
        <OperationFileAction t={t} operation={operation}>
          <Link>
            {t(`Movements.actions.${operation.action.type}`)}
          </Link>
        </OperationFileAction>
      )
    case URL_LINK:
      return (
        <Link href={operation.action.url} newContext>
          {t(`Movements.actions.${operation.action.type}`)}
        </Link>
      )
    default:
      return undefined
  }
}

export default translate()(OperationAction)
