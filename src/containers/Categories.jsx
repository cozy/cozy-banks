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

import { getCategoriesGroups } from '../reducers'

const DATE_OPTIONS = ['Du 01 mars au 31 mars 2017']

export class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {isFetching: true}

    props.fetchOperations()
      .then((
        this.setState({isFetching: false})
      ))
  }

  render () {
    const { t, operations } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='categories' />
    }
    if (!operations.length) {
      return <div><h2>Categorisation</h2><p>Pas de categories à afficher.</p></div>
    }
    const categories = getCategoriesGroups(operations)
    const pieDataObject = {labels: [], data: [], colors: []}
    categories.debits.forEach((category) => {
      pieDataObject.labels.push(t(`Data.categories.${category.name}`))
      pieDataObject.data.push((0 - category.amount).toFixed(2)) // use positive values
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
        </div>
        <h3 className={styles['bnk-cat-title']}>Dépenses</h3>
        <div className={styles['bnk-cat-debits']}>
          <CategoriesBoard
            categories={categories.debits}
            amountType='debit'
          />
          <div class={styles['bnk-cat-figure']}>
            <FigureBlock
              label='Dépense Totale'
              total={categories.totalDebits}
              currency={categories.currency}
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
        <h3 className={styles['bnk-cat-title']}>Revenus</h3>
        <div className={styles['bnk-cat-credits']}>
          <CategoriesBoard
            categories={categories.credits}
            amountType='credit'
          />
          <div class={styles['bnk-cat-figure']}>
            <FigureBlock
              label='Revenu Total'
              total={categories.totalCredits}
              currency={categories.currency}
              signed
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
