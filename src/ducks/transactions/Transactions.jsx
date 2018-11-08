import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import {
  find,
  sortBy,
  throttle,
  debounce,
  keyBy,
  flowRight as compose,
  toPairs,
  groupBy
} from 'lodash'
import { format } from 'date-fns'
import {
  translate,
  withBreakpoints,
  Media,
  Bd,
  Img,
  ListItemText,
  Caption,
  Text,
  Button
} from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { Table, TdSecondary } from 'components/Table'
import TransactionActions from './TransactionActions'
import { getLabel } from './helpers'
import {
  getAccountLabel,
  getAccountInstitutionLabel
} from 'ducks/account/helpers'
import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'
import { getCategoryId } from 'ducks/categories/helpers'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { withUpdateCategory } from 'ducks/categories'
import { withDispatch } from 'utils'
import styles from './Transactions.styl'
import { InfiniteScroll, ScrollRestore } from './scroll'
import TransactionModal from './TransactionModal'
import { isIOSApp } from 'cozy-device-helper'
import PropTypes from 'prop-types'

const sDate = styles['bnk-op-date']
const sDesc = styles['bnk-op-desc']
const sAmount = styles['bnk-op-amount']
const sAction = styles['bnk-op-action']

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

    const account = transaction.account.data

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
              <ListItemText onClick={this.onSelectTransaction}>
                <Text>{getLabel(transaction)}</Text>
                {!filteringOnAccount && (
                  <Caption className={styles['bnk-op-desc-caption']}>
                    {getAccountLabel(account)}
                    {' - '}
                    {getAccountInstitutionLabel(account)}
                  </Caption>
                )}
              </ListItemText>
            </Bd>
          </Media>
        </td>
        <TdSecondary
          className={cx(sDate, 'u-clickable')}
          onClick={this.onSelectTransaction}
        >
          {f(transaction.date, `D ${isExtraLarge ? 'MMMM' : 'MMM'} YYYY`)}
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
            urls={props.urls}
            brands={props.brands}
            onlyDefault
          />
        </TdSecondary>
      </tr>
    )
  }
}

export const TableTrDesktop = compose(
  translate(),
  withDispatch,
  withUpdateCategory()
)(_TableTrDesktop)

