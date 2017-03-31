import styles from '../styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Select from '../components/Select'
import FigureBlock from '../components/FigureBlock'
import OperationsBoard from '../components/OperationsBoard'
import Loading from '../components/Loading.jsx'

import {
  fetchMovements
}
from '../actions'

const DATE_OPTIONS = ['Du 01 février au 24 février 2017']

export class Movements extends Component {
  constructor (props) {
    super(props)
    this.state = {isFetching: true}

    props.fetchMovements()
      .then((
        this.setState({isFetching: false})
      ))
  }

  render () {
    const { movements } = this.props
    let credits = 0
    let debits = 0
    movements.forEach((movement) => {
      if (movement.amount > 0) {
        credits += movement.amount
      } else {
        debits += movement.amount
      }
    })
    if (this.state.isFetching) {
      return <Loading loadingType='movements' />
    }
    if (!movements.length) {
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
          <FigureBlock label='Opérations' total={movements.length} decimalNumbers={0} />
        </div>
        <OperationsBoard movements={movements} />
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
)(translate()(Movements))
