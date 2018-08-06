import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as d3 from 'd3'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { groupBy, sumBy, uniq } from 'lodash'
import { format as formatDate } from 'date-fns'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'

class History extends Component {
  INTERVAL_BETWEEN_TICKS = 57

  getCurrentBalance() {
    return sumBy(this.props.accounts, a => a.balance)
  }

  render() {
    const { chartData, className, t } = this.props
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
            tickFormat={d3.timeFormat('%b')}
            xScale={d3.scaleTime}
            lineColor="white"
            axisColor="white"
            labelsColor="#a2c4f9"
            onUpdate={() =>
              this.chartContainer.scrollTo(this.chartContainer.scrollWidth, 0)
            }
            axisMargin={10}
            gradient={{
              '0%': 'rgba(255, 255, 255, 0.7)',
              '100%': palette.dodgerBlue
            }}
          />
        </div>
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.array.isRequired,
  chartData: LineChart.propTypes.data,
  className: PropTypes.string,
  transactions: PropTypes.array.isRequired
}

export default translate()(History)
