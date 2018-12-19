import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { flowRight as compose, max } from 'lodash'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { withSize } from 'react-sizeme'

import BackButton from 'components/BackButton'
import { Breadcrumb } from 'components/Breadcrumb'
import { ConnectedSelectDates } from 'components/SelectDates'
import { AccountSwitch } from 'ducks/account'
import TransactionSelectDates from 'ducks/transactions/TransactionSelectDates'
import flag from 'cozy-flags'
import HistoryChart from 'ducks/balance/HistoryChart'
import Header from 'components/Header'
import { Padded } from 'components/Spacing'

import TableHead from './header/TableHead'
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
    const colorProps = {
      color: flag('transaction-history') ? 'primary' : 'default'
    }

    return (
      <div>
        {isSubcategory && <BackButton />}
        <AccountSwitch small={isSubcategory} {...colorProps} />
      </div>
    )
  }

  displaySelectDates = () => {
    const colorProps = {
      color: flag('transaction-history') ? 'primary' : 'default'
    }
    if (this.isSubcategory()) {
      return <ConnectedSelectDates showFullYear {...colorProps} />
    }

    const { transactions, handleChangeMonth, currentMonth } = this.props

    return (
      <TransactionSelectDates
        transactions={transactions}
        value={currentMonth}
        onChange={handleChangeMonth}
        {...colorProps}
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

  displayBalanceHistory() {
    const { chartData, size, breakpoints: { isMobile } } = this.props
    if (!flag('transaction-history') || !chartData || !size) {
      return
    }
    const intervalBetweenPoints = 10

    return (
      <HistoryChart
        margin={historyChartMargin}
        data={chartData}
        height={isMobile ? 95 : 141}
        width={max([size.width, intervalBetweenPoints * chartData.length])}
      />
    )
  }

  render() {
    const {
      router,
      breakpoints: { isMobile }
    } = this.props
    const isSubcategory = !!router.params.subcategoryName
    const withChart = flag('transaction-history')
    const colorProps = { color: withChart ? 'primary' : 'default' }

    return (
      <Header {...colorProps} fixed>
        <Padded className={isMobile ? 'u-p-0' : ''}>
          {this.displayAccountSwitch()}
          {this.displayBalanceHistory()}
          {this.displaySelectDates()}
          {this.displayBreadcrumb()}
        </Padded>
        <TableHead isSubcategory={isSubcategory} {...colorProps} />
      </Header>
    )
  }
}

export default compose(
  withRouter,
  withBreakpoints(),
  withSize(),
  translate()
)(TransactionHeader)
