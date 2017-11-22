import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import Topbar from 'components/Topbar'
import { SelectDates, getFilteredTransactions } from 'ducks/filters'
import { fetchTransactions } from 'actions'
import { getAppUrlBySource, findApps } from 'ducks/apps'
import { flowRight as compose } from 'lodash'
import { cozyConnect } from 'cozy-client'
import { getCategoryId } from 'ducks/categories/categoriesMap'
import { Breadcrumb } from 'components/Breadcrumb'
import BackButton from 'components/BackButton'

import TransactionsWithSelection from './TransactionsWithSelection'
import styles from './TransactionsPage.styl'

const isPendingOrLoading = function (col) {
  return col.fetchStatus === 'pending' || col.fetchStatus === 'loading'
}

class TransactionsPage extends Component {
  componentDidMount () {
    this.props.fetchApps()
  }

  render () {
    const { t, urls, transactions, router } = this.props
    let { filteredTransactions } = this.props

    if (isPendingOrLoading(transactions)) {
      return <Loading loadingType='movements' />
    }

    // filter by category
    const subcategoryName = router.params.subcategoryName
    if (subcategoryName) {
      const categoryId = getCategoryId(subcategoryName)
      filteredTransactions = filteredTransactions.filter(transaction => transaction.categoryId === categoryId)
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

    // Create Breadcrumb
    let breadcrumbItems
    if (subcategoryName) {
      const categoryName = router.params.categoryName
      breadcrumbItems = [{
        name: t('Categories.title.general'),
        onClick: () => router.push('/categories')
      }, {
        name: t(`Data.categories.${categoryName}`),
        onClick: () => router.push(`/categories/${categoryName}`)
      }, {
        name: t(`Data.subcategories.${subcategoryName}`)
      }]
    } else {
      breadcrumbItems = [{name: t('Transactions.title')}]
    }

    const currency = filteredTransactions.length > 0 ? filteredTransactions[0].currency : null
    return (
      <div className={styles['bnk-mov-page']}>
        {subcategoryName ? <BackButton /> : null}
        <Topbar>
          <Breadcrumb items={breadcrumbItems} tag='h2' />
        </Topbar>
        <SelectDates />
        {filteredTransactions.length !== 0 && <div className={styles['bnk-mov-figures']}>
          <FigureBlock label={t('Transactions.total')} total={credits + debits} currency={currency} coloredPositive coloredNegative signed />
          <FigureBlock label={t('Transactions.transactions')} total={filteredTransactions.length} decimalNumbers={0} />
          <FigureBlock label={t('Transactions.debit')} total={debits} currency={currency} signed />
          <FigureBlock label={t('Transactions.credit')} total={credits} currency={currency} signed />
        </div>}
        {filteredTransactions.length === 0
          ? <p>{t('Transactions.no-movements')}</p>
          : <TransactionsWithSelection transactions={filteredTransactions} urls={urls} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urls: {
    // this keys are used on Transactions.jsx to:
    // - find transaction label
    // - display appName in translate `Transactions.actions.app`
    MAIF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
    HEALTH: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-sante'),
    EDF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf')
  },
  filteredTransactions: getFilteredTransactions(state)
})

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(findApps())
})

const mapDocumentsToProps = ownProps => ({
  transactions: fetchTransactions()
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  cozyConnect(mapDocumentsToProps),
  translate()
)(TransactionsPage)
