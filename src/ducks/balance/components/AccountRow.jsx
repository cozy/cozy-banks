import React from 'react'
import PropTypes from 'prop-types'
import { withBreakpoints } from 'cozy-ui/react'
import cx from 'classnames'
import { Figure } from 'components/Figure'
import { getAccountLabel } from 'ducks/account/helpers'
import styles from './AccountRow.styl'

class AccountRow extends React.PureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    breakpoints: PropTypes.object.isRequired
  }

  render() {
    const {
      account,
      onClick,
      breakpoints: { isMobile }
    } = this.props

    return (
      <li className={styles.AccountRow} onClick={onClick}>
        <span className={styles.AccountRow__column}>
          <span className={styles.AccountRow__label}>
            {getAccountLabel(account)}
          </span>
        </span>
        {!isMobile && (
          <span
            className={cx(
              styles.AccountRow__column,
              styles['AccountRow__column--secondary']
            )}
          >
            N°
            {account.number}
          </span>
        )}
        {!isMobile && (
          <span
            className={cx(
              styles.AccountRow__column,
              styles['AccountRow__column--secondary']
            )}
          >
            {account.institutionLabel}
          </span>
        )}
        <Figure
          currency="€"
          total={account.balance}
          className={cx(styles.AccountRow__figure, styles.AccountRow__column)}
          totalClassName={styles.AccountRow__figure}
          currencyClassName={styles.AccountRow__figure}
        />
      </li>
    )
  }
}

export default withBreakpoints()(AccountRow)
