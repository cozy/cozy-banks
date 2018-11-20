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
import { format } from 'date-fns'
import { isIOSApp } from 'cozy-device-helper'

import { translate, withBreakpoints, Button } from 'cozy-ui/react'
import * as List from 'components/List'
import { Table } from 'components/Table'

import styles from './Transactions.styl'
import { InfiniteScroll, ScrollRestore, TopMost } from './scroll'
import TransactionModal from './TransactionModal'
import { RowDesktop, RowMobile } from './TransactionRow'

const groupByDateAndSort = transactions => {
  const byDate = groupBy(transactions, x => format(x.date, 'YYYY-MM-DD'))
  return sortBy(toPairs(byDate), x => x[0]).reverse()
}

const loadMoreStyle = { textAlign: 'center' }
const loadMoreBtnStyle = { width: '100%', padding: '0.75rem', margin: 0 }
const LoadMoreButton = ({ children, onClick }) => (
  <Button
    style={loadMoreBtnStyle}
    onClick={onClick}
    subtle
    className="js-LoadMore"
  >
    {children}
  </Button>
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

class TransactionsD extends React.Component {
  state = {
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
    this.scrollSpy = new TopMost(this.getScrollingElement)
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
    const Section = isDesktop ? SectionDesktop : SectionMobile
    const LoadMoreButton = isDesktop ? LoadMoreDesktop : LoadMoreMobile
    const TransactionContainer = isDesktop ? Table : TransactionContainerMobile
    const Row = isDesktop ? RowDesktop : RowMobile

    return (
      <TransactionContainer
        className={styles.TransactionTable}
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
            <Section date={date} key={date}>
              {transactionGroup.map(transaction => {
                return (
                  <Row
                    key={transaction._id}
                    ref={this.handleRefRow.bind(null, transaction._id)}
                    transaction={transaction}
                    brands={brands}
                    urls={urls}
                    isExtraLarge={isExtraLarge}
                    filteringOnAccount={filteringOnAccount}
                    selectTransaction={selectTransaction}
                  />
                )
              })}
            </Section>
          )
        })}
        {manualLoadMore &&
          limitMax < this.transactions.length && (
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
      <React.Fragment>
        <Transactions selectTransaction={this.selectTransaction} {...props} />
        {transactionId && (
          <TransactionModal
            requestClose={this.unselectTransaction}
            transactionId={transactionId}
            {...props}
          />
        )}
      </React.Fragment>
    )
  }
}
