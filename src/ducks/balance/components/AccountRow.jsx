import React from 'react'
import PropTypes from 'prop-types'
import { withBreakpoints } from 'cozy-ui/react'
import cx from 'classnames'
import { flowRight as compose } from 'lodash'
import Switch from 'components/Switch'
import { translate, Icon } from 'cozy-ui/react'
import { Figure } from 'components/Figure'
import {
  getAccountLabel,
  getAccountUpdateDateDistance,
  distanceInWords,
  getAccountInstitutionLabel,
  getAccountInstitutionSlug,
  getAccountBalance
} from 'ducks/account/helpers'
import styles from './AccountRow.styl'
import KonnectorIcon from './KonnectorIcon'

class AccountRow extends React.PureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    breakpoints: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    warningLimit: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  }

  handleSwitchClick = e => {
    e.stopPropagation()
  }

  render() {
    const {
      account,
      onClick,
      breakpoints: { isMobile },
      t,
      warningLimit,
      checked,
      disabled,
      onSwitchChange,
      id
    } = this.props

    const today = new Date()
    const updateDistance = getAccountUpdateDateDistance(account, today)
    const updatedAt = t(distanceInWords(updateDistance), {
      nbDays: updateDistance
    })

    const hasWarning = account.balance < warningLimit
    const hasAlert = account.balance < 0
    const institutionSlug = getAccountInstitutionSlug(account)

    return (
      <li
        className={cx(styles.AccountRow, {
          [styles['AccountRow--hasWarning']]: hasWarning,
          [styles['AccountRow--hasAlert']]: hasAlert,
          [styles['AccountRow--disabled']]: !checked || disabled
        })}
        onClick={onClick}
      >
        <div className={styles.AccountRow__column}>
          <div className={styles.AccountRow__logo}>
            {institutionSlug && <KonnectorIcon slug={institutionSlug} />}
          </div>
          <div className={styles.AccountRow__labelUpdatedAtWrapper}>
            <div className={styles.AccountRow__label}>
              {getAccountLabel(account)}
            </div>
            <div
              className={cx(styles.AccountRow__updatedAt, {
                [styles['AccountRow__updatedAt--old']]: updateDistance > 1
              })}
            >
              <Icon
                icon="sync"
                width="10"
                color="currentColor"
                className={styles.AccountRow__updatedAtIcon}
              />
              {updatedAt}
            </div>
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
            {getAccountInstitutionLabel(account)}
          </div>
        )}
        <div
          className={cx(
            styles.AccountRow__column,
            styles.AccountRow__figureSwitchWrapper
          )}
        >
          <Figure
            symbol="€"
            total={getAccountBalance(account)}
            className={cx(styles.AccountRow__figure)}
            totalClassName={styles.AccountRow__figure}
            currencyClassName={styles.AccountRow__figure}
          />
          <Switch
            disableRipple
            checked={checked}
            // Do not deactivate interactions with the button,
            // only color it to look disabled
            color={disabled ? 'default' : 'primary'}
            onClick={this.handleSwitchClick}
            id={id}
            onChange={onSwitchChange}
          />
        </div>
      </li>
    )
  }
}

export default compose(
  withBreakpoints(),
  translate()
)(AccountRow)
