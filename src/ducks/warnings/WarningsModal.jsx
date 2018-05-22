import React, { Component } from 'react'
import tosIcon from 'assets/icons/icon-tos.svg'
import { Icon, Button } from 'cozy-ui/react'
import styles from './WarningsModal.styl'

class WarningsModal extends Component {
  render() {
    return (
      <div className={styles.WarningsModal}>
        <Icon icon={tosIcon} width={96} height={96} />
        <h2 className={styles.WarningsModal__title}>
          De nouvelles CGU avec le RGPD
        </h2>
        <p>
          Dans le cadre du Règlement Général de la Protection des Données
          (RGPD), nos CGU sont actualisées et s&apos;appliqueront pour vous à
          partir du 25 mai 2018
        </p>
        <Button
          extension="full"
          label="Voir les nouvelles CGU"
          tag="a"
          href="https://cozy.io"
        />
      </div>
    )
  }
}

export default WarningsModal
