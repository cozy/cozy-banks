import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import { translate } from 'cozy-ui/react/I18n'
import { cozyConnect } from 'redux-cozy-client'
import Loading from 'components/Loading'

import { getSettings, fetchSettingsCollection, createSettings, updateSettings } from '.'
import styles from './Notifications.styl'

class Notifications extends Component {
  onToggle = (setting, checked) => {
    const { settingsCollection, dispatch } = this.props
    let settings = getSettings(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings
    settings.notifications[setting].enable = checked
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
        title: t('Notifications.if_movement_greater.title'),
        name: 'amountMax',
        description: t('Notifications.if_movement_greater.description'),
        value: settings.notifications.amountMax.value
      }
    ]

    return (
      <div>
        <h4>
          {t('Notifications.title')}
        </h4>

        {notifications.map(notification => (
          <div>
            <h5>
              {notification.title}
            </h5>
            <div className={styles['notification']}>
              <p className={styles['notification-description']}>
                {notification.description}
                <input type='text'
                  onChange={e => this.onChangeValue(notification.name, e.target.value)}
                  value={settings.notifications[notification.name].value}
                  className={classNames(styles['notification-input'], styles['suffixed'])} />
                <span>€</span>
              </p>

              <div className={styles['notification-toggle']}>
                <Toggle id={notification.name} checked={settings.notifications[notification.name].enable}
                  onToggle={checked => this.onToggle(notification.name, checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default cozyConnect(mapDocumentsToProps)(translate()(Notifications))
