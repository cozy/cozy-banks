import React from 'react'
import ReactDOM from 'react-dom'
import {
  sortBy,
  throttle,
  debounce,
  keyBy,
  flowRight as compose,
  toPairs,
  groupBy
} from 'lodash'
import cx from 'classnames'
import { isIOSApp } from 'cozy-device-helper'

import { translate, withBreakpoints } from 'cozy-ui/react'
import Button from 'cozy-ui/react/Button'
import * as List from 'components/List'
import { Table } from 'components/Table'

import styles from 'ducks/transactions/Transactions.styl'
import {
  InfiniteScroll,
  ScrollRestore,
  TopMost
} from 'ducks/transactions/scroll'
import TransactionModal from 'ducks/transactions/TransactionModal'
import { RowDesktop, RowMobile } from 'ducks/transactions/TransactionRow'
import { getDate } from 'ducks/transactions/helpers'

export const sortByDate = (transactions = []) =>
  sortBy(transactions, getDate).reverse()

const groupByDate = transactions => {
  const byDate = groupBy(transactions, x => getDate(x))
  return toPairs(byDate)
}

const loadMoreStyle = { textAlign: 'center' }
const loadMoreBtnStyle = { width: '100%', padding: '0.75rem', margin: 0 }
const LoadMoreButton = ({ children, onClick }) => (
  <Button
    style={loadMoreBtnStyle}
    onClick={onClick}
    subtle
    className="js-LoadMore"
    label={children}
  />
)

const LoadMoreDesktop = ({ children, onClick }) => (
  <tbody>
    <tr>
      <td style={loadMoreStyle}>
        <LoadMoreButton onClick={onClick}>{children}</LoadMoreButton>
      </td>
    </tr>
  </tbody>
)

const LoadMoreMobile = ({ children, onClick }) => (
  <div style={loadMoreStyle}>
    <LoadMoreButton onClick={onClick}>{children}</LoadMoreButton>
  </div>
)

const _SectionMobile = props => {
  const { date, f, children } = props
  return (
    <React.Fragment>
      <List.Header>{f(date, 'dddd D MMMM')}</List.Header>
      {children}
    </React.Fragment>
  )
}
const SectionMobile = translate()(_SectionMobile)

const SectionDesktop = props => {
  return <tbody {...props} />
}

const TransactionContainerMobile = props => {
  return <div {...props} />
}

const shouldRestore = (oldProps, nextProps) => {
  return (
    oldProps.limitMin !== nextProps.limitMin &&
    oldProps.limitMax === nextProps.limitMax
  )
}

export class TransactionsDumb extends React.Component {
  state = {
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
    this.topmost = new TopMost(this.getScrollingElement)
    this.handleRefRow = this.handleRefRow.bind(this)
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
    this.transactions = sortByDate(transactions)
  }

  updateTopMostVisibleTransaction() {
    const topMostTransactionId = this.topmost.getTopMostVisibleNodeId()
    const topMostTransaction = this.transactionsById[topMostTransactionId]
    if (topMostTransaction && this.props.onChangeTopMostTransaction) {
      this.props.onChangeTopMostTransaction(topMostTransaction)
    }
  }

  /**
   * Debounced in the constructor
   */
  handleScroll(getScrollInfo) {
    const { onScroll } = this.props

    if (onScroll) {
      onScroll(getScrollInfo)
    }

    this.updateTopMostVisibleTransaction()
  }

  handleRefRow(transactionId, ref) {
    const node = ReactDOM.findDOMNode(ref) // eslint-disable-line
    this.topmost.addNode(transactionId, node)
  }

  getScrollingElement = () => {
    const {
      breakpoints: { isDesktop }
    } = this.props
    return isDesktop ? document.querySelector('.js-scrolling-element') : window
  }

  renderTransactions() {
    const {
      t,
      selectTransaction,
      limitMin,
      limitMax,
      breakpoints: { isDesktop, isExtraLarge },
      manualLoadMore,
      filteringOnAccount
    } = this.props
    const transactionsGrouped = groupByDate(
      this.transactions.slice(limitMin, limitMax)
    )
    const Section = isDesktop ? SectionDesktop : SectionMobile
    const LoadMoreButton = isDesktop ? LoadMoreDesktop : LoadMoreMobile
    const TransactionContainer = isDesktop ? Table : TransactionContainerMobile
    const Row = isDesktop ? RowDesktop : RowMobile

    return (
      <TransactionContainer className={styles.TransactionTable}>
        {manualLoadMore && limitMin > 0 && (
          <LoadMoreButton onClick={() => this.props.onReachTop(20)}>
            {t('Transactions.see-more')}
          </LoadMoreButton>
        )}
        {transactionsGrouped.map(dateAndGroup => {
          const date = dateAndGroup[0]
          const transactionGroup = dateAndGroup[1]
          return (
            <Section date={date} key={date}>
              {transactionGroup.map(transaction => {
                return (
                  <Row
                    key={transaction._id}
                    onRef={this.handleRefRow.bind(null, transaction._id)}
                    transaction={transaction}
                    isExtraLarge={isExtraLarge}
                    filteringOnAccount={filteringOnAccount}
                    selectTransaction={selectTransaction}
                  />
                )
              })}
            </Section>
          )
        })}
        {manualLoadMore && limitMax < this.transactions.length && (
          <LoadMoreButton onClick={() => this.props.onReachBottom(20)}>
            {t('Transactions.see-more')}
          </LoadMoreButton>
        )}
      </TransactionContainer>
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
)(TransactionsDumb)

export class TransactionsWithSelection extends React.Component {
  static defaultProps = {
    withScroll: true
  }

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
    const { withScroll, className, ...rest } = this.props
    const { transactionId } = this.state
    return (
      <div
        className={cx(
          {
            [styles.ScrollingElement]: withScroll
          },
          'js-scrolling-element',
          className
        )}
      >
        <Transactions selectTransaction={this.selectTransaction} {...rest} />
        {transactionId && (
          <TransactionModal
            requestClose={this.unselectTransaction}
            transactionId={transactionId}
            {...rest}
          />
        )}
      </div>
    )
  }
}
