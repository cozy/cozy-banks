import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import { translate } from 'cozy-ui/react/I18n'
import { cozyConnect } from 'cozy-client'
import Loading from 'components/Loading'

import { getSettings, fetchSettingsCollection, createSettings, updateSettings } from '.'
import styles from './Notifications.styl'

class Notifications extends Component {
  onToggle = (setting, checked) => {
    const { settingsCollection, dispatch } = this.props
    let settings = getSettings(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings
    settings.notifications[setting].enabled = checked
    dispatch(updateOrCreate(settings))
  }

  onChangeValue = (setting, value) => {
    const { settingsCollection, dispatch } = this.props
    let settings = getSettings(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings
    settings.notifications[setting].value = value.replace(/\D/i, '')
    dispatch(updateOrCreate(settings))
  }

  render ({ t, settingsCollection }) {
    if (settingsCollection.fetchStatus === 'loading' || settingsCollection.fetchStatus === 'pending') {
      return <Loading />
    }
    const settings = getSettings(settingsCollection)

    let notifications = [
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
        title: 'Notifications.when_month_revenue.title',
        name: 'salaire',
        description: 'Notifications.when_month_revenue.description'
      },
      {
        title: 'Notifications.weekly_summary.title',
        name: 'hebdo',
        description: 'Notifications.weekly_summary.description'
      },
      {
        title: 'Notifications.monthly_summary.title',
        name: 'mensuel',
        description: 'Notifications.monthly_summary.description'
      }
    ]

    return (
      <div>
        {notifications.map(notification => {
          const setting = settings.notifications[notification.name]
          const enabled = setting.enabled
          const value = setting.value
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
        })}
      </div>
    )
  }
}

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default cozyConnect(mapDocumentsToProps)(translate()(Notifications))
