import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { translate, withBreakpoints, Spinner } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { sumBy, uniq, groupBy } from 'lodash'
import styles from './History.styl'
import HistoryChart from './HistoryChart'
import { isCollectionLoading } from 'ducks/client/utils'
import { format as formatDate, subYears } from 'date-fns'
import * as d3 from 'd3'
import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from './helpers'

class History extends Component {
  getCurrentBalance() {
    return sumBy(this.props.accounts.data, a => a.balance)
  }

  getBalanceHistory(accounts, transactions) {
    const today = new Date()
    const balanceHistories = getBalanceHistories(
      accounts,
      transactions,
      today,
      subYears(today, 1)
    )
    const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

    return balanceHistory
  }

  getChartData() {
    const { accounts, transactions } = this.props
    const history = this.getBalanceHistory(accounts.data, transactions.data)
    const data = balanceHistoryToChartData(history)

    return data
  }

  getChartProps() {
    const {
      breakpoints: { isMobile }
    } = this.props

    const data = this.getChartData()
    const nbTicks = uniq(
      Object.keys(groupBy(data, i => formatDate(i.x, 'YYYY-MM')))
    ).length

    const intervalBetweenPoints = 57
    const TICK_FORMAT = d3.timeFormat('%b')

    const chartProps = {
      data,
      nbTicks,
      width: nbTicks * intervalBetweenPoints,
      height: isMobile ? 95 : 141,
      margin: {
        top: 20,
        bottom: 35,
        left: isMobile ? 16 : 32,
        right: isMobile ? 16 : 32
      },
      showAxis: true,
      axisMargin: 10,
      tickFormat: TICK_FORMAT
    }

    return chartProps
  }

  render() {
    const { accounts, transactions, className, t } = this.props

    const isAccountsLoading = isCollectionLoading(accounts)
    const isTransactionsLoading =
      isCollectionLoading(transactions) || transactions.hasMore
    const showSpinner = isAccountsLoading || isTransactionsLoading

    if (transactions.hasMore) {
      transactions.fetchMore()
    }

    return (
      <div className={cx(styles.History, className)}>
        {!isAccountsLoading && (
          <React.Fragment>
            <Figure
              className={styles.History__currentBalance}
              currencyClassName={styles.History__currentBalanceCurrency}
              total={this.getCurrentBalance()}
              currency="€"
            />
            <div className={styles.History__subtitle}>
              {t('BalanceHistory.subtitle')}
            </div>
          </React.Fragment>
        )}
        {!isTransactionsLoading && <HistoryChart {...this.getChartProps()} />}
        {showSpinner && <Spinner size="xxlarge" color="white" />}
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.object.isRequired,
  className: PropTypes.string,
  transactions: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withBreakpoints()(translate()(History))
