import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import Loading from 'components/Loading'
import { TopbarTitle } from 'ducks/commons/Topbar'
import { getFilteredTransactions } from 'ducks/filters'
import { fetchTransactions, indexTransactionsByDate } from 'actions'
import { transactionsByCategory, computeCategorieData } from './helpers'
import Categories from './Categories'
import BackButton from 'components/BackButton'
import styles from './CategoriesPage.styl'
import { flowRight as compose } from 'lodash'

class CategoriesPage extends Component {
  state = {
    isFetching: this.props.categories.length === 0,
    withIncome: true,
    selectedCategory: undefined
  }

  selectCategory = selectedCategory => {
    this.setState({selectedCategory})
  }

  filterWithInCome = withIncome => {
    this.setState({withIncome})
  }

  async componentDidMount () {
    try {
      await this.props.fetchTransactions()
    } finally {
      this.setState({isFetching: false})
    }
  }

  render ({t, categories}, {isFetching, withIncome, selectedCategory}) {
    // compute the filter to use
    if (!withIncome) {
      categories = categories.filter(category => (category.name !== 'incomeCat'))
    }
    return (
      <div className={styles['bnk-cat-page']}>
        <TopbarTitle>
          <h2>{t('Categories.title.general')}</h2>
        </TopbarTitle>
        {selectedCategory && <BackButton onClick={() => this.selectCategory(undefined)} />}
        {isFetching
          ? <Loading loadingType='categories' />
          : <Categories categories={categories}
            selectedCategory={selectedCategory} selectCategory={this.selectCategory}
            withIncome={withIncome} filterWithInCome={this.filterWithInCome} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: computeCategorieData(transactionsByCategory(getFilteredTransactions(state)))
})

const mapDispatchToProps = dispatch => ({
  fetchTransactions: async () => {
    const mangoIndex = await dispatch(indexTransactionsByDate())
    await dispatch(fetchTransactions(mangoIndex))
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(CategoriesPage)
