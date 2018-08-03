import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { translate } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import styles from './History.styl'

class History extends Component {
  render() {
    const { className, currentBalance, t } = this.props
    return (
      <div className={cx(styles.History, className)}>
        <Figure
          className={styles.History__currentBalance}
          currencyClassName={styles.History__currentBalanceCurrency}
          total={currentBalance}
          currency="€"
        />
        <div className={styles.History__subtitle}>
          {t('BalanceHistory.subtitle')}
        </div>
      </div>
    )
  }
}

History.propTypes = {
  className: PropTypes.string,
  currentBalance: PropTypes.number.isRequired
}

export default translate()(History)
