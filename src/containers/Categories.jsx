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
  fetchMovements
}
from '../actions'

import { getCategoriesGroupBy } from '../reducers'

const DATE_OPTIONS = ['Du 01 février au 24 février 2017']

export class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {isFetching: true}

    props.fetchMovements()
      .then((
        this.setState({isFetching: false})
      ))
  }

  render () {
    const { t, movements } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='categories' />
    }
    if (!movements.length) {
      return <div><h2>Categorisation</h2><p>Pas de categories à afficher.</p></div>
    }
    const categories = getCategoriesGroupBy(movements)
    const pieDataObject = {labels: [], data: [], colors: []}
    categories.debits.forEach((category) => {
      pieDataObject.labels.push(t(`Category.${category.name}`))
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
        <div className={styles['bnk-cat-debits']}>
          <CategoriesBoard
            categories={categories.debits}
            title='Dépenses'
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
        <div className={styles['bnk-cat-credits']}>
          <CategoriesBoard
            categories={categories.credits}
            title='Revenus'
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
  movements: state.movements
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMovements: () => {
    return dispatch(fetchMovements())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Categories))
