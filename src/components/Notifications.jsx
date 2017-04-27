import styles from '../styles/notifications'
import classNames from 'classnames'

import React, { Component } from 'react'

import Toggle from './Toggle'

class Notifications extends Component {
  render () {
    return (
      <div>
        <h3>
          Notifications
        </h3>

        <h4>
          Seuil du solde
        </h4>
        <div className={styles['notification']}>
          <p className={styles['notification-description']}>
            Lorem ipsum dolor si amet <input type="number" className={styles['notification-input']} />
          </p>

          <div className={styles['notification-toggle']}>
            <Toggle />
          </div>
        </div>

        <h4>
          Montant
        </h4>
        <div className={styles['notification']}>
          <p className={styles['notification-description']}>
            Lorem ipsum dolor si amet <input type="number" className={classNames(styles['notification-input'], styles['suffixed'])} /><span>€</span>
            super long texte a ralgone ca continue plusieurs lignes ok lol
          </p>

          <div className={styles['notification-toggle']}>
            <Toggle />
          </div>
        </div>

      </div>
    )
  }
}

export default Notifications
