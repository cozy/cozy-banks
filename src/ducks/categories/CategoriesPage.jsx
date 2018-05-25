import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import Loading from 'components/Loading'
import { getFilteredTransactions } from 'ducks/filters'
import { fetchTransactions, getTransactions } from 'actions'
import { transactionsByCategory, computeCategorieData } from './helpers'
import Categories from './Categories'
import styles from './CategoriesPage.styl'
import { flowRight as compose, sortBy } from 'lodash'
import { withBreakpoints } from 'cozy-ui/react'
import CategoriesHeader from './CategoriesHeader'
import {
  getSettings,
  fetchSettingsCollection,
  updateSettings,
  createSettings
} from 'ducks/settings'
import { cozyConnect } from 'cozy-client'

class CategoriesPage extends Component {
  componentDidMount() {
    this.props.fetchTransactions()
  }

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
    const { settingsCollection, dispatch } = this.props
    const settings = getSettings(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings.showIncomeCategory = checked

    dispatch(updateOrCreate(settings))
  }

  render({
    t,
    categories: categoriesProps,
    transactions,
    router,
    settingsCollection
  }) {
    const isFetching = transactions.fetchStatus !== 'loaded'
    const { showIncomeCategory } = getSettings(settingsCollection)
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

const mapStateToProps = state => ({
  categories: computeCategorieData(
    transactionsByCategory(getFilteredTransactions(state))
  ),
  transactions: getTransactions(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => dispatch(fetchTransactions())
})

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default compose(
  withRouter,
  withBreakpoints(),
  connect(mapStateToProps, mapDispatchToProps),
  cozyConnect(mapDocumentsToProps),
  translate()
)(CategoriesPage)
