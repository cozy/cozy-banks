import React from 'react'
import classNames from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import breakpointsAware from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'
import { Table, TdWithIcon, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import { TransactionAction, getIcon, getLinkType } from './TransactionActions'
import { getLabel } from './helpers'
import { getParentCategory } from 'ducks/categories/categoriesMap'
import CategoryIcon from 'ducks/categories/CategoryIcon'

import styles from './Transactions.styl'

const TableHeadDesktop = ({t}) => (
  <thead>
    <tr>
      <td className={styles['bnk-op-date']}>{t('Transactions.header.date')}</td>
      <td className={styles['bnk-op-desc']}>{t('Transactions.header.description')}</td>
      <td className={styles['bnk-op-amount']}>{t('Transactions.header.amount')}</td>
      <td className={styles['bnk-op-action']}>{t('Transactions.header.action')}</td>
      <td className={styles['bnk-op-actions']}>&nbsp;</td>
    </tr>
  </thead>
)

const TableTrDesktop = ({f, transaction, urls, isExtraLarge}) => (
  <tr>
    <TdSecondary className={classNames(styles['bnk-op-date'])}>
      {f(transaction.date, `DD ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
    </TdSecondary>
    <TdWithIcon className={classNames(styles['bnk-op-desc'], styles[`bnk-table-desc--${getParentCategory(transaction.categoryId)}`])}>
      {getLabel(transaction)}
    </TdWithIcon>
    <TdSecondary className={classNames(styles['bnk-op-amount'])}>
      <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
    </TdSecondary>
    <TdSecondary className={styles['bnk-op-action']}>
      <TransactionAction transaction={transaction} urls={urls} className={styles['bnk-table-actions-link']} />
    </TdSecondary>
    <TdSecondary className={classNames(styles['bnk-op-actions'])}>
      <TransactionMenu transaction={transaction} urls={urls} />
    </TdSecondary>
  </tr>
)

const TableTrNoDesktop = ({f, transaction, urls, selectTransaction}) => (
  <tr onClick={() => selectTransaction(transaction)} className={styles['bnk-transaction-mobile']}>
    <td className={styles.icon}>
      <CategoryIcon transaction={transaction} />
    </td>
    <td style='flex: 0 0 2em' className='coz-desktop'>
      <div style='width: 1em'>
        {getIcon(getLinkType(transaction, urls))}
      </div>
    </td>
    <td className={styles.content}>
      <div className={styles.label}>
        {getLabel(transaction)}
      </div>
      <div className={styles.amount}>
        <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
      </div>
    </td>
  </tr>
)

const Transactions = ({ t, f, transactions, urls, selectTransaction, breakpoints }) => {
  const isDesktop = breakpoints.desktop
  const isExtraLarge = breakpoints.extraLarge
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
      {isDesktop && <TableHeadDesktop t={t} />}
      {dates.map(date => {
        const transactionsOrdered = transactionsByDate[date].sort((op1, op2) => compareDesc(op1.date, op2.date))
        return (
          <tbody>
            {!isDesktop && <tr className={classNames(styles['bnk-op-date-header'])}>
              <td colspan='2'>{f(date, 'dddd D MMMM')}</td>
            </tr>}
            {transactionsOrdered.map(transaction => {
              return isDesktop
                ? <TableTrDesktop transaction={transaction} urls={urls} f={f} isExtraLarge={isExtraLarge} />
                : <TableTrNoDesktop transaction={transaction} urls={urls} f={f} selectTransaction={selectTransaction} />
            })}
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
