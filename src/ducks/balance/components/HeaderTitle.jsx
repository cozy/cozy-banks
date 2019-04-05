import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import styles from 'ducks/balance/components/HeaderTitle.styl'
import { Figure } from 'components/Figure'

const HeaderTitle = ({ balance, subtitle, onClickBalance }) => (
  <Fragment>
    {balance !== undefined && (
      <Figure
        onClick={onClickBalance}
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
  onClickBalance: PropTypes.func,
  subtitle: PropTypes.string.isRequired
}

HeaderTitle.defaultProps = {
  onClickBalance: undefined,
  balance: undefined
}

export default memo(HeaderTitle)
