import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import { translate } from 'cozy-ui/react/I18n'
import Loading from 'components/Loading'
import { queryConnect } from 'utils/client-compat'
import compose from 'lodash/flowRight'
import { getSettings, COLLECTION_NAME, DEFAULTS_SETTINGS } from '.'
import styles from './Notifications.styl'
import { BANK_SETTINGS_DOCTYPE } from 'doctypes'

class Notifications extends Component {
  notifications = [
    {
      title: 'Notifications.if_balance_lower.title',
      name: 'balanceLower',
      description: 'Notifications.if_balance_lower.description'
    },
    {
      title: 'Notifications.if_transaction_greater.title',
      name: 'transactionGreater',
      description: 'Notifications.if_transaction_greater.description'
    },
    {
      title: 'Notifications.when_health_bill_linked.title',
      name: 'healthBillLinked',
      description: 'Notifications.when_health_bill_linked.description'
    }
  ]

  onToggle = (setting, checked) => {
    const { settingsCollection } = this.props
    let settings = getSettings(settingsCollection)

    if (!settings.notifications[setting]) {
      settings.notifications[setting] = {}
    }

    settings.notifications[setting].enabled = checked
    this.props.saveDocument(settings)
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection } = this.props
    let settings = getSettings(settingsCollection)

    if (!settings.notifications[setting]) {
      settings.notifications[setting] = {}
    }

    settings.notifications[setting].value = value.replace(/\D/i, '')
    this.props.saveDocument(settings)
  }

  renderLine (notification, setting) {
    const { t } = this.props
    const { enabled, value } = setting
    const hasValue = value !== undefined

    return (
      <div>
        <h5>{t(notification.title)}</h5>
        <div className={styles['notification']}>
          <p className={styles['notification-description']}>
            {t(notification.description)}
            {hasValue && <input type='text'
              onChange={e => this.onChangeValue(notification.name, e.target.value)}
              value={value}
              className={classNames(styles['notification-input'], styles['suffixed'])} />}
            {hasValue && <span>€</span>}
          </p>

          <div className={styles['notification-toggle']}>
            <Toggle id={notification.name} checked={enabled}
              onToggle={checked => this.onToggle(notification.name, checked)}
            />
          </div>
        </div>
      </div>
    )
  }

  render ({ t, settingsCollection }) {
    if (settingsCollection.fetchStatus === 'loading' || settingsCollection.fetchStatus === 'pending') {
      return <Loading />
    }

    const settings = getSettings(settingsCollection)

    return (
      <p>
        {this.notifications.map(notification => {
          const setting = settings.notifications[notification.name] || DEFAULTS_SETTINGS.notifications[notification.name]
          return this.renderLine(notification, setting)
        })}
      </p>
    )
  }
}

export default compose(
  queryConnect({
    settingsCollection: { query: client => client.all(BANK_SETTINGS_DOCTYPE), as: COLLECTION_NAME }
  }),
  translate()
)(Notifications)
