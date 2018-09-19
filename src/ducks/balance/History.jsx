import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as d3 from 'd3'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { sumBy } from 'lodash'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { format as formatDate } from 'date-fns'
import historyData from 'ducks/balance/history_data.json'
import { getBalanceHistories } from 'ducks/balance/helpers'
import {
  isBefore as isDateBefore,
  isAfter as isDateAfter,
  endOfToday,
  subMonths
} from 'date-fns'

class History extends Component {
  getCurrentBalance() {
    return sumBy(this.props.accounts, a => a.balance)
  }

  render() {
    const { chartProps, className, t } = this.props

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
        <HistoryChart {...chartProps} />
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.array.isRequired,
  chartProps: PropTypes.object,
  className: PropTypes.string
}

export class HistoryChart extends Component {
  getTooltipContent = item => {
    const date = formatDate(item.x, 'DD  MMM')
    const balance = item.y.toFixed(2)

    return (
      <div>
        {date}
        <strong className={styles.HistoryChart__tooltipBalance}>
          {balance}€
        </strong>
      </div>
    )
  }

  getBalanceHistory() {
    const balanceHistories = getBalanceHistories(
      historyData['io.cozy.bank.accounts'],
      historyData['io.cozy.bank.operations']
    )
    const balanceHistory = this.sortBalanceHistoryByDate(balanceHistories.all)

    return balanceHistory
  }

  getChartData() {
    const history = this.getBalanceHistory()
    const today = endOfToday()
    const twoMonthsAgo = subMonths(today, 2)
    const data = history.filter(
      h => isDateBefore(h.x, today) && isDateAfter(h.x, twoMonthsAgo)
    )

    return data
  }

  render() {
    const data = this.getChartData()
    const chartData = this.getChartData()
    const chartNbTicks = chartData.length
    const chartIntervalBetweenPoints = 10
    const width = this.props.breakpoints.isMobile
      ? chartNbTicks * chartIntervalBetweenPoints
      : '100%'
    const height = 72
    return (
      <div
        className={styles.HistoryChart}
        ref={node => (this.container = node)}
      >
        <LineChart
          xScale={d3.scaleTime}
          lineColor="white"
          axisColor="white"
          labelsColor="#a2c4f9"
          onUpdate={() =>
            this.container.scrollTo(this.container.scrollWidth, 0)
          }
          gradient={{
            '0%': '#76b9f3',
            '100%': palette.dodgerBlue
          }}
          pointFillColor="white"
          pointStrokeColor="rgba(255, 255, 255, 0.3)"
          getTooltipContent={this.getTooltipContent}
          data={data}
          width={width}
          height={height}
          {...this.props}
        />
      </div>
    )
  }
}

export default withBreakpoints()(translate()(History))
