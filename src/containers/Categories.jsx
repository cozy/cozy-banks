import styles from '../styles/categories'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'
import categoriesMap from '../lib/categoriesMap'

import Select from '../components/Select'
import FigureBlock from '../components/FigureBlock'
import CategoriesBoard from '../components/CategoriesBoard'
import Loading from '../components/Loading'
import PieChart from '../components/PieChart'

import {
  fetchOperations,
  indexOperationsByDate
}
from '../actions'

import { getFilteredOperations } from '../selectors'

const TOTAL_FILTER = 'total'
const DEBIT_FILTER = 'debit'
const INCOME_CATEGORY = 'income'
const FILTERS = [TOTAL_FILTER, DEBIT_FILTER]
const DATE_OPTIONS = ['Du 01 mars au 31 mars 2017']

// This function builds a map of categories and sub-categories, each containing a list of related operations, a name and a color
const operationsByCategory = (operations) => {
  let categories = {}

  operations.forEach(operation => {
    // Creates a map of categories, where each entry contains a list of related operations and a breakdown by sub-category
    let category = categoriesMap.get(operation.category) || categoriesMap.get('uncategorized_others')

    // create a new parent category if necessary
    if (!categories.hasOwnProperty(category.name)) {
      categories[category.name] = {
        name: category.name,
        color: category.color,
        operations: [],
        subcategories: {}
      }
    }

    // create the subcategory if necessary
    if (!categories[category.name].subcategories.hasOwnProperty(operation.category)) {
      categories[category.name].subcategories[operation.category] = {
        name: operation.category,
        operations: []
      }
    }

    categories[category.name].operations.push(operation)
    categories[category.name].subcategories[operation.category].operations.push(operation)
  })

  return categories
}

// Very specific to this component: takes the operations by category as returned by the `operationsByCategory` function, and turns it into a flat array, while computing derived data such as totals and curencies.
// The result is used pretty much as is down the chain by other components, so changing property names here should be done with care.
const computeCategorieData = (operationsByCategory) => {
  return Object.values(operationsByCategory).map(category => {
    let subcategories = Object.values(category.subcategories).map(subcategory => {
      const debit = subcategory.operations.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
      const credit = subcategory.operations.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

      return {
        name: subcategory.name,
        amount: credit + debit,
        debit: debit,
        credit: credit,
        percentage: 0,
        currency: subcategory.operations[0].currency,
        operationsNumber: subcategory.operations.length
      }
    })

    const debit = category.operations.reduce((total, op) => (op.amount < 0 ? total + op.amount : total), 0)
    const credit = category.operations.reduce((total, op) => (op.amount > 0 ? total + op.amount : total), 0)

    return {
      name: category.name,
      color: category.color,
      amount: credit + debit,
      debit: debit,
      credit: credit,
      percentage: 0,
      currency: category.operations[0].currency,
      operationsNumber: category.operations.length,
      subcategories: subcategories
    }
  })
}

export class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      filter: FILTERS[0]
    }

    props.fetchOperations()
      .then((
        this.setState({isFetching: false})
      ))
  }

  applyFilter (selectName, filterLabel, filterIndex) {
    this.setState({filter: FILTERS[filterIndex]})
  }

  render () {
    const { t, categories } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='categories' />
    }
    if (categories.length === 0) {
      return <div><h2>Categorisation</h2><p>Pas de categories à afficher.</p></div>
    }
    // compute the filter to use
    const { filter } = this.state
    const FILTER_OPTIONS = FILTERS.map(filter => (t(`Categories.filter.${filter}`)))
    const shouldFilterIncome = filter === DEBIT_FILTER

    let filteredCategories = categories

    if (shouldFilterIncome) filteredCategories = filteredCategories.filter(category => (category.name !== INCOME_CATEGORY))

    // compute some global data
    const absoluteOperationsTotal = filteredCategories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
    const globalCurrency = filteredCategories[0].currency
    let operationsTotal = 0

    filteredCategories.forEach(category => {
      category.percentage = Math.round(Math.abs(category.amount) / absoluteOperationsTotal * 100)

      category.subcategories.forEach(subcategory => {
        subcategory.percentage = Math.round(Math.abs(subcategory.amount) / absoluteOperationsTotal * 100)
      })

      operationsTotal += category.amount
    })

    // sort the categories for display
    filteredCategories = filteredCategories.sort((a, b) => (b.percentage - a.percentage))

    // configure the pie chart
    const pieDataObject = {labels: [], data: [], colors: []}
    filteredCategories.forEach((category) => {
      pieDataObject.labels.push(t(`Data.categories.${category.name}`))
      pieDataObject.data.push(Math.abs(category.amount).toFixed(2)) // use positive values
      pieDataObject.colors.push(category.color)
    })
    return (
      <div>
        <h2>
          Catégorisation
        </h2>
        <div className={styles['bnk-cat-form']}>
          <Select
            name='dateRange'
            options={DATE_OPTIONS}
            onChange={() => {}}
          />
          <Select
            name='filterRange'
            options={FILTER_OPTIONS}
            onChange={this.applyFilter.bind(this)}
          />
        </div>

        <div className={styles['bnk-cat-debits']}>
          <CategoriesBoard
            categories={filteredCategories}
          />
          <div class={styles['bnk-cat-figure']}>
            <FigureBlock
              label={t(`Categories.title.${filter}`)}
              total={operationsTotal}
              currency={globalCurrency}
            />
            <PieChart
              labels={pieDataObject.labels}
              data={pieDataObject.data}
              colors={pieDataObject.colors}
              className='bnk-cat-debits-pie'
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: computeCategorieData(operationsByCategory(getFilteredOperations(state)))
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchOperations: async () => {
    const mangoIndex = await dispatch(indexOperationsByDate())
    return dispatch(fetchOperations(mangoIndex))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Categories))
