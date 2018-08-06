import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as d3 from 'd3'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { groupBy, sortBy, sumBy, uniq } from 'lodash'
import { format as formatDate, parse as parseDate } from 'date-fns'
import sma from 'sma'
import LineChart from 'components/Chart/LineChart'
import { getBalanceHistories } from './helpers'
import styles from './History.styl'

class History extends Component {
  INTERVAL_BETWEEN_TICKS = 57

  getCurrentBalance() {
    return sumBy(this.props.accounts, a => a.balance)
  }

  sortBalanceHistoryByDate(history) {
    const balanceHistory = sortBy(Object.entries(history), ([date]) => date)
      .reverse()
      .map(([date, balance]) => ({
        x: parseDate(date),
        y: balance
      }))

    return balanceHistory
  }

  getBalanceHistory() {
    const { accounts, transactions } = this.props
    const balanceHistories = getBalanceHistories(accounts, transactions)
    const balanceHistory = this.sortBalanceHistoryByDate(balanceHistories.all)

    return balanceHistory
  }

  getChartData() {
    const history = this.getBalanceHistory()
    const WINDOW_SIZE = 15

    const balancesSma = sma(history.map(h => h.y), WINDOW_SIZE, n => n)
    const data = balancesSma.map((balance, i) => ({
      ...history[i],
      y: balance
    }))

    return data
  }

  render() {
    const { className, t } = this.props
    const chartData = this.getChartData()
    const nbTicks = uniq(
      Object.keys(groupBy(chartData, i => formatDate(i.x, 'YYYY-MM')))
    ).length

    return (
      <div className={cx(styles.History, className)}>
        <Figure
          className={styles.History__currentBalance}
          currencyClassName={styles.History__currentBalanceCurrency}
          total={this.getCurrentBalance()}
          currency="€"
        />
        <div className={styles.History__subtitle}>
          {t('BalanceHistory.subtitle')}
        </div>
        <div
          className={styles.History__chartContainer}
          ref={node => (this.chartContainer = node)}
        >
          <LineChart
            width={nbTicks * this.INTERVAL_BETWEEN_TICKS}
            height={150}
            data={chartData}
            margin={{
              top: 20,
              bottom: 40,
              left: 10,
              right: 10
            }}
            nbTicks={nbTicks}
            tickFormat={d3.timeFormat('%b')}
            xScale={d3.scaleTime}
            lineColor="white"
            axisColor="white"
            labelsColor="#a2c4f9"
            onUpdate={() =>
              this.chartContainer.scrollTo(this.chartContainer.scrollWidth, 0)
            }
            axisMargin={10}
          />
        </div>
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.array.isRequired,
  className: PropTypes.string,
  transactions: PropTypes.array.isRequired
}

export default translate()(History)
