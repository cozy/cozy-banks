import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import { Topbar } from 'ducks/commons'
import { SelectDates, getFilteredTransactions } from 'ducks/filters'
import { fetchTransactions, indexTransactionsByDate } from 'actions'
import { getUrlBySource, findApps } from 'ducks/apps'

import TransactionsWithSelection from './TransactionsWithSelection'
import styles from './TransactionsPage.styl'

class TransactionsPage extends Component {
  state = {
    isFetching: this.props.filteredTransactions.length === 0
  }

  async componentDidMount () {
    try {
      await this.props.fetchTransactions()
    } finally {
      this.setState({isFetching: false})
    }
    this.props.fetchApps()
  }

  render () {
    const { t, filteredTransactions, urls } = this.props
    if (this.state.isFetching) {
      return <Loading loadingType='movements' />
    }
    let credits = 0
    let debits = 0
    filteredTransactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        credits += transaction.amount
      } else {
        debits += transaction.amount
      }
    })
    return (
      <div className={styles['bnk-mov-page']}>
        <Topbar>
          <h2>{t('Movements.title')}</h2>
        </Topbar>
        <SelectDates />
        {filteredTransactions.length !== 0 && <div className={styles['bnk-mov-figures']}>
          <FigureBlock label={t('Movements.total')} total={credits + debits} currency='€' coloredPositive coloredNegative signed />
          <FigureBlock label={t('Movements.transactions')} total={filteredTransactions.length} decimalNumbers={0} />
          <FigureBlock label={t('Movements.debit')} total={debits} currency='€' signed />
          <FigureBlock label={t('Movements.credit')} total={credits} currency='€' signed />
        </div>}
        {filteredTransactions.length === 0
          ? <p>{t('Movements.no-movements')}</p>
          : <TransactionsWithSelection transactions={filteredTransactions} urls={urls} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urls: {
    // this keys are used on Transactions.jsx to:
    // - find transaction label
    // - display appName in translate `Movements.actions.app`
    MAIF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
    HEALTH: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-sante'),
    EDF: getUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf')
  },
  filteredTransactions: getFilteredTransactions(state)
})

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(findApps()),
  fetchTransactions: async () => {
    const mangoIndex = await dispatch(indexTransactionsByDate())
    await dispatch(fetchTransactions(mangoIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionsPage))