class _TableTrNoDesktop extends React.PureComponent {
  render() {
    const { transaction, t, filteringOnAccount, ...props } = this.props
    const account = transaction.account.data
    return (
      <tr className={styles['bnk-transaction-mobile']}>
        <td>
          <Media>
            <Img
              className="u-clickable u-mr-half"
              title={t(
                `Data.subcategories.${getCategoryName(
                  getCategoryId(transaction)
                )}`
              )}
              onClick={this.handleSelect}
            >
              <CategoryIcon
                category={getParentCategory(getCategoryId(transaction))}
              />
            </Img>
            <Bd className="u-clickable u-mr-half">
              <ListItemText onClick={this.handleSelect}>
                <Text className="u-ellipsis">{getLabel(transaction)}</Text>
                {!filteringOnAccount && (
                  <Caption
                    className={cx('u-ellipsis', styles['bnk-op-desc-caption'])}
                  >
                    {getAccountLabel(account)}
                    {' - '}
                    {getAccountInstitutionLabel(account)}
                  </Caption>
                )}
              </ListItemText>
            </Bd>
            <Img onClick={this.handleSelect} className="u-clickable">
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
                urls={props.urls}
                brands={props.brands}
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

  handleSelect = () => {
    this.props.selectTransaction(this.props.transaction)
  }
}

_TableTrNoDesktop.propTypes = {
  transaction: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  brands: PropTypes.array.isRequired
}

export const TableTrNoDesktop = translate()(_TableTrNoDesktop)

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

const tdStyle = { textAlign: 'center' }
const btnStyle = { width: '100%', padding: '0.75rem', margin: 0 }
const LoadMoreButton = ({ children, onClick }) => (
  <tbody className="js-LoadMore">
    <tr>
      <td style={tdStyle}>
        <Button style={btnStyle} onClick={onClick} subtle>
          {children}
        </Button>
      </td>
    </tr>
  </tbody>
)

const shouldRestore = (oldProps, nextProps) => {
  return (
    oldProps.limitMin !== nextProps.limitMin &&
    oldProps.limitMax === nextProps.limitMax
  )
}

class TransactionsD extends React.Component {
  state = {
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
    this.scrollSpy = new ScrollSpy(this.getScrollingElement)
    this.handleScroll = (isIOSApp() ? debounce : throttle)(
      this.handleScroll.bind(this),
      300,
      { leading: false, trailing: true }
    )
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

  /**
   * Debounced in the constructor
   */
  handleScroll(getScrollInfo) {
    this.props.onScroll(getScrollInfo)
    this.updateTopMostVisibleTransaction()
  }

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
      t,
      selectTransaction,
      limitMin,
      limitMax,
      breakpoints: { isDesktop, isExtraLarge },
      manualLoadMore,
      filteringOnAccount,
      brands,
      urls
    } = this.props
    const transactions = this.transactions
      ? this.transactions.slice(limitMin, limitMax)
      : []
    const transactionsOrdered = groupByDateAndSort(transactions)
    return (
      <Table
        className={styles['TransactionTable']}
        ref={ref => (this.transactionsRef = ref)}
      >
        {manualLoadMore &&
          limitMin > 0 && (
            <LoadMoreButton onClick={() => this.props.onReachTop(20)}>
              {t('Transactions.see-more')}
            </LoadMoreButton>
          )}
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
                    brands={brands}
                    urls={urls}
                    isExtraLarge={isExtraLarge}
                    filteringOnAccount={filteringOnAccount}
                    selectTransaction={selectTransaction}
                  />
                ) : (
                  <TableTrNoDesktop
                    brands={brands}
                    urls={urls}
                    key={transaction._id}
                    ref={this.handleRefRow.bind(null, transaction._id)}
                    transaction={transaction}
                    filteringOnAccount={filteringOnAccount}
                    selectTransaction={selectTransaction}
                  />
                )
              })}
            </tbody>
          )
        })}
        {manualLoadMore &&
          limitMax < this.transactions.length && (
            <LoadMoreButton onClick={() => this.props.onReachBottom(20)}>
              {t('Transactions.see-more')}
            </LoadMoreButton>
          )}
      </Table>
    )
  }

  render() {
    const { limitMin, limitMax, manualLoadMore } = this.props
    return (
      <InfiniteScroll
        manual={manualLoadMore}
        canLoadAtTop={this.props.infiniteScrollTop && limitMin > 0}
        canLoadAtBottom={
          this.transactions && limitMax < this.transactions.length
        }
        limitMin={limitMin}
        limitMax={limitMax}
        onReachTop={this.props.onReachTop}
        onReachBottom={this.props.onReachBottom}
        getScrollingElement={this.getScrollingElement}
        onScroll={this.handleScroll}
        className={this.props.className}
      >
        <ScrollRestore
          limitMin={limitMin}
          limitMax={limitMax}
          getScrollingElement={this.getScrollingElement}
          shouldRestore={shouldRestore}
        >
          {this.renderTransactions(manualLoadMore)}
        </ScrollRestore>
      </InfiniteScroll>
    )
  }
}

const Transactions = compose(
  withBreakpoints(),
  translate()
)(TransactionsD)

export class TransactionsWithSelection extends React.Component {
  state = {
    transaction: null
  }

  selectTransaction = transaction => {
    this.setState({ transactionId: transaction._id })
  }

  unselectTransaction = () => {
    this.setState({ transactionId: null })
  }

  render() {
    const props = this.props
    const { transactionId } = this.state
    return (
      <div>
        <Transactions selectTransaction={this.selectTransaction} {...props} />
        {transactionId && (
          <TransactionModal
            requestClose={this.unselectTransaction}
            transactionId={transactionId}
            {...props}
          />
        )}
      </div>
    )
  }
}
