/* global cozy */

import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isIOSApp } from 'cozy-device-helper'
import {
  flowRight as compose,
  isEqual,
  includes,
  findIndex,
  uniq,
  maxBy
} from 'lodash'
import { getFilteredAccounts } from 'ducks/filters'
import BarBalance from 'components/BarBalance'
import { translate, withBreakpoints } from 'cozy-ui/react'

import {
  getTransactionsFilteredByAccount,
  getFilteredAccountIds,
  getFilteredTransactions
} from 'ducks/filters'

import { getAppUrlById } from 'selectors'
import { getCategoryIdFromName } from 'ducks/categories/categoriesMap'
import { getDate } from 'ducks/transactions/helpers'
import { getCategoryId } from 'ducks/categories/helpers'

import Loading from 'components/Loading'

import { TransactionsWithSelection } from './Transactions'
import TransactionHeader from './TransactionHeader'
import styles from './TransactionsPage.styl'
import {
  ACCOUNT_DOCTYPE,
  appsConn,
  accountsConn,
  groupsConn,
  triggersConn,
  transactionsConn
} from 'doctypes'

import { getBrands } from 'ducks/brandDictionary'
import { getKonnectorFromTrigger } from 'utils/triggers'
import { queryConnect } from 'cozy-client'
import { isCollectionLoading } from 'ducks/client/utils'
import { findNearestMonth } from './helpers'
import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from 'ducks/balance/helpers'

import { subMonths } from 'date-fns'

const { BarRight } = cozy.bar

const STEP_INFINITE_SCROLL = 30
const SCROLL_THRESOLD_TO_ACTIVATE_TOP_INFINITE_SCROLL = 150
const getMonth = date => date.slice(0, 7)

class TransactionsPage extends Component {
  state = {
    fetching: false,
    limitMin: 0,
    limitMax: STEP_INFINITE_SCROLL,
    infiniteScrollTop: false
  }

  constructor(props) {
    super(props)
    this.displayTransactions = this.displayTransactions.bind(this)
    this.handleDecreaseLimitMin = this.handleDecreaseLimitMin.bind(this)
    this.handleIncreaseLimitMax = this.handleIncreaseLimitMax.bind(this)
    this.handleChangeMonth = this.handleChangeMonth.bind(this)
    this.handleChangeTopmostTransaction = this.handleChangeTopmostTransaction.bind(
      this
    )
    this.checkToActivateTopInfiniteScroll = this.checkToActivateTopInfiniteScroll.bind(
      this
    )
  }

  setCurrentMonthFollowingMostRecentTransaction() {
    const transactions = this.props.filteredTransactions
    if (!transactions || transactions.length === 0) {
      return
    }
    const mostRecentTransaction = maxBy(transactions, x => x.date)
    if (!mostRecentTransaction) {
      return
    }
    this.setState({
      currentMonth: getMonth(mostRecentTransaction.date)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.accountIds, prevProps.accountIds)) {
      this.setCurrentMonthFollowingMostRecentTransaction()
    }
    if (prevState.fetching && !this.state.fetching) {
      this.setCurrentMonthFollowingMostRecentTransaction()
    }
  }

  getInstalledKonnectorsSlugs() {
    const { triggers } = this.props

    if (isCollectionLoading(triggers)) {
      return []
    }

    return triggers.data
      .filter(trigger => trigger.worker === 'konnector')
      .map(getKonnectorFromTrigger)
      .filter(Boolean)
  }

  handleChangeTopmostTransaction(transaction) {
    this.setState({
      currentMonth: getMonth(transaction.date)
    })
  }

  handleIncreaseLimitMax() {
    this.setState({
      limitMax: this.state.limitMax + STEP_INFINITE_SCROLL
    })
  }

  handleDecreaseLimitMin(amount = STEP_INFINITE_SCROLL) {
    const transactions = this.props.filteredTransactions
    let goal = Math.max(this.state.limitMin - amount, 0)

    // try not have a cut on the same day
    while (
      goal > 0 &&
      getDate(transactions[goal]) === getDate(transactions[goal - 1])
    ) {
      goal--
    }
    this.setState({
      limitMin: goal
    })
  }

  handleChangeMonth(month) {
    const transactions = this.props.filteredTransactions
    const findMonthIndex = month =>
      findIndex(transactions, t => t.date.indexOf(month) === 0)
    let limitMin = findMonthIndex(month)

    if (limitMin == -1) {
      const monthsWithOperations = uniq(
        transactions.map(x => getMonth(x.date))
      ).sort()
      const nearestMonth = findNearestMonth(
        month,
        this.state.currentMonth,
        monthsWithOperations
      )
      if (nearestMonth) {
        month = nearestMonth
        limitMin = findMonthIndex(month)
      } else {
        month = monthsWithOperations[0]
        limitMin = 0
      }
    }
    this.setState(
      {
        limitMin: limitMin,
        limitMax: limitMin + 10,
        currentMonth: month,
        infiniteScrollTop: false
      },
      () => {
        // need to scroll past the LoadMore button
        if (isIOSApp()) {
          const LoadMoreBtn = document.querySelector('.js-LoadMore')
          const padding = 15
          const scrollTo = LoadMoreBtn
            ? LoadMoreBtn.getBoundingClientRect().bottom +
              window.scrollY -
              padding
            : 0
          window.scrollTo(0, scrollTo)
        }
      }
    )
  }

