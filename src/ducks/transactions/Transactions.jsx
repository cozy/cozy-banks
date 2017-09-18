import React from 'react'
import classNames from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react/I18n'
import { Figure } from 'components/Figure'
import breakpointsAware from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'
import { Table, TdWithIcon, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import { TransactionAction } from './TransactionActions'

import styles from './Transactions.styl'
import categoryData from 'ducks/categories/tree.json'

const getCategory = function (transaction) {
  const categoryId = parseInt(transaction.categoryId)
  const parentCategoryId = categoryId - (categoryId % 100)
  return categoryData[parentCategoryId.toString()]
}

const Transactions = ({ f, transactions, urls, selectTransaction, breakpoints }) => {
  const isDesktop = breakpoints.desktop
  const transactionsByDate = {}
  let dates = []

  for (const transaction of transactions) {
    const date = f(transaction.date, 'YYYY-MM-DD')
    if (transactionsByDate[date] === undefined) {
      transactionsByDate[date] = []
      dates.push(date)
    }
    transactionsByDate[date].push(transaction)
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
        const transactionsOrdered = transactionsByDate[date].sort((op1, op2) => compareDesc(op1.date, op2.date))
        return (
          <tbody>
            <tr className={classNames(styles['bnk-op-date-header'], 'coz-mobile')}>
              <td colspan='6'>{f(date, 'dddd D MMMM')}</td>
            </tr>
            {transactionsOrdered.map(transaction =>
              (<tr>
                {isDesktop && <TdSecondary className={classNames(styles['bnk-op-date'])}>
                  {f(transaction.date, 'DD MMMM YYYY')}
                </TdSecondary>}
                {isDesktop
                  ? <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${getCategory(transaction)}`])}>
                    {transaction.label}
                  </TdWithIcon>
                  : <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${getCategory(transaction)}`])}
                    onClick={() => selectTransaction(transaction)}>
                    {transaction.label}
                  </TdWithIcon>
                }
                {isDesktop
                  ? <TdSecondary className={classNames(styles['bnk-op-amount'])}>
                    <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
                  </TdSecondary>
                  : <TdSecondary className={classNames(styles['bnk-op-amount'])}
                    onClick={() => selectTransaction(transaction)}>
                    <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
                  </TdSecondary>
                }
                {isDesktop && <TdSecondary className={styles['bnk-op-action']}>
                  <TransactionAction transaction={transaction} urls={urls} className={styles['bnk-table-actions-link']} />
                </TdSecondary>}
                {isDesktop && <TdSecondary className={classNames(styles['bnk-op-actions'])}>
                  <TransactionMenu transaction={transaction} urls={urls} />
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
)(Transactions)
