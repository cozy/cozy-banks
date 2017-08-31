import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import { translate } from 'cozy-ui/react/I18n'
import { cozyConnect } from 'redux-cozy-client'
import Loading from 'components/Loading'

import { getSettings, fetchSettingsCollection, createSettings, updateSettings } from '.'
import styles from './Notifications.styl'

const NotificationDescription = ({ children }) => (
  <p className={styles['notification-description']}>
    {children}
  </p>
)

class Notifications extends Component {
  onToggle = (setting, checked) => {
    const { settingsCollection, dispatch } = this.props
    let settings = getSettings(settingsCollection)
    const updateOrCreate = settings._id ? updateSettings : createSettings
    settings[setting] = checked
    dispatch(updateOrCreate(settings))
  }

  render ({ t, settingsCollection }) {
    if (settingsCollection.fetchStatus === 'loading' || settingsCollection.fetchStatus === 'pending') {
      return <Loading />
    }
    const settings = getSettings(settingsCollection)

    let notifications = [
      {
        'title': t('Notifications.if_movement_greater.title'),
        'name': 'montant',
        'description':
          <NotificationDescription>
            {t('Notifications.if_movement_greater.description')}
            <input type='text' value='30' className={classNames(styles['notification-input'], styles['suffixed'])} />
            <span>€</span>
          </NotificationDescription>
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
              {notification.description}

              <div className={styles['notification-toggle']}>
                <Toggle id={notification.name} checked={settings[notification.name]}
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
