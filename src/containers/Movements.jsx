import styles from 'styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'lib/I18n'

import Select from 'components/Select'
import FigureBlock from 'components/FigureBlock'
import OperationsBoard from 'components/OperationsBoard'
import Loading from 'components/Loading.jsx'

import {
  fetchOperations,
  indexOperationsByDate
}
from 'actions'

import { getFilteredOperations } from 'selectors'

const DATE_OPTIONS = ['Du 01 mars au 31 mars 2017']

export class Movements extends Component {
  constructor (props) {
    super(props)
    this.state = {isFetching: true}

    props.fetchOperations()
      .then((
        this.setState({isFetching: false})
      ))
  }

  render () {
    const { operations } = this.props
    let credits = 0
    let debits = 0
    operations.forEach((operation) => {
      if (operation.amount > 0) {
        credits += operation.amount
      } else {
        debits += operation.amount
      }
    })
    if (this.state.isFetching) {
      return <Loading loadingType='movements' />
    }
    if (!operations.length) {
      return <div><h2>Mouvements</h2><p>Pas de mouvements à afficher.</p></div>
    }
    return (
      <div>
        <h2>
          Mouvements
        </h2>
        <div className={styles['bnk-mov-form']}>
          <Select name='dateRange' options={DATE_OPTIONS} onChange={() => {}} />
        </div>
        <div className={styles['bnk-mov-figures']}>
          <FigureBlock label='Total' total={credits + debits} currency='€' coloredPositive coloredNegative signed />
          <FigureBlock label='Débit' total={debits} currency='€' signed />
          <FigureBlock label='Crédit' total={credits} currency='€' signed />
          <FigureBlock label='Opérations' total={operations.length} decimalNumbers={0} />
        </div>
        <OperationsBoard operations={operations} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  operations: getFilteredOperations(state)
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
)(translate()(Movements))
