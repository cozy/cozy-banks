import React from 'react'
import cx from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { flowRight as compose } from 'lodash'
import { Table, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import { PrimaryAction, PrimaryActionIcon, HealthExpenseStatusIcon, getLinkType } from './TransactionActions'
import { getLabel } from './helpers'
import { getParentCategory, getCategoryName } from 'ducks/categories/categoriesMap'
import { getCategoryId, isHealthExpense } from 'ducks/categories/helpers'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { withUpdateCategory } from 'ducks/categories'
import { withDispatch } from 'utils'
import flash from 'ducks/flash'

import styles from './Transactions.styl'
import { Media, Bd, Img } from 'components/Media'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']
const sActions = styles['bnk-op-actions']

const TableHeadDesktop = ({t}) => (
  <thead>
    <tr>
      <td className={sDate}>{t('Transactions.header.date')}</td>
      <td className={sDesc}>{t('Transactions.header.description')}</td>
      <td className={sAmount}>{t('Transactions.header.amount')}</td>
      <td className={sAction}>{t('Transactions.header.action')}</td>
      <td className={sActions}>&nbsp;</td>
    </tr>
  </thead>
)

const showComingSoon = (t) => {
  flash(t('ComingSoon.description'))
}

const TableTrDesktop = compose(
  translate(),
  withDispatch,
  withUpdateCategory()
)(({ t, f, transaction, urls, isExtraLarge, showCategoryChoice }) => {
  const categoryId = getCategoryId(transaction)
  const categoryName = getCategoryName(categoryId)
  const categoryTitle = t(`Data.subcategories.${categoryName}`)
  const parentCategory = getParentCategory(categoryId)
  const onSelect = () => {}
  const onSelectDisabled = () => {
    showComingSoon(t)
  }
  return (
    <tr>
      <TdSecondary className={sDate}>
        {f(transaction.date, `DD ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
      </TdSecondary>
      <td className={cx(sDesc, 'u-pv-half', 'u-pl-1')}>
        <Media>
          <Img title={categoryTitle} onClick={showCategoryChoice}>
            <CategoryIcon category={parentCategory} className={styles['bnk-op-caticon']} />
          </Img>
          <Bd className='u-pl-1'>
            {getLabel(transaction)}
          </Bd>
        </Media>
      </td>
      <TdSecondary className={sAmount}>
        <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
      </TdSecondary>
      <TdSecondary className={sAction}>
        <PrimaryAction showIcon transaction={transaction} urls={urls} className={styles['bnk-table-actions-link']} />
      </TdSecondary>
      <TdSecondary className={sActions}>
        <TransactionMenu
          onSelect={onSelect}
          onSelectDisabled={onSelectDisabled}
          transaction={transaction}
          urls={urls} />
      </TdSecondary>
    </tr>
  )
})

const TableTrNoDesktop = translate()(({t, f, transaction, urls, selectTransaction}) => {
  return (
    <tr onClick={() => selectTransaction(transaction)} className={styles['bnk-transaction-mobile']}>
      <td>
        <Media>
          <Img className='u-mr-half' title={t(`Data.subcategories.${getCategoryName(getCategoryId(transaction))}`)}>
            <CategoryIcon category={getParentCategory(getCategoryId(transaction))} />
          </Img>
          <Bd className='u-mr-half u-ellipsis'>
            {getLabel(transaction)}
          </Bd>
          <Img style={{ flexBasis: '1rem' }}>
            {
              isHealthExpense(transaction)
                ? <HealthExpenseStatusIcon className='u-mr-half' type={getLinkType(transaction, urls)} transaction={transaction} />
                : <PrimaryActionIcon className='u-mr-half' type={getLinkType(transaction, urls)} />
            }
          </Img>
          <Img>
            <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
          </Img>
        </Media>
      </td>
    </tr>
  )
})

const Transactions = ({ t, f, transactions, urls, selectTransaction, breakpoints: { isDesktop, isExtraLarge } }) => {
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
            {!isDesktop && <tr className={styles['bnk-op-date-header']}>
              <td colspan='2'>{f(date, 'dddd D MMMM')}</td>
            </tr>}
            {transactionsOrdered.map(transaction => {
              return isDesktop
                ? <TableTrDesktop transaction={transaction} urls={urls} isExtraLarge={isExtraLarge} />
                : <TableTrNoDesktop transaction={transaction} urls={urls} selectTransaction={selectTransaction} />
            })}
          </tbody>
        )
      })}
    </Table>
  )
}

export default compose(
  withBreakpoints(),
  translate()
)(Transactions)
