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
import { flowRight as compose } from 'lodash'
import { withBreakpoints } from 'cozy-ui/react'
import CategoriesHeader from './CategoriesHeader'

class CategoriesPage extends Component {
  state = {
    withIncome: true
  }

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

  filterWithInCome = withIncome => {
    this.setState({ withIncome })
  }

  render({ t, categories, transactions, router }, { withIncome }) {
    const isFetching = transactions.fetchStatus !== 'loaded'
    const selectedCategoryName = router.params.categoryName
    // compute the filter to use
    if (!withIncome) {
      categories = categories.filter(category => category.name !== 'incomeCat')
    }
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
    return (
      <div className={styles['bnk-cat-page']}>
        <CategoriesHeader
          breadcrumbItems={breadcrumbItems}
          selectedCategory={selectedCategory}
          withIncome={withIncome}
          onWithIncomeToggle={this.filterWithInCome}
          categories={categories}
          selectCategory={this.selectCategory}
        />
        {isFetching ? (
          <Loading loadingType="categories" />
        ) : (
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            selectedCategoryName={selectedCategoryName}
            selectCategory={this.selectCategory}
            withIncome={withIncome}
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

export default compose(
  withRouter,
  withBreakpoints(),
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(CategoriesPage)
