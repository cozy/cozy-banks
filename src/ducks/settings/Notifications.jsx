import React, { Component } from 'react'
import classNames from 'classnames'
import Toggle from 'cozy-ui/react/Toggle'
import Modal from 'cozy-ui/react/Modal'
import {translate} from 'cozy-ui/react/I18n'
import {objectT} from 'utils/i18n'
import styles from './Notifications.styl'

const NotificationDescription = ({children}) => (
  <p className={styles['notification-description']}>
    {children}
  </p>
)

class Notifications extends Component {
  state = {
    solde: false,
    montant: false,
    salaire: false,
    retard: false,
    hebdo: false,
    mensuel: false,
    comingSoonModal: true
  }

  onToggle = (setting, checked) => {
    this.setState({
      // keep everything unchecked while it's not working
      [setting]: false,
      comingSoonModal: true
    })
  }

  dismissComingSoon = () => {
    this.setState({ comingSoonModal: false })
  }

  render (props, state) {
    const {t} = props
    let notifications = [{
      'title': t('Notifications.if_balance_lower.title'),
      'name': 'solde',
      'description': <NotificationDescription>
        {t('Notifications.if_balance_lower.description')} <input type='text' value='400' className={classNames(styles['notification-input'], styles['suffixed'])} /><span>€</span>
      </NotificationDescription>
    }, {
      'title': t('Notifications.if_movement_greater.title'),
      'name': 'montant',
      'description': <NotificationDescription>
        {t('Notifications.if_movement_greater.description')} <input type='text' value='30' className={classNames(styles['notification-input'], styles['suffixed'])} /><span>€</span>
      </NotificationDescription>
    }, {
      'title': t('Notifications.when_month_revenue.title'),
      'name': 'salaire',
      'description': <NotificationDescription>
        {t('Notifications.when_month_revenue.description')}
      </NotificationDescription>
    }, {
      'title': t('Notifications.no_revenue.title'),
      'name': 'retard',
      'description': <NotificationDescription>
        {objectT(t, 'Notifications.no_revenue.description', {
          input: <input
            type='text'
            value='7'
            className={styles['notification-input']} />
        })}
      </NotificationDescription>
    }, {
      'title': t('Notifications.weekly_summary.title'),
      'name': 'hebdo',
      'description': <NotificationDescription>
        {t('Notifications.weekly_summary.description')}
      </NotificationDescription>
    }, {
      'title': t('Notifications.monthly_summary.title'),
      'name': 'mensuel',
      'description': <NotificationDescription>
        {t('Notifications.monthly_summary.description')}
      </NotificationDescription>
    }]

    return (
      <div>
        <h4>
          {t('Notifications.title')}
        </h4>

        {state.comingSoonModal &&
          <Modal
            title={t('ComingSoon.title')}
            description={t('ComingSoon.description')}
            secondaryAction={this.dismissComingSoon}
          />
        }

        {notifications.map(notification => (
          <div>
            <h5>
              {notification.title}
            </h5>
            <div className={styles['notification']}>
              {notification.description}

              <div className={styles['notification-toggle']}>
                <Toggle id={notification.name} checked={state[notification.name]} onToggle={checked => this.onToggle(notification.name, checked)} />
              </div>
            </div>
          </div>
        ))}

      </div>
    )
  }
}

export default translate()(Notifications)
