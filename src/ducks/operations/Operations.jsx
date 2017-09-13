import React from 'react'
import classNames from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react/I18n'
import { Figure } from 'components/Figure'
import { Table, TdWithIcon } from 'components/Table'
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
    <Table className={styles['bnk-op-table']}>
      <thead>
        <tr>
          <td className={styles['bnk-op-date']}>Date</td>
          <td className={styles['bnk-op-desc']}>Description</td>
          <td className={styles['bnk-op-amount']}>Montant</td>
          <td className={styles['bnk-op-action']}>Action</td>
          <td className={styles['bnk-op-actions']}>&nbsp;</td>
        </tr>
      </thead>
      {dates.map(date => {
        const operationsOrdered = operationsByDate[date].sort((op1, op2) => compareDesc(op1.date, op2.date))
        return (
          <tbody>
            <tr className={classNames(styles['bnk-op-date-header'], 'coz-mobile')}>
              <td colspan='6'>{f(date, 'dddd D MMMM')}</td>
            </tr>
            {operationsOrdered.map(operation =>
              (<tr>
                <td className={classNames(styles['bnk-op-date'], 'coz-desktop')}>
                  {f(operation.date, 'DD MMMM YYYY')}
                </td>
                <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${operation.category}`], 'coz-desktop')}>
                  {operation.label}
                </TdWithIcon>
                <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${operation.category}`], 'coz-mobile')}
                  onClick={() => selectOperation(operation)}>
                  {operation.label}
                </TdWithIcon>
                <td className={classNames(styles['bnk-op-amount'], 'coz-desktop')}>
                  <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                </td>
                <td className={classNames(styles['bnk-op-amount'], 'coz-mobile')}
                  onClick={() => selectOperation(operation)}>
                  <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                </td>
                <td className={styles['bnk-op-action']}>
                  <OperationAction operation={operation} urls={urls} className={styles['bnk-table-actions-link']} />
                </td>
                <td className={classNames(styles['bnk-op-actions'], 'coz-desktop')}>
                  <OperationMenu operation={operation} urls={urls} />
                </td>
              </tr>)
            )}
          </tbody>
        )
      })}
    </Table>
  )
}

export default translate()(Operations)
