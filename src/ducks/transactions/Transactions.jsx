import React from 'react'
import cx from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import { Icon, translate, withBreakpoints } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { flowRight as compose } from 'lodash'
import { Table, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import { TransactionAction, getIcon, getLinkType } from './TransactionActions'
import { getLabel } from './helpers'
import { getParentCategory, getCategoryName } from 'ducks/categories/categoriesMap'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { withUpdateCategory } from 'ducks/categories'
import { updateDocument } from 'cozy-client'
import { withDispatch } from 'utils'

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

const updateCategoryParams = {
  updateCategory: (props, category) => {
    const { dispatch, transaction } = props
    transaction.categoryId = category.id
    dispatch(updateDocument(transaction))
  },
  getCategoryId: ownProps => ownProps.transaction.categoryId
}

const TableTrDesktop = compose(
  translate(),
  withDispatch,
  withUpdateCategory(updateCategoryParams)
)(({ t, f, transaction, urls, isExtraLarge, showCategoryChoice }) => {
  const categoryName = getCategoryName(transaction.categoryId)
  const categoryTitle = t(`Data.subcategories.${categoryName}`)
  const parentCategory = getParentCategory(transaction.categoryId)

  return (
    <tr>
      <TdSecondary className={sDate}>
        {f(transaction.date, `DD ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
      </TdSecondary>
      <td className={cx(sDesc, 'u-pv-half', 'u-pl-1')}>
        <Media>
          <Img title={categoryTitle} onClick={showCategoryChoice}>
            <CategoryIcon category={parentCategory} />
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
        <TransactionAction transaction={transaction} urls={urls} className={styles['bnk-table-actions-link']} />
      </TdSecondary>
      <TdSecondary className={sActions}>
        <TransactionMenu transaction={transaction} urls={urls} />
      </TdSecondary>
    </tr>
  )
})

const TableTrNoDesktop = translate()(({t, f, transaction, urls, selectTransaction}) => {
  const icon = getIcon(getLinkType(transaction, urls))
  return (
    <tr onClick={() => selectTransaction(transaction)} className={styles['bnk-transaction-mobile']}>
      <td>
        <Media>
          <Img className='u-mr-half' title={t(`Data.subcategories.${getCategoryName(transaction.categoryId)}`)}>
            <CategoryIcon category={getParentCategory(transaction.categoryId)} />
          </Img>
          <Bd className='u-mr-half u-ellipsis'>
            {getLabel(transaction)}
          </Bd>
          <Img className='u-mr-half'>
            <Figure total={transaction.amount} currency={transaction.currency} coloredPositive signed />
          </Img>
          { icon ? <Img className='u-mr-half' style={{ flexBasis: '1rem' }}>
            { icon }
          </Img> : null }
          <Img>
            <Icon icon='dots' />
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
