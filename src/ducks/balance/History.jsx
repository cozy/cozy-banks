import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { queryConnect } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { withBreakpoints, Spinner } from 'cozy-ui/react'
import { flowRight as compose, uniq, groupBy, max } from 'lodash'
import styles from './History.styl'
import HistoryChart from './HistoryChart'
import { isCollectionLoading } from 'ducks/client/utils'
import { format as formatDate, subYears, isAfter } from 'date-fns'
import * as d3 from 'd3'
import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from './helpers'
import { withSize } from 'react-sizeme'

const today = new Date()
const oneYearBefore = subYears(today, 1)

class History extends Component {
  getBalanceHistory(accounts, transactions) {
    const balanceHistories = getBalanceHistories(
      accounts,
      transactions,
      today,
      oneYearBefore
    )
    const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

    return balanceHistory
  }

  getTransactionsFiltered() {
    const { transactions } = this.props

    return {
      ...transactions,
      data: transactions.data.filter(t => {
        return isAfter(new Date(t.date), oneYearBefore)
      })
    }
  }

  getChartData() {
    const { accounts } = this.props
    const transactions = this.getTransactionsFiltered()
    const history = this.getBalanceHistory(accounts.data, transactions.data)
    const data = balanceHistoryToChartData(history)

    return data
  }

  getChartProps() {
    const {
      breakpoints: { isMobile },
      size: { width }
    } = this.props

    const data = this.getChartData()
    const nbTicks = uniq(
      Object.keys(groupBy(data, i => formatDate(i.x, 'YYYY-MM')))
    ).length

    const intervalBetweenMonths = isMobile ? 52 : 89
    const TICK_FORMAT = d3.timeFormat('%b')

    const chartProps = {
      data,
      nbTicks,
      width: max([width, nbTicks * intervalBetweenMonths]),
      height: isMobile ? 95 : 141,
      margin: {
        top: 26,
        bottom: 35,
        left: 0,
        right: isMobile ? 16 : 32
      },
      showAxis: true,
      axisMargin: 10,
      tickFormat: TICK_FORMAT
    }

    return chartProps
  }

  render() {
    const { transactions, className } = this.props

    const isTransactionsLoading = isCollectionLoading(transactions)

    return (
      <div className={cx(styles.History, className)}>
        {isTransactionsLoading ? (
          <Spinner size="xxlarge" color="white" />
        ) : (
          <HistoryChart {...this.getChartProps()} />
        )}
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.object.isRequired,
  className: PropTypes.string,
  transactions: PropTypes.object.isRequired
}

export default compose(
  withBreakpoints(),
  withSize(),
  queryConnect({
    transactions: transactionsConn
  })
)(History)
