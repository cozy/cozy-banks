import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { sumBy } from 'lodash'
import styles from './History.styl'
import HistoryChart from './HistoryChart'

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

export default withBreakpoints()(translate()(History))
