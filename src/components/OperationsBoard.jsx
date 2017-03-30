import styles from '../styles/operationsBoard'

import React, { Component } from 'react'
import classNames from 'classnames'

import Figure from '../components/Figure'

class OperationsBoard extends Component {
  render () {
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
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])}>
              Actions
            </th>
          </tr>
          <tbody className={styles['coz-table-body']}>
            <tr className={styles['coz-table-row']}>
              <td className={classNames(styles['coz-table-cell'], styles['bnk-table-date'])}>
                22 Février 2016
              </td>
              <td className={classNames(styles['coz-table-cell'], styles['bnk-table-desc'], styles['bnk-table-desc--restaurant'])}>
                Restaurant Les frères Sushi
              </td>
              <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'])}>
                <Figure total={-32.10} currency='€' signed coloredPositive />
              </td>
              <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])}>
                －
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default OperationsBoard
