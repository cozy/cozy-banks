import React from 'react'
import PropTypes from 'prop-types'
import { withBreakpoints } from 'cozy-ui/react'
import cx from 'classnames'
import { flowRight as compose } from 'lodash'
import { translate, Icon } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import {
  getAccountLabel,
  getAccountUpdateDateDistance,
  distanceInWords
} from 'ducks/account/helpers'
import styles from './AccountRow.styl'

class AccountRow extends React.PureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    breakpoints: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  }

  render() {
    const {
      account,
      onClick,
      breakpoints: { isMobile },
      t
    } = this.props

    const today = new Date()
    const updateDistance = getAccountUpdateDateDistance(account, today)
    const updatedAt = t(distanceInWords(updateDistance), {
      nbDays: updateDistance
    })

    return (
      <li className={styles.AccountRow} onClick={onClick}>
        <div className={styles.AccountRow__column}>
          <div className={styles.AccountRow__label}>
            {getAccountLabel(account)}
          </div>
          <div className={styles.AccountRow__updatedAt}>
            <Icon
              icon="sync"
              width="10"
              color="currentColor"
              className={styles.AccountRow__updatedAtIcon}
            />
            {updatedAt}
          </div>
        </div>
        {!isMobile && (
          <div
            className={cx(
              styles.AccountRow__column,
              styles['AccountRow__column--secondary']
            )}
          >
            N°
            {account.number}
          </div>
        )}
        {!isMobile && (
          <div
            className={cx(
              styles.AccountRow__column,
              styles['AccountRow__column--secondary']
            )}
          >
            {account.institutionLabel}
          </div>
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

export default compose(
  withBreakpoints(),
  translate()
)(AccountRow)
