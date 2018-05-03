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
  uniq,
  maxBy
} from 'lodash'
import { getCollection, cozyConnect, fetchCollection } from 'cozy-client'
import { getFilteredAccounts } from 'ducks/filters'
import BarBalance from 'components/BarBalance'
import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/react'

import {
  SelectDates,
  getTransactionsFilteredByAccount,
  getFilteredAccountIds
} from 'ducks/filters'
import { fetchTransactions } from 'actions/transactions'
import { getAppUrlBySource, fetchApps } from 'ducks/apps'
import { getCategoryIdFromName } from 'ducks/categories/categoriesMap'
import { getCategoryId } from 'ducks/categories/helpers'

import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import { Breadcrumb } from 'components/Breadcrumb'
import BackButton from 'components/BackButton'

import { hydrateTransaction } from 'documents/transaction'
import { TransactionTableHead, TransactionsWithSelection } from './Transactions'
import styles from './TransactionsPage.styl'
import { TRIGGER_DOCTYPE, ACCOUNT_DOCTYPE } from 'doctypes'
import { getBrands } from 'ducks/brandDictionary'
import { AccountSwitch } from 'ducks/account'

const { BarRight } = cozy.bar

const isPendingOrLoading = function(col) {
  return col.fetchStatus === 'pending' || col.fetchStatus === 'loading'
}

const KPIs = ({ transactions }, { t }) => {
  let credits = 0
  let debits = 0
  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      credits += transaction.amount
    } else {
      debits += transaction.amount
    }
  })
  const currency = transactions.length > 0 ? transactions[0].currency : null
  return (
    <div className={styles['bnk-mov-figures']}>
      <FigureBlock
        label={t('Transactions.total')}
        total={credits + debits}
        currency={currency}
        coloredPositive
        coloredNegative
        signed
      />
      <FigureBlock
        label={t('Transactions.transactions')}
        total={transactions.length}
      />
      <FigureBlock
        label={t('Transactions.debit')}
        total={debits}
        currency={currency}
        signed
      />
      <FigureBlock
        label={t('Transactions.credit')}
        total={credits}
        currency={currency}
        signed
      />
    </div>
  )
}

const Separator = () => (
  <hr style={{ fontSize: 0, border: 0, height: '0.5rem' }} />
)

const SCROLL_THRESOLD_TO_ACTIVATE_TOP_INFINITE_SCROLL = 150
const getMonth = date => date.slice(0, 7)

class TransactionsPage extends Component {
  state = {
    fetching: false,
    limitMin: 0,
    limitMax: 5,
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

  handleDecreaseLimitMin = () => {
    this.setState({
      limitMin: Math.max(this.state.limitMin - 5, 0)
    })
  }

  handleChangeMonth = month => {
    const transactions = this.props.filteredTransactions
    const findMonthIndex = month =>
      findIndex(transactions, t => t.date.indexOf(month) === 0)
    let limitMin = findMonthIndex(month)

    if (limitMin == -1) {
      /* The goal here is to find the first month having operations, closest
         to the chosen month. To know if we have to search in the past or the
         in the future, we check if the chosen month is before or after the
         current month.
      */
      const monthsWithOperations = uniq(transactions.map(x => getMonth(x.date)))
        .sort()
        .reverse()
      const beforeChosenMonth = x => x < month
      const afterChosenMonth = x => x > month
      const inRightDirection =
        month < this.state.currentMonth ? beforeChosenMonth : afterChosenMonth
      const found = find(monthsWithOperations, inRightDirection)
      if (found) {
        month = found
      } else {
        return
      }
      limitMin = findMonthIndex(month)
    }
    this.setState({
      limitMin: limitMin,
      limitMax: limitMin + 5,
      currentMonth: month,
      infiniteScrollTop: false
    })
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
          {!isMobile ? <Breadcrumb items={breadcrumbItems} /> : null}
          <AccountSwitch />
          {isMobile ? (
            <BarRight>
              <BarBalance accounts={filteredAccounts} />
            </BarRight>
          ) : null}
          {filteredTransactions.length !== 0 && subcategoryName ? (
            <KPIs transactions={filteredTransactions} />
          ) : (
            <Separator />
          )}
          <SelectDates
            period={this.state.currentMonth}
            onChange={this.handleChangeMonth}
          />
          {filteredTransactions.length > 0 ? (
            !isMobile ? (
              <TransactionTableHead />
            ) : null
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
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urls: {
    // this keys are used on Transactions.jsx to:
    // - find transaction label
    // - display appName in translate `Transactions.actions.app`
    MAIF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
    HEALTH: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-sante'),
    EDF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf'),
    COLLECT: getAppUrlBySource(state, 'github.com/cozy/cozy-collect')
  },
  accountIds: getFilteredAccountIds(state),
  accounts: getCollection(state, 'accounts'),
  filteringDoc: state.filters.filteringDoc,
  filteredAccounts: getFilteredAccounts(state),
  filteredTransactions: getTransactionsFilteredByAccount(state).map(
    transaction => hydrateTransaction(state, transaction)
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
