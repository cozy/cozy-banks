import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { translate, withBreakpoints, Spinner } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import { sumBy } from 'lodash'
import styles from './History.styl'
import HistoryChart from './HistoryChart'

class History extends Component {
  getCurrentBalance() {
    return sumBy(this.props.accounts, a => a.balance)
  }

  render() {
    const { accounts, chartProps, className, t } = this.props

    const showSpinner = !accounts || !chartProps

    return (
      <div className={cx(styles.History, className)}>
        {accounts && (
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
        {chartProps && <HistoryChart {...chartProps} />}
        {showSpinner && <Spinner size="xxlarge" color="white" />}
      </div>
    )
  }
}

History.propTypes = {
  accounts: PropTypes.array.isRequired,
  chartProps: PropTypes.object,
  className: PropTypes.string,
  isAccountsLoading: PropTypes.bool,
  isChartLoading: PropTypes.bool
}

export default withBreakpoints()(translate()(History))
