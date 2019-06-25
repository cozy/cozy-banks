import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react'
import SelectBox from 'cozy-ui/react/SelectBox'
import { getAccountLabel, getAccountType } from 'ducks/account/helpers'
import ToggleRow, { ToggleRowWrapper } from 'ducks/settings/ToggleRow'
import styles from 'ducks/settings/DelayedDebitAlert.styl'

class DumbDelayedDebitAlert extends React.Component {
  static propTypes = {
    // TODO replace `PropTypes.object` with a shape coming from cozy-doctypes
    accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    enabled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  render() {
    const { accounts, enabled, onToggle, t } = this.props

    const creditCardAccounts = accounts.filter(
      account => getAccountType(account) === 'CreditCard'
    )

    const checkingsAccounts = accounts.filter(
      account => getAccountType(account) === 'Checkings'
    )

    return (
      <ToggleRowWrapper>
        <ToggleRow
          title={t('Notifications.delayed_debit.settingTitle')}
          description={t('Notifications.delayed_debit.description')}
          onToggle={onToggle}
          enabled={enabled}
          name="delayedDebit"
        />
        <div className={styles.AccountsPicker}>
          <SelectBox
            size="medium"
            disabled={!enabled}
            options={creditCardAccounts.map(account => ({
              value: account._id,
              label: getAccountLabel(account)
            }))}
            defaultValue={
              creditCardAccounts.length === 1 ? creditCardAccounts[0] : null
            }
          />
          <SelectBox
            size="medium"
            disabled={!enabled}
            options={checkingsAccounts.map(account => ({
              value: account._id,
              label: getAccountLabel(account)
            }))}
            defaultValue={
              checkingsAccounts.length === 1 ? checkingsAccounts[0] : null
            }
          />
        </div>
      </ToggleRowWrapper>
    )
  }
}

const DelayedDebitAlert = translate()(DumbDelayedDebitAlert)

export default DelayedDebitAlert
