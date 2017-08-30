import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import Loading from 'components/Loading'
import { TopbarTitle, TopbarLeft } from 'ducks/commons/Topbar'
import { getFilteredOperations } from 'ducks/filters'
import { fetchOperations, indexOperationsByDate } from 'actions'

import { operationsByCategory, computeCategorieData } from './helpers'
import styles from './styles'
import Categories from './Categories'

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
      await this.props.fetchOperations()
    } finally {
      this.setState({isFetching: false})
    }
  }

  render ({t, categories}, {isFetching, withIncome, selectedCategory}) {
    // compute the filter to use
    if (!withIncome) {
      categories = categories.filter(category => (category.name !== 'income'))
    }
    return (
      <div>
        <TopbarTitle>
          <h2>{t('Categories.title.general')}</h2>
        </TopbarTitle>
        {selectedCategory && <TopbarLeft className={styles['bnk-cat-close']}>
          <button className={'coz-btn'} onClick={() => this.selectCategory(undefined)} />
        </TopbarLeft>}
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
  categories: computeCategorieData(operationsByCategory(getFilteredOperations(state)))
})

const mapDispatchToProps = dispatch => ({
  fetchOperations: async () => {
    const mangoIndex = await dispatch(indexOperationsByDate())
    return dispatch(fetchOperations(mangoIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(CategoriesPage))
