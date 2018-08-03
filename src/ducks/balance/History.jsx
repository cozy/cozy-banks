import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as d3 from 'd3'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { groupBy, sumBy, uniq } from 'lodash'
import { format as formatDate, parse as parseDate } from 'date-fns'
import LineChart from 'components/Chart/LineChart'
import { getBalanceHistories } from './helpers'
import styles from './History.styl'

class History extends Component {
  getCurrentBalance() {
    return sumBy(this.props.accounts, a => a.balance)
  }

  getBalanceHistory() {
    const { accounts, transactions } = this.props
    const balanceHistories = getBalanceHistories(accounts, transactions)
    const balanceHistory = Object.entries(balanceHistories.all)
      .sort((a, b) => {
        if (a[0] < b[0]) {
          return 1
        }

        if (a[0] > b[0]) {
          return -1
        }

        return 0
      })
      .map(([date, balance]) => ({
        x: parseDate(date),
        y: balance
      }))

    return balanceHistory
  }

  render() {
    const { className, t } = this.props
    const chartData = this.getBalanceHistory()
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
        <div>
          <LineChart
            width={800}
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
