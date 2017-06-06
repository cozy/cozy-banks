import styles from 'styles/notifications'
import classNames from 'classnames'

import React, { Component } from 'react'

import Toggle from 'cozy-ui/react/Toggle'
import Modal from 'cozy-ui/react/Modal'

const NotificationDescription = ({ children }) => (
  <p className={styles['notification-description']}>
    {children}
  </p>
)

class Notifications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      solde: false,
      montant: false,
      salaire: false,
      retard: false,
      hebdo: false,
      mensuel: false,
      comingSoonModal: true
    }
  }
  onToggle (setting, checked) {
    this.setState({
      // keep everything unchecked while it's not working
      [setting]: false,
      comingSoonModal: true
    })
  }
  dismissComingSoon () {
    this.setState({ comingSoonModal: false })
  }
  render (props, state) {
    let notifications = [{
      'title': 'Seuil de solde',
      'name': 'solde',
      'description': <NotificationDescription>
        Vous receverez un email, si votre solde est inférieur à <input type='number' value='400' className={classNames(styles['notification-input'], styles['suffixed'])} /><span>€</span>
      </NotificationDescription>
    }, {
      'title': 'Montant de mouvement',
      'name': 'montant',
      'description': <NotificationDescription>
        Vous receverez un email, si un mouvement est supérieur à <input type='number' value='30' className={classNames(styles['notification-input'], styles['suffixed'])} /><span>€</span>
      </NotificationDescription>
    }, {
      'title': 'Versement de salaire',
      'name': 'salaire',
      'description': <NotificationDescription>
        Vous receverez un email à la réception de votre salaire chaque mois.
      </NotificationDescription>
    }, {
      'title': 'Retard de salaire',
      'name': 'retard',
      'description': <NotificationDescription>
        Vous serez prévenu si vous n’avez pas reçu votre salaire au <input type='number' value='7' className={styles['notification-input']} /> de chaque mois.
      </NotificationDescription>
    }, {
      'title': 'Synthèse hebdomadaire',
      'name': 'hebdo',
      'description': <NotificationDescription>
        Vous receverez un récapitulatif de vos dépenses et de vos revenus tous les lundis de chaque semaine.
      </NotificationDescription>
    }, {
      'title': 'Synthèse mensuelle',
      'name': 'mensuel',
      'description': <NotificationDescription>
        Vous receverez un récapitulatif de vos dépenses et de vos revenus tous les premiers de chaque mois.
      </NotificationDescription>
    }]

    return (
      <div>
        <h4>
          Notifications
        </h4>

        { state.comingSoonModal &&
          <Modal
            title={'À venir'}
            description={'Ces fonctionnalités seront bientôt disponnibles.'}
            secondaryAction={this.dismissComingSoon.bind(this)}
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

export default Notifications
