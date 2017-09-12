import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import { Topbar } from 'ducks/commons'
import { SelectDates, getFilteredOperations } from 'ducks/filters'
import { fetchOperations, indexOperationsByDate } from 'actions'
import { getUrlBySource, findApps } from 'ducks/apps'

import OperationsWithSelection from './OperationsWithSelection'
import styles from './OperationsPage.styl'

class OperationsPage extends Component {
  state = {
    isFetching: this.props.filteredOperations.length === 0
  }

  async componentDidMount () {
    try {
      await this.props.fetchOperations()
    } finally {
      this.setState({isFetching: false})
    }
    this.props.fetchApps()
  }

  render () {
    const { t, filteredOperations, urls } = this.props
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
    return (
      <div>
        <Topbar>
          <h2>{t('Movements.title')}</h2>
        </Topbar>
        <SelectDates />
        {filteredOperations.length !== 0 && <div className={styles['bnk-mov-figures']}>
          <FigureBlock label={t('Movements.total')} total={credits + debits} currency='€' coloredPositive coloredNegative signed />
          <FigureBlock label={t('Movements.operations')} total={filteredOperations.length} decimalNumbers={0} />
          <FigureBlock label={t('Movements.debit')} total={debits} currency='€' signed />
          <FigureBlock label={t('Movements.credit')} total={credits} currency='€' signed />
        </div>}
        {filteredOperations.length === 0
          ? <p>{t('Movements.no-movements')}</p>
          : <OperationsWithSelection operations={filteredOperations} urls={urls} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urls: {
    // this keys are used on Operations.jsx to:
    // - find operation label
    // - display appName in translate `Movements.actions.app`
    MAIF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
    HEALTH: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-sante'),
    EDF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf')
  },
  filteredOperations: getFilteredOperations(state)
})

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(findApps()),
  fetchOperations: async () => {
    const mangoIndex = await dispatch(indexOperationsByDate())
    await dispatch(fetchOperations(mangoIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(OperationsPage))
