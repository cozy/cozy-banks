import React from 'react'
import classNames from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react/I18n'
import { Figure } from 'components/Figure'
import { Table, TdWithIcon, TdSecondary } from 'components/Table'
import OperationMenu from './OperationMenu'
import { OperationAction } from './OperationActions'
import breakpointsAware from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'

import styles from './Operations.styl'
import categoryData from 'utils/linxo-categories.json'

const getCategory = function (operation) {
  const categoryId = parseInt(operation.categoryId)
  const parentCategoryId = categoryId - (categoryId % 100)
  return categoryData[parentCategoryId.toString()]
}

const Operations = ({ f, operations, urls, selectOperation, breakpoints }) => {
  const isDesktop = breakpoints.desktop
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
          {isDesktop && <td className={styles['bnk-op-date']}>Date</td>}
          <td className={styles['bnk-op-desc']}>Description</td>
          <td className={styles['bnk-op-amount']}>Montant</td>
          {isDesktop && <td className={styles['bnk-op-action']}>Action</td>}
          {isDesktop && <td className={styles['bnk-op-actions']}>&nbsp;</td>}
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
                {isDesktop && <TdSecondary className={classNames(styles['bnk-op-date'])}>
                  {f(operation.date, 'DD MMMM YYYY')}
                </TdSecondary>}
                {isDesktop
                  ? <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${getCategory(operation)}`])}>
                    {operation.label}
                  </TdWithIcon>
                  : <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${getCategory(operation)}`])}
                    onClick={() => selectOperation(operation)}>
                    {operation.label}
                  </TdWithIcon>
                }
                {isDesktop
                  ? <TdSecondary className={classNames(styles['bnk-op-amount'])}>
                    <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                  </TdSecondary>
                  : <TdSecondary className={classNames(styles['bnk-op-amount'])}
                    onClick={() => selectOperation(operation)}>
                    <Figure total={operation.amount} currency={operation.currency} coloredPositive signed />
                  </TdSecondary>
                }
                {isDesktop && <TdSecondary className={styles['bnk-op-action']}>
                  <OperationAction operation={operation} urls={urls} className={styles['bnk-table-actions-link']} />
                </TdSecondary>}
                {isDesktop && <TdSecondary className={classNames(styles['bnk-op-actions'])}>
                  <OperationMenu operation={operation} urls={urls} />
                </TdSecondary>}
              </tr>)
            )}
          </tbody>
        )
      })}
    </Table>
  )
}

export default compose(
  breakpointsAware(),
  translate()
)(Operations)
