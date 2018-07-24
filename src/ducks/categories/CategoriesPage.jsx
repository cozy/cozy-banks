import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Loading from 'components/Loading'
import { getFilteredTransactions } from 'ducks/filters'
import { fetchTransactions, getTransactions } from 'actions'
import { transactionsByCategory, computeCategorieData } from './helpers'
import Categories from './Categories'
import styles from './CategoriesPage.styl'
import { flowRight as compose, sortBy } from 'lodash'
import CategoriesHeader from './CategoriesHeader'
import { queryConnect } from 'utils/client'
import {
  TRANSACTION_DOCTYPE,
  SETTINGS_DOCTYPE,
  ACCOUNT_DOCTYPE
} from 'doctypes'
import { isCollectionLoading } from 'utils/client'

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
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings.showIncomeCategory = checked

    dispatch(updateOrCreate(settings))
  }

  render() {
    const {
      t,
      categories: categoriesProps,
      transactions,
      router,
      settings
    } = this.props
    const isFetching =
      isCollectionLoading(transactions) || isCollectionLoading(settings)
    const { showIncomeCategory } = settings
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

    return (
      <div className={styles['bnk-cat-page']}>
        <CategoriesHeader
          breadcrumbItems={breadcrumbItems}
          selectedCategory={selectedCategory}
          withIncome={showIncomeCategory}
          onWithIncomeToggle={this.onWithIncomeToggle}
          categories={sortedCategories}
          selectCategory={this.selectCategory}
          isFetching={isFetching}
        />
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { transactions, accounts } = ownProps
  const enhancedState = {
    ...state,
    transactions,
    accounts
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
  queryConnect({
    accounts: {
      query: client => client.all(ACCOUNT_DOCTYPE),
      as: 'accounts'
    },
    transactions: {
      query: client => client.all(TRANSACTION_DOCTYPE),
      as: 'transactions'
    },
    settings: {
      query: client => client.all(SETTINGS_DOCTYPE),
      as: 'settings'
    }
  }),
  connect(mapStateToProps)
)(CategoriesPage)
