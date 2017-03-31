import styles from '../styles/operationsBoard'

import React, { Component } from 'react'
import classNames from 'classnames'

import Operation from './Operation'

class OperationsBoard extends Component {
  render () {
    const { movements } = this.props
    return (
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
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'], 'coz-desktop')}>
              Action
            </th>
          </tr>
          <tbody className={styles['coz-table-body']}>
            {movements.map(movement => <Operation movement={movement} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default OperationsBoard
