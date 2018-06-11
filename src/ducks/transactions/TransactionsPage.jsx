/* global cozy */

import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  flowRight as compose,
  isEqual,
  includes,
  findIndex,
  find,
  findLast,
  uniq,
  maxBy
} from 'lodash'
import { getCollection, cozyConnect, fetchCollection } from 'cozy-client'
import { getFilteredAccounts } from 'ducks/filters'
import BarBalance from 'components/BarBalance'
import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/react'

import {
  getTransactionsFilteredByAccount,
  getFilteredAccountIds,
  getFilteredTransactions
} from 'ducks/filters'

import SelectDates, { ConnectedSelectDates } from 'components/SelectDates'
import { fetchTransactions } from 'actions/transactions'
import { getAppUrlById, fetchApps } from 'ducks/apps'
import { getCategoryIdFromName } from 'ducks/categories/categoriesMap'
import { hydrateTransaction, getDate } from 'ducks/transactions/helpers'
import { getCategoryId } from 'ducks/categories/helpers'

import Loading from 'components/Loading'
import { Breadcrumb } from 'components/Breadcrumb'
import BackButton from 'components/BackButton'

import { TransactionTableHead, TransactionsWithSelection } from './Transactions'
import styles from './TransactionsPage.styl'
import { TRIGGER_DOCTYPE, ACCOUNT_DOCTYPE } from 'doctypes'
import { getBrands } from 'ducks/brandDictionary'
import { AccountSwitch } from 'ducks/account'
import { onIOS } from 'utils/platform'

const { BarRight } = cozy.bar

const isPendingOrLoading = function(col) {
  return col.fetchStatus === 'pending' || col.fetchStatus === 'loading'
}

const SCROLL_THRESOLD_TO_ACTIVATE_TOP_INFINITE_SCROLL = 150
const getMonth = date => date.slice(0, 7)

// Performs successive `find`s until one of the find functions returns
// a result
const multiFind = (arr, findFns) => {
  for (let findFn of findFns) {
    const res = findFn(arr)
    if (res) {
      return res
    }
  }
  return null
}

// The goal here is to find the first month having operations, closest
// to the chosen month. To know if we have to search in the past or the
// in the future, we check if the chosen month is before or after the
// current month.
const findNearestMonth = (chosenMonth, currentMonth, availableMonths) => {
  const findBeforeChosenMonth = months => findLast(months, x => x < chosenMonth)
  const findAfterChosenMonth = months => find(months, x => x > chosenMonth)
  const findFns =
    chosenMonth < currentMonth
      ? [findBeforeChosenMonth, findAfterChosenMonth]
      : [findAfterChosenMonth, findBeforeChosenMonth]
  return multiFind(availableMonths, findFns)
}

class TransactionsPage extends Component {
  state = {
    fetching: false,
    limitMin: 0,
    limitMax: 10,
    infiniteScrollTop: false
  }

  async fetchTransactions() {
    this.setState({ fetching: true })
    try {
      await this.props.fetchTransactions()
    } finally {
      this.setState({
        fetching: false
      })
    }
  }

