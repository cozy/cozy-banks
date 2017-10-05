/* global cozy */

import React, { Component } from 'react'
import Modal from 'cozy-ui/react/Modal'
import { translate } from 'cozy-ui/react/I18n'

import { resetClient } from './lib/client'
import { AUTH_PATH } from './MobileRouter'

class Revoked extends Component {
  logout () {
    resetClient()
    this.props.router.replace(`/${AUTH_PATH}`)
  }

  async logBackIn () {
    const url = cozy.client._url
    cozy.client._storage.clear()
    const cozyClient = this.context.client
    const { client, token } = await cozyClient.register(url)
    this.props.onLogBackIn({ url, clientInfo: client, token, router: this.props.router })
  }

  render () {
    const { children, t } = this.props
    if (this.props.revoked) {
      return (
        <div>
          <Modal
            title={t('mobile.revoked.title')}
            description={t('mobile.revoked.description')}
            secondaryText={t('mobile.revoked.logout')}
            secondaryAction={() => { this.logout() }}
            primaryText={t('mobile.revoked.loginagain')}
            primaryAction={() => { this.logBackIn() }}
            withCross={false}
          />
          {children}
        </div>
      )
    } else {
      return children
    }
  }
}
export default translate()(Revoked)
