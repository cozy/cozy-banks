import React from 'react'
import cx from 'classnames'
import format from 'date-fns/format'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { flowRight as compose, toPairs, groupBy, sortBy } from 'lodash'
import { Table, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import TransactionActions from './TransactionActions'
import { getLabel } from './helpers'
import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'
import { getCategoryId } from 'ducks/categories/helpers'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { withUpdateCategory } from 'ducks/categories'
import { withDispatch } from 'utils'
import flash from 'ducks/flash'

import styles from './Transactions.styl'
import { Media, Bd, Img } from 'components/Media'
// import { HealthExpenseStatus, HealthExpenseStatusIcon, getVendors } from 'ducks/health-expense'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']
const sActions = styles['bnk-op-actions']

const TableHeadDesktop = ({ t }) => (
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

const showComingSoon = t => {
  flash(t('ComingSoon.description'))
}

const TableTrDesktop = compose(translate(), withDispatch, withUpdateCategory())(
  ({ t, f, transaction, isExtraLarge, showCategoryChoice, ...props }) => {
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
              <CategoryIcon
                category={parentCategory}
                className={styles['bnk-op-caticon']}
              />
            </Img>
            <Bd className="u-pl-1">{getLabel(transaction)}</Bd>
          </Media>
        </td>
        <TdSecondary className={sAmount}>
          <Figure
            total={transaction.amount}
            currency={transaction.currency}
            coloredPositive
            signed
          />
        </TdSecondary>
        <TdSecondary className={sAction}>
          <TransactionActions
            transaction={transaction}
            {...props}
            onlyDefault
          />
        </TdSecondary>
        <TdSecondary className={sActions}>
          <TransactionMenu
            onSelect={onSelect}
            onSelectDisabled={onSelectDisabled}
            transaction={transaction}
            {...props}
          />
        </TdSecondary>
      </tr>
    )
  }
)

const TableTrNoDesktop = translate()(
  ({ t, transaction, selectTransaction, ...props }) => {
    return (
      <tr
        onClick={() => selectTransaction(transaction)}
        className={styles['bnk-transaction-mobile']}
      >
        <td>
          <Media>
            <Img
              className="u-mr-half"
              title={t(
                `Data.subcategories.${getCategoryName(
                  getCategoryId(transaction)
                )}`
              )}
            >
              <CategoryIcon
                category={getParentCategory(getCategoryId(transaction))}
              />
            </Img>
            <Bd className="u-mr-half u-ellipsis">{getLabel(transaction)}</Bd>
            <Img style={{ flexBasis: '1rem' }}>
              <TransactionActions
                transaction={transaction}
                {...props}
                onlyDefault
                onlyIcon
              />
            </Img>
            <Img>
              <Figure
                total={transaction.amount}
                currency={transaction.currency}
                coloredPositive
                signed
              />
            </Img>
          </Media>
        </td>
      </tr>
    )
  }
)

const groupByDateAndSort = transactions => {
  const byDate = groupBy(transactions, x => format(x.date, 'YYYY-MM-DD'))
  return sortBy(toPairs(byDate), x => x[0]).reverse()
}

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10000, // TODO fix this. nb of days shown, progressively increased
      ...this.getDerivedStateFromProps(props)
    }
  }

  getDerivedStateFromProps() {
    return {
      // transactionsOrdered: groupByDateAndSort(props.transactions)
    }
  }

  componentDidUpdate() {
    /*
    if (this.props.transactions !== previousProps.transactions) {
      this.setState({
        limit: 2,
        ...this.getDerivedStateFromProps(this.props)
      }, () => {
        this.scheduleLimitIncrease(0)
      })
    }
    */
  }

  componentDidMount() {
    // this.scheduleLimitIncrease()
  }

  scheduleLimitIncrease(timeout = 1000, delay = 1000) {
    this.limitTimeout = setTimeout(() => {
      if (this.state.limit > this.state.transactionsOrdered.length) {
        return
      }
      this.setState({ limit: this.state.limit + 5 })
      this.scheduleLimitIncrease(delay)
    }, timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.limitTimeout)
  }

  render() {
    const {
      t,
      f,
      selectTransaction,
      breakpoints: { isDesktop, isExtraLarge },
      ...props
    } = this.props
    const { limit } = this.state
    const transactionsOrdered = groupByDateAndSort(props.transactions)
    return (
      <Table className={styles['bnk-op-table']}>
        {isDesktop && <TableHeadDesktop t={t} />}
        {transactionsOrdered.slice(0, limit).map(dateAndGroup => {
          const date = dateAndGroup[0]
          const transactionGroup = dateAndGroup[1]
          return (
            <tbody key={date}>
              {!isDesktop && (
                <tr className={styles['bnk-op-date-header']}>
                  <td colSpan="2">{f(date, 'dddd D MMMM')}</td>
                </tr>
              )}
              {transactionGroup.map(transaction => {
                return isDesktop ? (
                  <TableTrDesktop
                    transaction={transaction}
                    isExtraLarge={isExtraLarge}
                    {...props}
                  />
                ) : (
                  <TableTrNoDesktop
                    transaction={transaction}
                    selectTransaction={selectTransaction}
                    {...props}
                  />
                )
              })}
            </tbody>
          )
        })}
      </Table>
    )
  }
}

export default compose(withBreakpoints(), translate())(Transactions)
