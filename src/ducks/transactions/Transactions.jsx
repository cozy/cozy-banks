import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'
import keyBy from 'lodash/keyBy'
import format from 'date-fns/format'
import { translate, withBreakpoints, ListItemText } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { flowRight as compose, toPairs, groupBy } from 'lodash'
import { Table, TdSecondary } from 'components/Table'
import TransactionMenu from './TransactionMenu'
import TransactionActions from './TransactionActions'
import { getLabel } from './helpers'
import { getAccountLabel } from 'ducks/account/helpers'
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
import TransactionActionMenu from './TransactionActionMenu'
import InfiniteScroll from './InfiniteScroll'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']
const sActions = styles['bnk-op-actions']

const TableHeadDesktop = ({ t }) => (
  <thead>
    <tr>
      <td className={sDesc}>{t('Transactions.header.description')}</td>
      <td className={sDate}>{t('Transactions.header.date')}</td>
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
  ({
    t,
    f,
    transaction,
    isExtraLarge,
    showCategoryChoice,
    filteringOnAccount,
    ...props
  }) => {
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
        <td className={cx(sDesc, 'u-pv-half', 'u-pl-1')}>
          <Media>
            <Img title={categoryTitle} onClick={showCategoryChoice}>
              <CategoryIcon
                category={parentCategory}
                className={styles['bnk-op-caticon']}
              />
            </Img>
            <Bd className="u-pl-1">
              <ListItemText
                primaryText={getLabel(transaction)}
                secondaryText={
                  !filteringOnAccount && getAccountLabel(transaction.account)
                }
              />
            </Bd>
          </Media>
        </td>
        <TdSecondary className={sDate}>
          {f(transaction.date, `DD ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
        </TdSecondary>
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
  ({ t, transaction, selectTransaction, filteringOnAccount, ...props }) => {
    return (
      <tr className={styles['bnk-transaction-mobile']}>
        <td>
          <Media>
            <Img
              className="u-mr-half"
              title={t(
                `Data.subcategories.${getCategoryName(
                  getCategoryId(transaction)
                )}`
              )}
              onClick={() => selectTransaction(transaction)}
            >
              <CategoryIcon
                category={getParentCategory(getCategoryId(transaction))}
              />
            </Img>
            <Bd className="u-mr-half u-ellipsis">
              <ListItemText
                primaryText={getLabel(transaction)}
                secondaryText={
                  !filteringOnAccount && getAccountLabel(transaction.account)
                }
                onClick={() => selectTransaction(transaction)}
              />
            </Bd>
            <Img onClick={() => selectTransaction(transaction)}>
              <Figure
                total={transaction.amount}
                currency={transaction.currency}
                coloredPositive
                signed
              />
            </Img>
            <Img className={styles['bnk-transaction-mobile-action']}>
              <TransactionActions
                transaction={transaction}
                {...props}
                onlyDefault
                compact
                menuPosition="right"
              />
            </Img>
          </Media>
        </td>
      </tr>
    )
  }
)

export const TransactionTableHead = (props, { t }) => (
  <div
    style={{
      background: 'white',
      marginTop: '1rem',
      marginLeft: '-2rem',
      marginRight: '-2rem'
    }}
  >
    <Table className={styles['TransactionTable']}>
      <TableHeadDesktop t={t} />
    </Table>
  </div>
)

const groupByDateAndSort = transactions => {
  const byDate = groupBy(transactions, x => format(x.date, 'YYYY-MM-DD'))
  return sortBy(toPairs(byDate), x => x[0]).reverse()
}

class TransactionsD extends React.Component {
  state = {
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
  }

  }

  }

  }

  handleScroll = throttle(
    getScrollInfo => {
      this.props.onScroll(getScrollInfo)
    },
    100,
    { leading: false, trailing: true }
  )
  }

  getScrollingElement = () => {
    const {
      breakpoints: { isDesktop }
    } = this.props
    return isDesktop
      ? document.querySelector('.js-transactionPageBottom')
      : window
  }

  renderTransactions() {
    const {
      f,
      selectTransaction,
      limitMin,
      limitMax,
      breakpoints: { isDesktop, isExtraLarge },
      ...props
    } = this.props
    const transactions = this.transactions.slice(limitMin, limitMax)
    const transactionsOrdered = groupByDateAndSort(transactions)
    return (
      <Table
        className={styles['TransactionTable']}
        ref={ref => (this.transactionsRef = ref)}
      >
        {transactionsOrdered.map(dateAndGroup => {
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
                    filteringOnAccount
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

  render() {
    const { limitMin, limitMax } = this.props
    return (
      <InfiniteScroll
        canLoadAtTop={this.props.infiniteScrollTop && limitMin > 0}
        canLoadAtBottom={limitMax < this.transactions.length}
        limitMin={limitMin}
        limitMax={limitMax}
        onReachTop={this.props.onReachTop}
        onReachBottom={this.props.onReachBottom}
        getScrollingElement={this.getScrollingElement}
        onScroll={this.handleScroll}
        className={this.props.className}
      >
        {this.renderTransactions()}
      </InfiniteScroll>
    )
  }
}

const Transactions = compose(withBreakpoints(), translate())(TransactionsD)

export class TransactionsWithSelection extends React.Component {
  state = {
    transaction: null
  }

  selectTransaction = transaction => {
    this.setState({ transaction: transaction })
  }

  unselectTransaction = () => {
    this.setState({ transaction: null })
  }

  render(props) {
    const { transaction } = this.state
    return (
      <div>
        <Transactions selectTransaction={this.selectTransaction} {...props} />
        {transaction && (
          <TransactionActionMenu
            requestClose={this.unselectTransaction}
            transaction={transaction}
            {...props}
          />
        )}
      </div>
    )
  }
}
