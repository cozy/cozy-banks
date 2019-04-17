import React from 'react'
import PropTypes from 'prop-types'
import { withClient } from 'cozy-client'
import * as sentry from 'lib/sentry'
import { Route } from 'react-router'
import {
  storeCredentials,
  revokeClient,
  // setToken,
  getURL,
  getAccessToken
} from 'ducks/mobile'
import { registerPushNotifications } from 'ducks/mobile/push'
import { initBar, onLogout, AUTH_PATH } from 'ducks/mobile/utils'
import LogoutModal from 'components/LogoutModal'
import { connect } from 'react-redux'
import appIcon from 'targets/favicons/icon-banks.jpg'
import compose from 'lodash/flowRight'

import MobileRouter from 'cozy-authentication/dist/MobileRouter'
import 'cozy-authentication/dist/stylesheet'

const appTitle = 'Cozy Banks'

class BanksMobileRouter extends React.Component {
  state = {
    isLoggingOut: false
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  onAuthentication = async res => {
    let clientInfos
    const cozyClient = this.props.client

    if (res || this.props.isAuthenticated) {
      // first authentication
      const { url, clientInfo, router, token } = res
      sentry.setURLContext(url)
      this.props.storeCredentials(url, clientInfo, token)
      initBar(this.props.client, url, this.props.accessToken, {
        onLogOut: this.onLogout
      })
      router.replace('/balances')
    } else {
      // TODO: Remove old data, we remove it because it use old cozy-client-js
      // resetClient()
      history.replace(`/${AUTH_PATH}`)
      this.props.revokeClient()
    }

    cozyClient.login()
    await registerPushNotifications(cozyClient, clientInfos)
  }

  onEnterApp = () => {
    console.log('ONENTERAPP')
    const { history, isAuthenticated } = this.props
    if (!isAuthenticated) {
      // TODO: Remove old data, we remove it because it use old cozy-client-js
      // resetClient()
      history.replace(`/${AUTH_PATH}`)
      this.props.revokeClient()
    } else {
      this.onAuthentication()
      const url = this.props.url
      sentry.setURLContext(url)
      initBar(this.props.client, url, this.props.accessToken, {
        onLogOut: this.onLogout
      })
    }
  }

  onLogout = async () => {
    this.setState({ isLoggingOut: true }, async () => {
      await onLogout(this.context.store, this.props.client, this.props.history)
      this.setState({ isLoggingOut: false })
    })
  }

  render() {
    if (this.state.isLoggingOut) {
      return <LogoutModal />
    }

    const onboarding = {
      oauth: this.props.client.options.oauth
    }
    return (
      <MobileRouter
        appIcon={appIcon}
        appTitle={appTitle}
        onboarding={onboarding}
        onAuthenticated={this.onAuthentication}
        {...this.props}
        appRoutes={
          <Route onEnter={this.onEnterApp}>{this.props.appRoutes}</Route>
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  accessToken: getAccessToken(state.mobile),
  url: getURL(state.mobile),
  isRevoked: state.mobile.revoked,
  clientInfos: state.mobile.client,
  isAuthenticated: state.mobile.client !== null
})

const actionCreators = {
  storeCredentials,
  revokeClient
}

export default compose(
  withClient,
  connect(
    mapStateToProps,
    actionCreators
  )
)(BanksMobileRouter)
