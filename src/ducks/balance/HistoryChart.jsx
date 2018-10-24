import React, { Component } from 'react'
import * as d3 from 'd3'
import { withBreakpoints } from 'cozy-ui/react'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { format as formatDate } from 'date-fns'
import historyData from 'ducks/balance/history_data.json'
import {
  getBalanceHistories,
  sortBalanceHistoryByDate
} from 'ducks/balance/helpers'
import {
  isBefore as isDateBefore,
  isAfter as isDateAfter,
  endOfToday,
  subMonths
} from 'date-fns'

const gradientStyle = {
  '0%': '#76b9f3',
  '100%': palette.dodgerBlue
}

class HistoryChart extends Component {
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
    const balanceHistory = sortBalanceHistoryByDate(balanceHistories.all)

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
          gradient={gradientStyle}
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

export default withBreakpoints()(HistoryChart)
