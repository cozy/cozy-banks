import React from 'react'
import Info from '../Info'
import styles from './styles.styl'
import { Text, ButtonLink, Icon, translate } from 'cozy-ui/react'

class KonnectorUpdateInfo extends React.PureComponent {
  render() {
    const { t } = this.props

    return (
      <Info variant="error" title={t('KonnectorUpdateInfo.title')}>
        <Text
          tag="p"
          className={styles['KonnectorUpdateInfo__message']}
          dangerouslySetInnerHTML={{
            __html: t('KonnectorUpdateInfo.content')
          }}
        />
        <ButtonLink
          icon={<Icon icon="openwith" />}
          label={t('KonnectorUpdateInfo.cta')}
          theme="secondary"
          href="#"
          extension="full"
        />
      </Info>
    )
  }
}

export default translate()(KonnectorUpdateInfo)
