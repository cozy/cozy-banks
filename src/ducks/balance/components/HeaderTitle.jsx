import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import styles from './HeaderTitle.styl'
import { Figure } from 'components/Figure'

const HeaderTitle = ({ balance, subtitle }) => (
  <Fragment>
    {balance !== undefined && (
      <Figure
        className={styles.HeaderTitle_balance}
        currencyClassName={styles.BalanceHeader__currentBalanceCurrency}
        total={balance}
        symbol="€"
      />
    )}
    <div className={styles.HeaderTitle_subtitle}>{subtitle}</div>
  </Fragment>
)

HeaderTitle.propTypes = {
  balance: PropTypes.number,
  subtitle: PropTypes.string.isRequired
}

HeaderTitle.defaultProps = {
  balance: undefined
}

export default memo(HeaderTitle)
