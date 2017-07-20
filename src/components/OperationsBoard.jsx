import styles from 'styles/operationsBoard'

import React from 'react'
import classNames from 'classnames'

import Operation from 'components/Operation'

const OperationsBoard = ({ operations, urls }) => (
  <div>
    <h3>Opérations</h3>
    <table className={styles['coz-table']}>
      <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
        <th className={classNames(styles['coz-table-header'], styles['bnk-table-date'])}>
          Date
        </th>
        <th className={classNames(styles['coz-table-header'], styles['bnk-table-desc'])}>
          Description
        </th>
        <th className={classNames(styles['coz-table-header'], styles['bnk-table-amount'])}>
          Montant
        </th>
        <th className={classNames(styles['coz-table-header'], styles['bnk-table-action'], 'coz-desktop')}>
          Action
        </th>
        <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'], 'coz-desktop')}>
          &nbsp;
        </th>
      </tr>
      <tbody className={styles['coz-table-body']}>
        {operations.map(operation => <Operation operation={operation} urls={urls} />)}
      </tbody>
    </table>
  </div>
)

export default OperationsBoard
