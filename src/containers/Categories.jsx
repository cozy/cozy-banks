import styles from '../styles/categories'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

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

import { groupOperationsByCategory } from '../reducers'

const FILTERS = ['net', 'debit', 'credit']

const DATE_OPTIONS = ['Du 01 mars au 31 mars 2017']

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

  applyFilter(selectName, filterLabel, filterIndex){
    this.setState({filter: FILTERS[filterIndex]})
  }

  render () {
    const { t, operations } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='categories' />
    }
    if (!operations.length) {
      return <div><h2>Categorisation</h2><p>Pas de categories à afficher.</p></div>
    }
    const FILTER_OPTIONS = FILTERS.map(filter => (t(`Categories.filter.${filter}`)))
    const { filter } = this.state
    const includeDebits = filter !== 'credit'
    const includeCredits = filter !== 'debit'
    const operationsByCategories = groupOperationsByCategory(operations, includeCredits, includeDebits)

    let categories = operationsByCategories.map(category => {
      let subcategories = Object.values(category.subcategories).map(subcategory => {
        return {
          name: subcategory.name,
          amount: subcategory.operations.reduce((total, op) => (total + op.amount), 0),
          percentage: 0,
          currency: subcategory.operations[0].currency,
          operationsNumber: subcategory.operations.length,
        }
      })

      return {
        name: category.name,
        color: category.color,
        amount: category.operations.reduce((total, op) => (total + op.amount), 0),
        percentage: 0,
        currency: category.operations[0].currency,
        operationsNumber: category.operations.length,
        subcategories: subcategories
      }
    })

    const absoluteOperationsTotal = categories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
    let operationsTotal = 0
    const globalCurrency = operationsByCategories[0].operations[0].currency

    categories.forEach(category => {
      category.percentage = Math.round(Math.abs(category.amount) / absoluteOperationsTotal * 100)

      category.subcategories.forEach(subcategory => {
        subcategory.percentage = Math.round(Math.abs(subcategory.amount) / absoluteOperationsTotal * 100)
      })

      operationsTotal += category.amount
    })

    categories = categories.sort((a, b) => (b.percentage - a.percentage))

    const pieDataObject = {labels: [], data: [], colors: []}
    categories.forEach((category) => {
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

        <h3 className={styles['bnk-cat-title']}>Total</h3>
        <div className={styles['bnk-cat-debits']}>
          <CategoriesBoard
            categories={categories}
            amountType={filter}
          />
          <div class={styles['bnk-cat-figure']}>
            <FigureBlock
              label='Total'
              total={operationsTotal}
              currency={globalCurrency}
              signed
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
  operations: state.operations
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
