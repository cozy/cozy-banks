import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Loading from 'components/Loading'
import { Padded } from 'components/Spacing'
import { getFilteredTransactions } from 'ducks/filters'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { transactionsByCategory, computeCategorieData } from './helpers'
import Categories from 'ducks/categories/Categories'
import { flowRight as compose, sortBy, some } from 'lodash'
import CategoriesHeader from 'ducks/categories/CategoriesHeader'
import { queryConnect } from 'cozy-client'
import { withMutations } from 'cozy-client'
import {
  accountsConn,
  settingsConn,
  transactionsConn,
  groupsConn
} from 'doctypes'
import { isCollectionLoading } from 'ducks/client/utils'
import BarTheme from 'ducks/mobile/BarTheme'
import flag from 'cozy-flags'

const barTheme = flag('categories-header-primary') ? 'primary' : 'default'

class CategoriesPage extends Component {
  selectCategory = (selectedCategory, subcategory) => {
    if (subcategory) {
      this.props.router.push(`/categories/${selectedCategory}/${subcategory}`)
    } else if (selectedCategory) {
      this.props.router.push(`/categories/${selectedCategory}`)
    } else {
      this.props.router.push('/categories')
    }
  }

  onWithIncomeToggle = checked => {
    const { saveDocument } = this.props
    const settings = this.getSettings()

    settings.showIncomeCategory = checked

    saveDocument(settings)
  }

  getSettings = () => {
    const { settings: settingsCollection } = this.props

    return getDefaultedSettingsFromCollection(settingsCollection)
  }

  render() {
    const {
      t,
      categories: categoriesProps,
      transactions,
      router,
      accounts,
      settings
    } = this.props
    const isFetching = some(
      [accounts, transactions, settings],
      isCollectionLoading
    )
    const { showIncomeCategory } = this.getSettings()
    const selectedCategoryName = router.params.categoryName
    const categories = showIncomeCategory
      ? categoriesProps
      : categoriesProps.filter(category => category.name !== 'incomeCat')
    const breadcrumbItems = [{ name: t('Categories.title.general') }]
    if (selectedCategoryName) {
      breadcrumbItems[0].onClick = () => router.push('/categories')
      breadcrumbItems.push({
        name: t(`Data.categories.${selectedCategoryName}`)
      })
    }
    const selectedCategory = categories.find(
      category => category.name === selectedCategoryName
    )

    const sortedCategories = sortBy(categories, cat =>
      Math.abs(cat.amount)
    ).reverse()
    const hasAccount = accounts.data.length > 0

    return (
      <Fragment>
        <BarTheme theme={barTheme} />
        <CategoriesHeader
          breadcrumbItems={breadcrumbItems}
          selectedCategory={selectedCategory}
          withIncome={showIncomeCategory}
          onWithIncomeToggle={this.onWithIncomeToggle}
          categories={sortedCategories}
          isFetching={isFetching}
          hasAccount={hasAccount}
        />
        {hasAccount && (
          <Padded className="u-pt-0">
            {isFetching ? (
              <Loading loadingType="categories" />
            ) : (
              <Categories
                categories={sortedCategories}
                selectedCategory={selectedCategory}
                selectedCategoryName={selectedCategoryName}
                selectCategory={this.selectCategory}
                withIncome={showIncomeCategory}
                filterWithInCome={this.filterWithInCome}
              />
            )}
          </Padded>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { transactions, accounts, groups } = ownProps
  const enhancedState = {
    ...state,
    transactions,
    accounts,
    groups
  }

  const filteredTransactions = getFilteredTransactions(enhancedState)
  return {
    categories: computeCategorieData(
      transactionsByCategory(filteredTransactions)
    )
  }
}

export default compose(
  withRouter,
  withBreakpoints(),
  translate(),
  withMutations(),
  queryConnect({
    accounts: accountsConn,
    transactions: transactionsConn,
    settings: settingsConn,
    groups: groupsConn
  }),
  connect(mapStateToProps)
)(CategoriesPage)
