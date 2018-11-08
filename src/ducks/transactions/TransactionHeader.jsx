import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/react'

import BackButton from 'components/BackButton'
import { Breadcrumb } from 'components/Breadcrumb'
import { ConnectedSelectDates } from 'components/SelectDates'
import { AccountSwitch } from 'ducks/account'
import TransactionSelectDates from 'ducks/transactions/TransactionSelectDates'
import { TransactionTableHead } from './Transactions'
import flag from 'cozy-flags'
import HistoryChart from 'ducks/balance/HistoryChart'

import styles from './TransactionsPage.styl'

const historyChartMargin = {
  top: 10,
  bottom: 10,
  left: 16,
  right: 16
}

class TransactionHeader extends Component {
  isSubcategory = () => {
    const { router } = this.props

    return router.params.subcategoryName !== undefined
  }

  displayAccountSwitch = () => {
    const isSubcategory = this.isSubcategory()

    return (
      <div>
        {isSubcategory && <BackButton />}
        <AccountSwitch small={isSubcategory} />
      </div>
    )
  }

  displaySelectDates = () => {
    if (this.isSubcategory()) {
      return <ConnectedSelectDates showFullYear />
    }

    const { transactions, handleChangeMonth, currentMonth } = this.props

    return (
      <TransactionSelectDates
        transactions={transactions}
        value={currentMonth}
        onChange={handleChangeMonth}
      />
    )
  }

  displayBreadcrumb = () => {
    const { t, breakpoints, router } = this.props

    if (breakpoints.isMobile || !this.isSubcategory()) {
      return
    }

    const { categoryName, subcategoryName } = router.params
    const breadcrumbItems = [
      {
        name: t('Categories.title.general'),
        onClick: () => router.push('/categories')
      },
      {
        name: t(`Data.categories.${categoryName}`),
        onClick: () => router.push(`/categories/${categoryName}`)
      },
      {
        name: t(`Data.subcategories.${subcategoryName}`)
      }
    ]

    return (
      <Breadcrumb
        items={breadcrumbItems}
        className={styles.TransactionPage__Breadcrumb}
      />
    )
  }

  displayTableHead() {
    const { t, breakpoints, router } = this.props

    if (breakpoints.isMobile) {
      return null
    }

    return (
      <TransactionTableHead
        mainColumnTitle={t(
          router.params.subcategoryName
            ? 'Categories.headers.movements'
            : 'Transactions.header.description'
        )}
      />
    )
  }

  displayBalanceHistory() {
    if (!flag('balance-history')) {
      return
    }

    return <HistoryChart margin={historyChartMargin} />
  }

  render() {
    return (
      <div className={styles.TransactionPage__top}>
        {this.displayBalanceHistory()}
        {this.displayAccountSwitch()}
        {this.displaySelectDates()}
        {this.displayBreadcrumb()}
        {this.displayTableHead()}
      </div>
    )
  }
}

export default compose(
  withRouter,
  withBreakpoints(),
  translate()
)(TransactionHeader)
