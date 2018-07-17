import React, { Component } from 'react'
import classNames from 'classnames'
import { cozyConnect } from 'cozy-client'
import { connect } from 'react-redux'
import Loading from 'components/Loading'
import { translate, Toggle, Title } from 'cozy-ui/react'
import { registerPushNotifications } from 'ducks/mobile/push'
import { flowRight as compose } from 'lodash'
import { isCollectionLoading } from 'utils/client'

import {
  getSettings,
  fetchSettingsCollection,
  createSettings,
  updateSettings
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
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

    settings.notifications[setting].enabled = checked
    dispatch(updateOrCreate(settings))
    dispatch(registerPushNotifications())
  }

  onChangeValue = (setting, value) => {
    const { settings, dispatch } = this.props
    const updateOrCreate = settings._id ? updateSettings : createSettings

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
    const { settingsCollection, settings, t } = this.props

    if (isCollectionLoading(settingsCollection)) {
      return <Loading />
    }

    return (
      <div>
        <Title>{t('Notifications.title')}</Title>
        <p>
          {this.notifications.map(notification => {
            const setting = settings.notifications[notification.name]
            return this.renderLine(notification, setting)
          })}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: getSettings(state)
})

const mapDocumentsToProps = () => ({
  settingsCollection: fetchSettingsCollection()
})

export default compose(
  translate(),
  cozyConnect(mapDocumentsToProps),
  connect(mapStateToProps)
)(Notifications)
