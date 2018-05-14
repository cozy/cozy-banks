import React, { PureComponent } from 'react'
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
import styles from './Transactions.styl'
import { Media, Bd, Img } from 'components/Media'
import InfiniteScroll from './InfiniteScroll'
import TransactionModal from './TransactionModal'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']

const TableHeadDesktop = ({ t }) => (
  <thead>
    <tr>
      <td className={sDesc}>{t('Transactions.header.description')}</td>
      <td className={sDate}>{t('Transactions.header.date')}</td>
      <td className={sAmount}>{t('Transactions.header.amount')}</td>
      <td className={sAction}>{t('Transactions.header.action')}</td>
    </tr>
  </thead>
)

class _TableTrDesktop extends PureComponent {
  onSelectTransaction = () =>
    this.props.selectTransaction(this.props.transaction)

  render() {
    const {
      t,
      f,
      transaction,
      isExtraLarge,
      showCategoryChoice,
      filteringOnAccount,
      ...props
    } = this.props

    const categoryId = getCategoryId(transaction)
    const categoryName = getCategoryName(categoryId)
    const categoryTitle = t(`Data.subcategories.${categoryName}`)
    const parentCategory = getParentCategory(categoryId)

    return (
      <tr>
        <td className={cx(sDesc, 'u-pv-half', 'u-pl-1')}>
          <Media className="u-clickable">
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
                onClick={this.onSelectTransaction}
              />
            </Bd>
          </Media>
        </td>
        <TdSecondary
          className={cx(sDate, 'u-clickable')}
          onClick={this.onSelectTransaction}
        >
          {f(transaction.date, `DD ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
        </TdSecondary>
        <TdSecondary
          className={cx(sAmount, 'u-clickable')}
          onClick={this.onSelectTransaction}
        >
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
      </tr>
    )
  }
}

const TableTrDesktop = compose(translate(), withDispatch, withUpdateCategory())(
  _TableTrDesktop
)

const TableTrNoDesktop = translate()(
  ({ t, transaction, selectTransaction, filteringOnAccount, ...props }) => {
    const onSelectTransaction = () => selectTransaction(transaction)

    return (
      <tr className={styles['bnk-transaction-mobile']}>
        <td>
          <Media>
            <Img
              className={cx('u-clickable', 'u-mr-half')}
              title={t(
                `Data.subcategories.${getCategoryName(
                  getCategoryId(transaction)
                )}`
              )}
              onClick={onSelectTransaction}
            >
              <CategoryIcon
                category={getParentCategory(getCategoryId(transaction))}
              />
            </Img>
            <Bd className={cx('u-clickable', 'u-mr-half u-ellipsis')}>
              <ListItemText
                primaryText={getLabel(transaction)}
                secondaryText={
                  !filteringOnAccount && getAccountLabel(transaction.account)
                }
                onClick={onSelectTransaction}
              />
            </Bd>
            <Img onClick={onSelectTransaction} className="u-clickable">
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

class ScrollSpy {
  constructor(getScrollingElement) {
    this.getScrollingElement = getScrollingElement
    this.nodes = {}
  }

  addNode(id, node) {
    this.nodes[id] = node
  }

  getTopMostVisibleNodeId() {
    const scrollEl = this.getScrollingElement()
    const topRoot =
      scrollEl === window ? 0 : scrollEl.getBoundingClientRect().top
    const offsets = sortBy(
      Object.entries(this.nodes).map(([tId, node]) => [
        tId,
        node ? node.getBoundingClientRect().top : Infinity
      ]),
      x => x[1]
    )
    const topMost = find(offsets, o => {
      const offset = o[1]
      return offset - topRoot > 0
    })
    return topMost ? topMost[0] : null
  }
}

class TransactionsD extends React.Component {
  state = {
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
    this.scrollSpy = new ScrollSpy(this.getScrollingElement)
  }

  componentWillMount() {
    this.updateTransactions(this.props.transactions)
  }

  componentWillUpdate(nextProps) {
    if (this.props.transactions !== nextProps.transactions) {
      this.updateTransactions(nextProps.transactions)
    }
  }

  updateTransactions(transactions) {
    this.transactionsById = keyBy(transactions, '_id')
    this.transactions = transactions
  }

  updateTopMostVisibleTransaction() {
    const topMostTransactionId = this.scrollSpy.getTopMostVisibleNodeId()
    const topMostTransaction = this.transactionsById[topMostTransactionId]
    if (topMostTransaction) {
      this.props.onChangeTopMostTransaction(topMostTransaction)
    }
  }

  handleScroll = throttle(
    getScrollInfo => {
      this.props.onScroll(getScrollInfo)
      this.updateTopMostVisibleTransaction()
    },
    100,
    { leading: false, trailing: true }
  )

  handleRefRow = (transactionId, ref) => {
    const node = ReactDOM.findDOMNode(ref) // eslint-disable-line
    this.scrollSpy.addNode(transactionId, node)
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
                    key={transaction._id}
                    ref={this.handleRefRow.bind(null, transaction._id)}
                    transaction={transaction}
                    isExtraLarge={isExtraLarge}
                    filteringOnAccount
                    selectTransaction={selectTransaction}
                    {...props}
                  />
                ) : (
                  <TableTrNoDesktop
                    key={transaction._id}
                    ref={this.handleRefRow.bind(null, transaction._id)}
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
          <TransactionModal
            requestClose={this.unselectTransaction}
            transaction={transaction}
            {...props}
          />
        )}
      </div>
    )
  }
}
