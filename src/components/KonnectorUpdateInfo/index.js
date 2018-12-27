import React from 'react'
import Info from '../Info'
import styles from './styles.styl'
import {
  Text,
  ButtonLink,
  Icon,
  translate,
  withBreakpoints
} from 'cozy-ui/react'
import { withClient } from 'cozy-client'
import { flowRight as compose } from 'lodash'
import { Intents } from 'cozy-interapp'

class KonnectorUpdateInfo extends React.PureComponent {
  intents = new Intents({ client: this.props.client })

  state = {
    url: null
  }

  async componentDidMount() {
    try {
      const url = await this.intents.getRedirectionURL('io.cozy.apps', {
        type: 'konnector',
        pendingUpdate: true
      })

      this.setState({ url })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  render() {
    const { url } = this.state

    if (!url) {
      return null
    }

    const { t, breakpoints } = this.props

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
          href={url}
          extension={
            breakpoints.isDesktop || breakpoints.isTablet ? 'narrow' : 'full'
          }
        />
      </Info>
    )
  }
}

export default compose(
  translate(),
  withClient,
  withBreakpoints()
)(KonnectorUpdateInfo)
