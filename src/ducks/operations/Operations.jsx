import React from 'react'
import classNames from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react/I18n'
import { Figure } from 'components/Figure'
import OperationMenu from './OperationMenu'
import { OperationAction } from './OperationActions'

import styles from './Operations.styl'

const Operations = ({ f, operations, urls, selectOperation }) => {
  const operationsByDate = {}
  let dates = []

  for (const operation of operations) {
    const date = f(operation.date, 'YYYY-MM-DD')
    if (operationsByDate[date] === undefined) {
      operationsByDate[date] = []
      dates.push(date)
    }
    operationsByDate[date].push(operation)
  }
  dates = dates.sort(compareDesc)

  return (
    <div>
      <h3>Opérations</h3>
      <table className={styles['coz-table']}>
        <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
          <th className={classNames(styles['coz-table-header'], styles['bnk-table-date'], 'coz-desktop')}>
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
          <th className={classNames(styles['coz-table-header'], styles['bnk-table-action'], 'coz-mobile')}>
            &nbsp;
          </th>
          <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'], 'coz-desktop')}>
            &nbsp;
          </th>
        </tr>
        {dates.map(date => {
          const operationsOrdered = operationsByDate[date].sort((op1, op2) => compareDesc(op1.date, op2.date))
          return (
            <tbody className={styles['coz-table-body']}>
              <tr className={classNames(styles['bnk-table-row-date'], 'coz-mobile')}>
                <td colspan='6'>{f(date, 'dddd D MMMM')}</td>
              </tr>
              {operationsOrdered.map(operation =>
                <tr className={styles['coz-table-row']}>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-date'], 'coz-desktop')}>
                    {f(operation.date, 'DD MMMM YYYY')}
                  </td>
                  <td className={classNames(
                      styles['coz-table-cell'],
                      styles['bnk-table-desc'],
                      styles[`bnk-table-desc--${operation.category}`], 'coz-desktop')}
                  >
                    {operation.label}
                  </td>
                  <td className={classNames(
                      styles['coz-table-cell'],
                      styles['bnk-table-desc'],
                      styles[`bnk-table-desc--${operation.category}`], 'coz-mobile')}
                    onClick={() => selectOperation(operation)}
                  >
                    {operation.label}
                  </td>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'], 'coz-desktop')}>
                    <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                  </td>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-amount'], 'coz-mobile')}
                    onClick={() => selectOperation(operation)}>
                    <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                  </td>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-action'])}>
                    <OperationAction operation={operation} urls={urls} className={styles['bnk-table-actions-link']} />
                  </td>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'], 'coz-desktop')}>
                    <OperationMenu operation={operation} urls={urls} />
                  </td>
                </tr>
              )}
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default translate()(Operations)