  checkToActivateTopInfiniteScroll(getScrollInfo) {
    const scrollInfo = getScrollInfo()
    if (scrollInfo.scroll > SCROLL_THRESOLD_TO_ACTIVATE_TOP_INFINITE_SCROLL) {
      this.setState({ infiniteScrollTop: true })
    }
  }

  getTransactions = () => {
    const {
      filteredTransactions,
      router: {
        params: { subcategoryName }
      }
    } = this.props

    if (!subcategoryName) {
      return filteredTransactions
    }

    const categoryId = getCategoryIdFromName(subcategoryName)
    return filteredTransactions.filter(
      transaction => getCategoryId(transaction) === categoryId
    )
  }

  getBrands() {
    const installedKonnectorsSlugs = this.getInstalledKonnectorsSlugs()
    const brands = getBrands().map(brand => ({
      ...brand,
      hasTrigger: includes(installedKonnectorsSlugs, brand.konnectorSlug)
    }))

    return brands
  }

  getFilteringOnAccount = () => {
    const { filteringDoc } = this.props

    return filteringDoc && filteringDoc._type === ACCOUNT_DOCTYPE
  }

  displayTransactions() {
    const { limitMin, limitMax, infiniteScrollTop } = this.state
    const { t, urls } = this.props
    const transations = this.getTransactions()

    if (transations.length === 0) {
      return <p>{t('Transactions.no-movements')}</p>
    }

    return (
      <div
        className={styles.TransactionPage__bottom + ' js-transactionPageBottom'}
      >
        <TransactionsWithSelection
          className={styles.TransactionPage__top}
          limitMin={limitMin}
          limitMax={limitMax}
          onReachTop={this.handleDecreaseLimitMin}
          onReachBottom={this.handleIncreaseLimitMax}
          infiniteScrollTop={infiniteScrollTop}
          onChangeTopMostTransaction={this.handleChangeTopmostTransaction}
          onScroll={this.checkToActivateTopInfiniteScroll}
          transactions={transations}
          urls={urls}
          brands={this.getBrands()}
          filteringOnAccount={this.getFilteringOnAccount()}
          manualLoadMore={isIOSApp()}
        />
      </div>
    )
  }

  getBalanceHistory(accounts, transactions) {
    const today = new Date()
    const twoMonthsBefore = subMonths(today, 2)

    const balanceHistories = getBalanceHistories(
      accounts,
      transactions,
      today,
      twoMonthsBefore
    )
    const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

    return balanceHistory
  }

  getChartData() {
    const isLoading =
      isCollectionLoading(this.props.transactions) ||
      isCollectionLoading(this.props.accounts) ||
      this.state.fetching

    if (isLoading) {
      return null
    }

    const transactions = this.getTransactions()
    const accounts = this.props.filteredAccounts

    const history = this.getBalanceHistory(accounts, transactions)
    const data = balanceHistoryToChartData(history)

    return data
  }

  render() {
    const {
      accounts,
      transactions,
      breakpoints: { isMobile },
      filteredAccounts
    } = this.props

    const isFetching = isCollectionLoading(transactions) || this.state.fetching
    const filteredTransactions = this.getTransactions()

    const chartData = this.getChartData()

    return (
      <div className={styles.TransactionPage}>
        <TransactionHeader
          transactions={filteredTransactions}
          handleChangeMonth={this.handleChangeMonth}
          currentMonth={this.state.currentMonth}
          chartData={chartData}
        />
        {isMobile &&
          !isCollectionLoading(accounts) && (
            <BarRight>
              <BarBalance accounts={filteredAccounts} />
            </BarRight>
          )}
        {isFetching ? (
          <Loading loadingType="movements" />
        ) : (
          this.displayTransactions()
        )}
      </div>
    )
  }
}

const onSubcategory = ownProps => ownProps.router.params.subcategoryName
const mapStateToProps = (state, ownProps) => {
  const enhancedState = {
    ...state,
    accounts: ownProps.accounts,
    apps: ownProps.apps,
    groups: ownProps.groups,
    transactions: ownProps.transactions,
    triggers: ownProps.triggers
  }

  const filteredTransactions = onSubcategory(ownProps)
    ? getFilteredTransactions(enhancedState)
    : getTransactionsFilteredByAccount(enhancedState)

  return {
    urls: {
      // this keys are used on Transactions.jsx to:
      // - find transaction label
      // - display appName in translate `Transactions.actions.app`
      MAIF: getAppUrlById(enhancedState, 'io.cozy.apps/maif'),
      HEALTH: getAppUrlById(enhancedState, 'io.cozy.apps/sante'),
      EDF: getAppUrlById(enhancedState, 'io.cozy.apps/edf'),
      COLLECT: getAppUrlById(enhancedState, 'io.cozy.apps/collect'),
      HOME: getAppUrlById(enhancedState, 'io.cozy.apps/home')
    },
    accountIds: getFilteredAccountIds(enhancedState),
    filteringDoc: state.filters.filteringDoc,
    filteredAccounts: getFilteredAccounts(enhancedState),
    filteredTransactions: filteredTransactions
  }
}

export default compose(
  withRouter,
  queryConnect({
    apps: appsConn,
    accounts: accountsConn,
    groups: groupsConn,
    triggers: triggersConn,
    transactions: transactionsConn
  }),
  withBreakpoints(),
  connect(mapStateToProps),
  translate()
)(TransactionsPage)
