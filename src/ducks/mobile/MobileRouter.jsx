import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router'
import { withClient } from 'cozy-client'
import { Authentication, Revoked } from 'cozy-authentication'
import { setURLContext, logException } from 'lib/sentry'
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

const withAuth = Wrapped => {
  class WithAuth extends React.Component {
    state = {
      isLoggingOut: false
    }

    static contextTypes = {
      store: PropTypes.object.isRequired
    }

    onAuthentication = async res => {
      let clientInfos
      const cozyClient = this.props.client

      if (res) {
        // first authentication
        const { url, clientInfo, router, token } = res
        setURLContext(url)
        this.props.storeCredentials(url, clientInfo, token)
        router.replace('/balances')
      } else {
        // when user is already authenticated
        clientInfos = this.props.clientInfos
      }

      cozyClient.login()
      await registerPushNotifications(cozyClient, clientInfos)
    }

    onEnterApp = () => {
      const { history, isAuthenticated } = this.props
      if (!isAuthenticated) {
        // TODO: Remove old data, we remove it because it use old cozy-client-js
        // resetClient()
        history.replace(`/${AUTH_PATH}`)
        this.props.revokeClient()
      } else {
        this.onAuthentication()
        const url = this.props.url
        setURLContext(url)
        initBar(this.props.client, url, this.props.accessToken, {
          onLogOut: this.onLogout
        })
      }
    }

    onLogout = async () => {
      this.setState({ isLoggingOut: true }, async () => {
        await onLogout(
          this.context.store,
          this.props.client,
          this.props.history
        )
        this.setState({ isLoggingOut: false })
      })
    }

    render() {
      if (this.state.isLoggingOut) {
        return <LogoutModal />
      }

      return (
        <Wrapped
          {...this.props}
          {...{
            onAuthentication: this.onAuthentication,
            onEnterApp: this.onEnterApp,
            onLogout: this.onLogout
          }}
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

  return connect(
    mapStateToProps,
    actionCreators
  )(WithAuth)
}

const PotentiallyRevoked_ = props => {
  return props.revoked ? <Revoked {...props} /> : props.children
}

const PotentiallyRevoked = connect(state => ({
  revoked: state.mobile.revoked
}))(PotentiallyRevoked_)

const MobileRouter = ({
  history,
  routes,
  onAuthentication,
  onLogout,
  onEnterApp
}) => {
  return (
    <Router history={history}>
      <Route
        path={AUTH_PATH}
        component={props => (
          <Authentication
            {...props}
            router={history}
            onComplete={onAuthentication}
            onException={logException}
            appTitle="Banks"
            appIcon={appIcon}
          />
        )}
      />
      <Route
        onEnter={onEnterApp}
        component={props => (
          <PotentiallyRevoked
            {...props}
            router={history}
            onLogBackIn={onAuthentication}
            onLogout={onLogout}
          />
        )}
      >
        {routes}
      </Route>
    </Router>
  )
}

export default withClient(withAuth(MobileRouter))
