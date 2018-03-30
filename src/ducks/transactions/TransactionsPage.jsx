import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { flowRight as compose, isEqual, includes } from 'lodash'

import { translate } from 'cozy-ui/react/I18n'

import {
  SelectDates,
  getFilteredTransactions,
  addFilterForMostRecentTransactions,
  getFilteredAccountIds
} from 'ducks/filters'
import { fetchTransactions } from 'actions/transactions'
import { getAppUrlBySource, fetchApps } from 'ducks/apps'
import { getCategoryIdFromName } from 'ducks/categories/categoriesMap'
import { getCategoryId } from 'ducks/categories/helpers'

import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import Topbar from 'components/Topbar'
import { Breadcrumb } from 'components/Breadcrumb'
import BackButton from 'components/BackButton'

import { hydrateTransaction } from 'documents/transaction'
import TransactionsWithSelection from './TransactionsWithSelection'
import styles from './TransactionsPage.styl'
import { TRIGGER_DOCTYPE, ACCOUNT_DOCTYPE, TRANSACTION_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { getBrands } from 'ducks/brandDictionary'
import { queryConnect } from 'utils/client-compat'

const isPendingOrLoading = function (col) {
  return col.fetchStatus === 'pending' || col.fetchStatus === 'loading'
}

class TransactionsPage extends Component {
  componentDidMount () {
    this.props.fetchApps()
  }

  componentDidUpdate (prevProps) {
    if (
      !isEqual(this.props.accountIds, prevProps.accountIds)) {
      this.props.dispatch(addFilterForMostRecentTransactions())
    }

    if (this.props.transactions.data && !this.hasDispatchedMostRecent) {
      this.hasDispatchedMostRecent = true
      this.props.dispatch(addFilterForMostRecentTransactions())
    }
  }

  getKonnectorSlugs = triggers => {
    return triggers
      .filter(trigger => trigger.worker === 'konnector')
      .map(trigger => trigger.message && trigger.message.konnector)
      .filter(Boolean)
  }

  render () {
    const { t, urls, router, triggers } = this.props
    let { filteredTransactions } = this.props

    if (isPendingOrLoading(this.props.transactions)) {
      return <Loading loadingType='movements' />
    }

    let brandsWithoutTrigger = []
    if (!isPendingOrLoading(triggers)) {
      const slugs = this.getKonnectorSlugs(triggers.data)
      const isBrandKonnectorAbsent = brand => !includes(slugs, brand.konnectorSlug)
      brandsWithoutTrigger = getBrands(isBrandKonnectorAbsent)
    }

    // filter by category
    const subcategoryName = router.params.subcategoryName
    if (subcategoryName) {
      const categoryId = getCategoryIdFromName(subcategoryName)
      filteredTransactions = filteredTransactions.filter(transaction => getCategoryId(transaction) === categoryId)
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
        <SelectDates onChange={this.handleChangeMonth} />
        {filteredTransactions.length !== 0 && <div className={styles['bnk-mov-figures']}>
          <FigureBlock label={t('Transactions.total')} total={credits + debits} currency={currency} coloredPositive coloredNegative signed />
          <FigureBlock label={t('Transactions.transactions')} total={filteredTransactions.length} />
          <FigureBlock label={t('Transactions.debit')} total={debits} currency={currency} signed />
          <FigureBlock label={t('Transactions.credit')} total={credits} currency={currency} signed />
        </div>}
        {filteredTransactions.length === 0
          ? <p>{t('Transactions.no-movements')}</p>
          : <TransactionsWithSelection transactions={filteredTransactions} urls={urls} brands={brandsWithoutTrigger} />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const enhancedState = {
    ...state,
    accounts: ownProps.accounts,
    groups: ownProps.groups,
    transactions: ownProps.transactions
  }
  return {
    urls: {
      // this keys are used on Transactions.jsx to:
      // - find transaction label
      // - display appName in translate `Transactions.actions.app`
      MAIF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-maif'),
      HEALTH: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-sante'),
      EDF: getAppUrlBySource(state, 'gitlab.cozycloud.cc/labs/cozy-edf'),
      COLLECT: getAppUrlBySource(state, 'github.com/cozy/cozy-collect')
    },
    accountIds: getFilteredAccountIds(enhancedState),
    filteredTransactions: getFilteredTransactions(enhancedState)
      .map(transaction => hydrateTransaction(enhancedState, transaction))
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  fetchApps: () => dispatch(fetchApps()),
  fetchTransactions: () => {
    const onFetch = (dispatch) => {
      const subcategoryName = ownProps.router.params.subcategoryName
      if (subcategoryName) {
        return
      }
      dispatch(addFilterForMostRecentTransactions())
    }
    // We should use fetchTransactionsWithState
    // when https://github.com/cozy/cozy-drive/pull/800
    // has been merged, it would only fetch transactions
    // for the proper account(s) and period and thus would
    // be more performant
    return dispatch(fetchTransactions({}, onFetch))
  }
})

export default compose(
  withRouter,
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    triggers: { query: client => client.all(TRIGGER_DOCTYPE), as: 'triggers' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    transactions: { query: client => client.all(TRANSACTION_DOCTYPE), as: 'transactions' }
  }),
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(TransactionsPage)
