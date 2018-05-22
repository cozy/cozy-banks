import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tosIcon from 'assets/icons/icon-tos.svg'
import { Icon, Button, translate } from 'cozy-ui/react'
import styles from './WarningsModal.styl'

class WarningsModal extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired
  }

  render() {
    const { code, title, detail, links, t } = this.props
    const isTOSUpdated = code === 'tos-updated'

    return (
      <div className={styles.WarningsModal}>
        {isTOSUpdated && <Icon icon={tosIcon} width={96} height={96} />}
        <h2 className={styles.WarningsModal__title}>
          {isTOSUpdated ? t('Warnings.gdpr.title') : title}
        </h2>
        <p>{isTOSUpdated ? t('Warnings.gdpr.detail') : detail}</p>
        <Button
          extension="full"
          label={isTOSUpdated ? t('Warnings.gdpr.cta') : 'OK'}
          tag="a"
          href={links.self}
        />
      </div>
    )
  }
}

export default translate()(WarningsModal)