  componentDidMount() {
    this.fetchTransactions()
    this.props.fetchApps()
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

  getKonnectorSlugs = triggers => {
    return triggers
      .filter(trigger => trigger.worker === 'konnector')
      .map(trigger => trigger.message && trigger.message.konnector)
      .filter(Boolean)
  }

  handleChangeTopmostTransaction = transaction => {
    this.setState({
      currentMonth: getMonth(transaction.date)
    })
  }

  handleIncreaseLimitMax = () => {
    this.setState({
      limitMax: this.state.limitMax + 10
    })
  }

  handleDecreaseLimitMin = (amount = 10) => {
    const transactions = this.props.filteredTransactions
    let goal = Math.max(this.state.limitMin - amount, 0)

    // try not have a cut on the same day
    while (
      goal > 0 &&
      transactions[goal].date.slice(0, 10) ===
        transactions[goal - 1].date.slice(0, 10)
    ) {
      goal--
    }
    this.setState({
      limitMin: goal
    })
  }

  handleChangeMonth = month => {
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
        if (onIOS()) {
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

  checkToActivateTopInfiniteScroll = getScrollInfo => {
    const scrollInfo = getScrollInfo()
    if (scrollInfo.scroll > SCROLL_THRESOLD_TO_ACTIVATE_TOP_INFINITE_SCROLL) {
      this.setState({ infiniteScrollTop: true })
    }
  }

  render() {
    const {
      t,
      urls,
      router,
      triggers,
      filteringDoc,
      filteredAccounts,
      breakpoints: { isMobile }
    } = this.props
    let { filteredTransactions } = this.props

    if (this.state.fetching) {
      return <Loading loadingType="movements" />
    }

    let brandsWithoutTrigger = []
    if (!isPendingOrLoading(triggers)) {
      const slugs = this.getKonnectorSlugs(triggers.data)
      const isBrandKonnectorAbsent = brand =>
        !includes(slugs, brand.konnectorSlug)
      brandsWithoutTrigger = getBrands(isBrandKonnectorAbsent)
    }

    // filter by category TODO
    const subcategoryName = router.params.subcategoryName
    if (subcategoryName) {
      const categoryId = getCategoryIdFromName(subcategoryName)
      filteredTransactions = filteredTransactions.filter(
        transaction => getCategoryId(transaction) === categoryId
      )
    }

    // Create Breadcrumb
    let breadcrumbItems
    if (subcategoryName) {
      const categoryName = router.params.categoryName
      breadcrumbItems = [
        {
          name: t('Categories.title.general'),
          onClick: () => router.push('/categories')
        },
        {
          name: t(`Data.categories.${categoryName}`),
          onClick: () => router.push(`/categories/${categoryName}`)
        },
        {
          name: t(`Data.subcategories.${subcategoryName}`)
        }
      ]
    } else {
      breadcrumbItems = [{ name: t('Transactions.title') }]
    }

    const filteringOnAccount =
      filteringDoc && filteringDoc._type === ACCOUNT_DOCTYPE

    return (
      <div className={styles.TransactionPage}>
        {subcategoryName ? <BackButton /> : null}
        <div className={styles.TransactionPage__top}>
          <AccountSwitch small={subcategoryName !== undefined} />
          {isMobile && (
            <BarRight>
              <BarBalance accounts={filteredAccounts} />
            </BarRight>
          )}
          {!subcategoryName ? (
            <SelectDates
              value={this.state.currentMonth}
              onChange={this.handleChangeMonth}
            />
          ) : (
            <ConnectedSelectDates showFullYear />
          )}
          {!isMobile &&
            breadcrumbItems.length > 1 && (
              <Breadcrumb
                items={breadcrumbItems}
                className={styles.TransactionPage__Breadcrumb}
              />
            )}
          {filteredTransactions.length > 0 ? (
            !isMobile && (
              <TransactionTableHead
                mainColumnTitle={t(
                  subcategoryName
                    ? 'Categories.headers.movements'
                    : 'Transactions.header.description'
                )}
              />
            )
          ) : (
            <p>{t('Transactions.no-movements')}</p>
          )}
        </div>
        <div
          className={
            styles.TransactionPage__bottom + ' js-transactionPageBottom'
          }
        >
          {filteredTransactions.length > 0 && (
            <TransactionsWithSelection
              className={styles.TransactionPage__top}
              limitMin={this.state.limitMin}
              limitMax={this.state.limitMax}
              onReachTop={this.handleDecreaseLimitMin}
              onReachBottom={this.handleIncreaseLimitMax}
              infiniteScrollTop={this.state.infiniteScrollTop}
              onChangeTopMostTransaction={this.handleChangeTopmostTransaction}
              onScroll={this.checkToActivateTopInfiniteScroll}
              transactions={filteredTransactions}
              urls={urls}
              brands={brandsWithoutTrigger}
              filteringOnAccount={filteringOnAccount}
              manualLoadMore={onIOS()}
            />
          )}
        </div>
      </div>
    )
  }
}

const onSubcategory = ownProps => ownProps.router.params.subcategoryName
const mapStateToProps = (state, ownProps) => ({
  urls: {
    // this keys are used on Transactions.jsx to:
    // - find transaction label
    // - display appName in translate `Transactions.actions.app`
    MAIF: getAppUrlById(state, 'io.cozy.apps/maif'),
    HEALTH: getAppUrlById(state, 'io.cozy.apps/sante'),
    EDF: getAppUrlById(state, 'io.cozy.apps/edf'),
    COLLECT: getAppUrlById(state, 'io.cozy.apps/collect')
  },
  accountIds: getFilteredAccountIds(state),
  accounts: getCollection(state, 'accounts'),
  filteringDoc: state.filters.filteringDoc,
  filteredAccounts: getFilteredAccounts(state),
  filteredTransactions: (onSubcategory(ownProps)
    ? getFilteredTransactions
    : getTransactionsFilteredByAccount)(state).map(transaction =>
    hydrateTransaction(state, transaction)
  )
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  fetchApps: () => dispatch(fetchApps()),
  fetchTransactions: () => {
    const onFetch = () => {
      const subcategoryName = ownProps.router.params.subcategoryName
      if (subcategoryName) {
        return
      }
    }
    // We should use fetchTransactionsWithState
    // when https://github.com/cozy/cozy-drive/pull/800
    // has been merged, it would only fetch transactions
    // for the proper account(s) and period and thus would
    // be more performant
    return dispatch(fetchTransactions({}, onFetch))
  }
})

const mapDocumentsToProps = () => ({
  triggers: fetchCollection('triggers', TRIGGER_DOCTYPE)
})

export default compose(
  withRouter,
  withBreakpoints(),
  connect(mapStateToProps, mapDispatchToProps),
  cozyConnect(mapDocumentsToProps),
  translate()
)(TransactionsPage)
