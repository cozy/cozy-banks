import React, { Component, Fragment, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import startOfMonth from 'date-fns/start_of_month'
import endOfMonth from 'date-fns/end_of_month'
import startOfYear from 'date-fns/start_of_year'
import endOfYear from 'date-fns/end_of_year'

import includes from 'lodash/includes'
import some from 'lodash/some'
import sortBy from 'lodash/sortBy'
import compose from 'lodash/flowRight'
import CategoriesHeader from 'ducks/categories/CategoriesHeader'
import {
  withClient,
  queryConnect,
  isQueryLoading,
  hasQueryBeenLoaded,
  useQuery
} from 'cozy-client'

import Loading from 'components/Loading'
import Padded from 'components/Padded'
import {
  resetFilterByDoc,
  addFilterByPeriod,
  getFilteringDoc,
  getPeriod
} from 'ducks/filters'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import Categories from 'ducks/categories/Categories'
import {
  accountsConn,
  settingsConn,
  makeFilteredTransactionsConn,
  groupsConn
} from 'doctypes'
import BarTheme from 'ducks/bar/BarTheme'
import { getCategoriesData } from 'ducks/categories/selectors'
import maxBy from 'lodash/maxBy'
import { getDate } from 'ducks/transactions/helpers'
import { trackPage } from 'ducks/tracking/browser'
import { UnpluggedTransactionsPage } from 'ducks/transactions'
import { onSubcategory } from './utils'
import Delayed from 'components/Delayed'

const isCategoryDataEmpty = categoryData => {
  return categoryData[0] && isNaN(categoryData[0].percentage)
}

const goToCategory = (router, selectedCategory, subcategory) => {
  if (subcategory) {
    router.push(`/analysis/categories/${selectedCategory}/${subcategory}`)
  } else if (selectedCategory) {
    router.push(`/analysis/categories/${selectedCategory}`)
  } else {
    router.push('/analysis/categories')
  }
}

export class CategoriesPage extends Component {
  componentDidMount() {
    const { filteringDoc, resetFilterByDoc } = this.props
    if (
      filteringDoc &&
      includes(['Reimbursements', 'health_reimbursements'], filteringDoc._id)
    ) {
      resetFilterByDoc()
    }
    this.checkToChangeFilter()
    this.trackPage()
  }

  trackPage() {
    const { router } = this.props
    const { categoryName, subcategoryName } = router.params
    trackPage(
      `analyse:${categoryName ? categoryName : 'home'}${
        subcategoryName ? `:details` : ''
      }`
    )
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.router.params
    const curParams = this.props.router.params
    // if (
    //   !prevProps.transactions.lastUpdate &&
    //   this.props.transactions.lastUpdate
    // ) {
    //   this.checkToChangeFilter()
    // }

    if (prevParams.categoryName !== curParams.categoryName) {
      this.trackPage()
    }
  }

  checkToChangeFilter() {
    // If we do not have any data to show, change the period filter
    // to the latest period available for the current account
    if (isCategoryDataEmpty(this.props.categories)) {
      const transactions = this.props.filteredTransactionsByAccount
      if (transactions && transactions.length > 0) {
        const maxDate = getDate(maxBy(transactions, getDate))
        this.props.addFilterByPeriod(maxDate.slice(0, 7))
      }
    }
  }

  onWithIncomeToggle = checked => {
    const { client } = this.props
    const settings = this.getSettings()

    settings.showIncomeCategory = checked

    client.save(settings)
  }

  getSettings = () => {
    const { settings: settingsCollection } = this.props

    return getDefaultedSettingsFromCollection(settingsCollection)
  }

  render() {
    const {
      categories: categoriesProps,
      transactions,
      router,
      accounts,
      settings
    } = this.props
    const isFetching = some(
      [accounts, transactions, settings],
      col => isQueryLoading(col) && !hasQueryBeenLoaded(col)
    )
    const { showIncomeCategory } = this.getSettings()
    const categories = showIncomeCategory
      ? categoriesProps
      : categoriesProps.filter(category => category.name !== 'incomeCat')

    const categoryName = router.params.categoryName
    const subcategoryName = router.params.subcategoryName

    const selectedCategory = categories.find(
      category => category.name === categoryName
    )

    const sortedCategories = sortBy(categories, cat =>
      Math.abs(cat.amount)
    ).reverse()
    const hasAccount = accounts.data && accounts.data.length > 0

    const isSubcategory = onSubcategory(router.params)

    return (
      <Fragment>
        <BarTheme theme="primary" />
        <CategoriesHeader
          categoryName={categoryName}
          subcategoryName={subcategoryName}
          selectedCategory={selectedCategory}
          withIncome={showIncomeCategory}
          onWithIncomeToggle={this.onWithIncomeToggle}
          categories={sortedCategories}
          isFetching={isFetching}
          hasAccount={hasAccount}
          chart={!isSubcategory}
        />
        <Delayed delay={this.props.delayContent}>
          {hasAccount &&
            (isFetching ? (
              <Padded className="u-pt-0">
                <Loading loadingType="categories" />
              </Padded>
            ) : !isSubcategory ? (
              <Categories
                categories={sortedCategories}
                selectedCategory={selectedCategory}
                selectedCategoryName={categoryName}
                selectCategory={(selectedCategory, subcategory) =>
                  goToCategory(router, selectedCategory, subcategory)
                }
                withIncome={showIncomeCategory}
                filterWithInCome={this.filterWithInCome}
              />
            ) : (
              <UnpluggedTransactionsPage
                className="u-pt-0"
                showFutureBalance={false}
                showTriggerErrors={false}
                showBackButton
                showHeader={false}
              />
            ))}
        </Delayed>
      </Fragment>
    )
  }
}

CategoriesPage.defaultProps = {
  delayContent: 0
}

const autoUpdateOptions = {
  add: false,
  remove: true,
  update: true
}

const addPeriodToConn = (baseConn, period) => {
  const { query: baseQuery, as: baseAs, ...rest } = baseConn
  const d = new Date(period)
  const startDate = period.length === 7 ? startOfMonth(d) : startOfYear(d)
  const endDate = period.length === 7 ? endOfMonth(d) : endOfYear(d)
  const query = baseQuery()
    .where({ date: { $lt: endDate, $gt: startDate } }, { merge: true })
    .indexFields(['date', 'account'])
    .sortBy([{ date: 'desc' }, { account: 'desc' }])
  const as = `${baseAs}-${period}-only`
  return {
    query,
    as,
    autoUpdate: autoUpdateOptions,
    ...rest
  }
}

/**
 * Will run fetchMore on the query until the query is fully loaded
 */
const useFullyLoadedQuery = (query, options) => {
  const res = useQuery(query, options)
  useEffect(() => {
    if (res.fetchStatus === 'loaded' && res.hasMore) {
      res.fetchMore()
    }
  }, [res.fetchStatus, res.fetchMore, res])
  return res
}

const setAutoUpdate = conn => ({ ...conn, autoUpdate: autoUpdateOptions })

const addTransactions = Component => props => {
  const initialConn = makeFilteredTransactionsConn(props)
  const conn = useMemo(() => {
    return props.period
      ? addPeriodToConn(initialConn, props.period)
      : setAutoUpdate(initialConn)
  }, [initialConn, props.period])
  const transactions = useFullyLoadedQuery(conn.query, conn)
  return (
    <Component
      {...props}
      transactions={transactions}
      filteredTransactionsByAccount={transactions.data}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  resetFilterByDoc: () => dispatch(resetFilterByDoc()),
  addFilterByPeriod: period => dispatch(addFilterByPeriod(period))
})

const mapStateToProps = (state, ownProps) => {
  return {
    categories: getCategoriesData(state, ownProps),
    filteringDoc: getFilteringDoc(state),
    period: getPeriod(state)
  }
}

export default compose(
  withRouter,
  withClient,
  queryConnect({
    accounts: accountsConn,
    settings: settingsConn,
    groups: groupsConn
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  addTransactions
)(CategoriesPage)
