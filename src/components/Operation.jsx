import styles from '../styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'
import { translate } from '../lib/I18n'

import Figure from '../components/Figure'

export const Operation = ({ t, f, movement }) => (
  <tr className={styles['coz-table-row']}>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-date'])}>
      {f(movement.date, 'DD MMMM YYYY')}
    </td>
    <td className={classNames(
        styles['coz-table-cell'],
        styles['bnk-table-desc'],
        styles[`bnk-table-desc--${movement.type}`])}
    >
      {movement.name}
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
      <Figure
        total={movement.amount}
        currency={movement.currency}
        signed
        coloredPositive
      />
    </td>
    <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
      {!movement.action && '－'}
      {movement.action &&
        <a
          href={movement.action.url}
          className={styles['bnk-table-actions-link']}
        >
          {t(`Movements.actions.${movement.action.type}`)}
        </a>
      }
    </td>
  </tr>
)

export default translate()(Operation)
