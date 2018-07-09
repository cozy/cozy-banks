import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import { cozyConnect } from 'cozy-client'
import Loading from 'components/Loading'
import { translate } from 'cozy-ui/react'
import { get } from 'lodash'
import { registerPushNotifications } from 'ducks/mobile/push'

import {
  fetchSettingsCollection,
  createSettings,
  updateSettings,
  DEFAULTS_SETTINGS
} from '.'
import styles from './Notifications.styl'

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
    const { settingsCollection, dispatch } = this.props
    let settings = get(settingsCollection, 'data[0]')
    const updateOrCreate = settings._id ? updateSettings : createSettings

    if (!settings.notifications[setting]) {
      settings.notifications[setting] = {}
    }

    settings.notifications[setting].enabled = checked
    dispatch(updateOrCreate(settings))
    dispatch(registerPushNotifications())
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection, dispatch } = this.props
    let settings = get(settingsCollection, 'data[0]')
    const updateOrCreate = settings._id ? updateSettings : createSettings

    if (!settings.notifications[setting]) {
      settings.notifications[setting] = {}
    }

    settings.notifications[setting].value = value.replace(/\D/i, '')
    dispatch(updateOrCreate(settings))
  }

  renderLine(notification, setting) {
    const { t } = this.props
    const { enabled, value } = setting
    const hasValue = value !== undefined

    return (
      <div key={notification.name}>
        <h5>{t(notification.title)}</h5>
        <div className={styles['notification']}>
          <p className={styles['notification-description']}>
            {t(notification.description)}
            {hasValue && (
              <input
                type="text"
                onChange={e =>
                  this.onChangeValue(notification.name, e.target.value)
                }
                value={value}
                className={classNames(
                  styles['notification-input'],
                  styles['suffixed']
                )}
              />
            )}
            {hasValue && <span>€</span>}
          </p>

          <div className={styles['notification-toggle']}>
            <Toggle
              id={notification.name}
              checked={enabled}
              onToggle={checked => this.onToggle(notification.name, checked)}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { settingsCollection } = this.props
    if (
      settingsCollection.fetchStatus === 'loading' ||
      settingsCollection.fetchStatus === 'pending'
    ) {
      return <Loading />
    }

    const settings = get(settingsCollection, 'data[0]')

    return (
      <p>
        {this.notifications.map(notification => {
          const setting =
            settings.notifications[notification.name] ||
            DEFAULTS_SETTINGS.notifications[notification.name]
          return this.renderLine(notification, setting)
        })}
      </p>
    )
  }
}

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default translate()(cozyConnect(mapDocumentsToProps)(Notifications))
