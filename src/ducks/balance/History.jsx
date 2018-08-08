import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as d3 from 'd3'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { sumBy } from 'lodash'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'

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
  render() {
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
          {...this.props}
        />
      </div>
    )
  }
}

export default translate()(History)
