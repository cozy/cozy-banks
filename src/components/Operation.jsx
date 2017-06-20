import styles from 'styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Figure from 'components/Figure'
import FileOpener from 'components/FileOpener'

const OperationAction = function ({ t, action }) {
  const link = <a className={styles['bnk-table-actions-link']}>
    {t(`Movements.actions.${action.type}`)}
  </a>
  if (action.payload) {
    return <FileOpener t={t} file={action.payload}>
      { link }
    </FileOpener>
  } else if (action.url) {
    return React.cloneElement(link, { target: '_blank', href: action.url })
  }
}

export const Operation = ({ t, f, operation }) => (
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
      {!operation.action && '－'}
      {operation.action &&
        <OperationAction t={t} action={operation.action} />}
    </td>
  </tr>
)

export default translate()(Operation)
