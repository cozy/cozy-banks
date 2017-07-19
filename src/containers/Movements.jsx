import styles from 'styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import FigureBlock from 'components/FigureBlock'
import OperationsBoard from 'components/OperationsBoard'
import Loading from 'components/Loading.jsx'
import { SelectDates, getFilteredOperations } from 'ducks/filters'
import { fetchOperations, indexOperationsByDate } from 'actions'
import { getUrlBySource, findApps } from 'ducks/apps'

export class Movements extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true
    }

    const { fetchOperations, fetchApps } = this.props

    fetchOperations().then(
      this.setState({isFetching: false})
    )
    fetchApps()
  }

  render () {
    const { filteredOperations, urls } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='movements' />
    }
    let credits = 0
    let debits = 0
    filteredOperations.forEach((operation) => {
      if (operation.amount > 0) {
        credits += operation.amount
      } else {
        debits += operation.amount
      }
    })
    if (!filteredOperations.length) {
      return <div>
        <h2>Mouvements</h2>
        <div className={styles['bnk-mov-form']}>
          <SelectDates />
        </div>
        <p>Pas de mouvements à afficher.</p>
      </div>
    }
    return (
      <div>
        <h2>
          Mouvements
        </h2>
        <div className={styles['bnk-mov-form']}>
          <SelectDates />
        </div>
        <div className={styles['bnk-mov-figures']}>
          <FigureBlock label='Total' total={credits + debits} currency='€' coloredPositive coloredNegative signed />
          <FigureBlock label='Débit' total={debits} currency='€' signed />
          <FigureBlock label='Crédit' total={credits} currency='€' signed />
          <FigureBlock label='Opérations' total={filteredOperations.length} decimalNumbers={0} />
        </div>
        <OperationsBoard operations={filteredOperations} urls={urls} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  urls: {
    // this keys are used on Operation.jsx to:
    // - find operation label
    // - display appName in translate `Movements.actions.app`
    MAIF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
    EDF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf')
  },
  filteredOperations: getFilteredOperations(state)
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchApps: () => dispatch(findApps()),
  fetchOperations: async () => {
    const mangoIndex = await dispatch(indexOperationsByDate())
    return dispatch(fetchOperations(mangoIndex))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Movements))
