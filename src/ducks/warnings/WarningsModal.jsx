import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tosIcon from 'assets/icons/icon-tos.svg'
import { Icon, Button } from 'cozy-ui/react'
import styles from './WarningsModal.styl'

class WarningsModal extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired
  }

  render() {
    const { code, title, detail, links } = this.props
    const isTOSUpdated = code === 'tos-updated'

    return (
      <div className={styles.WarningsModal}>
        {isTOSUpdated && <Icon icon={tosIcon} width={96} height={96} />}
        <h2 className={styles.WarningsModal__title}>
          {isTOSUpdated ? 'De nouvelles CGU avec le RGPD' : title}
        </h2>
        <p>
          {isTOSUpdated
            ? "Dans le cadre du Règlement Général de la Protection des Données (RGPD), nos CGU sont actualisées et s'appliqueront pour vous à partir du 25 mai 2018"
            : detail}
        </p>
        <Button
          extension="full"
          label={isTOSUpdated ? 'Voir les nouvelles CGU' : 'OK'}
          tag="a"
          href={links.self}
        />
      </div>
    )
  }
}

export default WarningsModal
