import styles from 'styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Figure from 'components/Figure'
import FileOpener from 'components/FileOpener'

const OperationAction = function ({ t, action }) {
  const link = <a className={styles['bnk-table-actions-link']}>
    {action.type === 'app' && t(`Movements.actions.${action.type}`, {appName: action.name})}
    {action.type !== 'app' && t(`Movements.actions.${action.type}`)}
  </a>
  if (action.payload) {
    return (<FileOpener t={t} file={action.payload}>
      {link}
    </FileOpener>)
  } else if (action.type === 'app') {
    return (<span>{React.cloneElement(link, { href: action.url })}</span>)
  } else if (action.url) {
    return (<span>{React.cloneElement(link, { target: '_blank', href: action.url })}</span>)
  }
}

const isOperationWithApp = (urls, operation, name) => {
  if (urls[name] === undefined || operation.label === undefined) return false
  return operation.label.indexOf(name) !== -1
}

export const Operation = ({ t, f, operation, urls }) => (
  <tr className={styles['coz-table-row']}>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-date'])}>
      {f(operation.date, 'DD MMMM YYYY')}
    </td>
    <td className={classNames(
        styles['coz-table-cell'],
        styles['bnk-table-desc'],
        styles[`bnk-table-desc--${operation.category}`])}
    >
      {operation.label}
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
      <Figure
        total={operation.amount}
        currency={operation.currency}
        signed
        coloredPositive
      />
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
      {!operation.action && operation.label.indexOf('EDF') === -1 && '－'}
      {operation.action && <OperationAction t={t} action={operation.action} />}
      {Object.keys(urls).map(key => {
        return isOperationWithApp(urls, operation, key) && <OperationAction t={t} action={{type: 'app', name: key, url: urls[key]}} />
      })}
    </td>
  </tr>
)

export default translate()(Operation)
