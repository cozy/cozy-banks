import React from 'react'
import classNames from 'classnames'
import Operation from 'components/Operation'
import styles from 'styles/operationsBoard'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react/I18n'

const OperationsBoard = ({ f, operations, urls }) => {
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
              <tr className={classNames(styles['bnk-table-row-date'], 'coz-mobile')}><td colspan='6'>{f(date, 'dddd D MMMM')}</td></tr>
              {operationsOrdered.map(operation => <Operation operation={operation} urls={urls} />)}
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default translate()(OperationsBoard)
