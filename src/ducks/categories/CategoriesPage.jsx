import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Loading from 'components/Loading'
import { getFilteredTransactions } from 'ducks/filters'
import { transactionsByCategory, computeCategorieData } from './helpers'
import Categories from './Categories'
import styles from './CategoriesPage.styl'
import { flowRight as compose, sortBy } from 'lodash'
import CategoriesHeader from './CategoriesHeader'
import { queryConnect } from 'utils/client'
import {
  accountsConn,
  settingsConn,
  transactionsConn,
  groupsConn
} from 'doctypes'
import { isCollectionLoading, withCrud } from 'utils/client'

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
    const { settings, saveDocument } = this.props

    settings.data[0].showIncomeCategory = checked

    saveDocument(settings.data[0])
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
    const { showIncomeCategory } = (settings.data && settings.data[0]) || false
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
  queryConnect({
    accounts: accountsConn,
    transactions: transactionsConn,
    settings: settingsConn,
    groups: groupsConn
  }),
  withCrud,
  connect(mapStateToProps)
)(CategoriesPage)
