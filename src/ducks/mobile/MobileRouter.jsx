/* global __DEV__ */

import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router'
import { withClient } from 'cozy-client'
import { Authentication, Revoked } from 'cozy-authentication'
import { defaultRoute } from 'components/AppRoute'
import { setURLContext, logException } from 'lib/sentry'
import {
  storeCredentials,
  revokeClient,
  unlink,
  // setToken,
  getURL,
  getAccessToken
} from 'ducks/mobile'
import {
  registerPushNotifications,
  stopPushNotifications
} from 'ducks/mobile/push'
import { initBar, resetClient } from 'ducks/mobile/utils'
import LogoutModal from 'components/LogoutModal'
import { resetFilterByDoc } from 'ducks/filters'

export const AUTH_PATH = 'authentication'

export const onLogout = async (store, cozyClient) => {
  try {
    await stopPushNotifications()

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.info('Stopped push notifications')
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('Error while stopping push notification', e)
    }
  }

  try {
    await resetClient(cozyClient)

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.info('Resetted client')
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('Error while resetting client', e)
    }
  }

  store.dispatch(unlink())
  store.dispatch(resetFilterByDoc())
}

const withAuth = Wrapped =>
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
        this.context.store.dispatch(storeCredentials(url, clientInfo, token))
        router.replace(defaultRoute())
      } else {
        // when user is already authenticated
        clientInfos = this.context.store.getState().mobile.client
      }

      cozyClient.login()
      await registerPushNotifications(cozyClient, clientInfos)
    }

    setupAuth = isAuthenticated => () => {
      if (!isAuthenticated()) {
        // TODO: Remove old data, we remove it because it use old cozy-client-js
        // resetClient()
        this.props.history.replace(`/${AUTH_PATH}`)
        this.context.store.dispatch(revokeClient())
      } else {
        this.onAuthentication()
        const mobileState = this.context.store.getState().mobile
        const url = getURL(mobileState)
        const cozyClient = this.props.client
        setURLContext(url)
        initBar(url, getAccessToken(mobileState), {
          onLogOut: () => {
            this.setState({ isLoggingOut: true }, async () => {
              await onLogout(
                this.context.store,
                cozyClient,
                this.props.history.replace
              )

              this.setState({ isLoggingOut: false })
              this.props.history.replace(`/${AUTH_PATH}`)
            })
          }
        })
      }
    }

    isAuthenticated = () => {
      return this.context.store.getState().mobile.client !== null
    }

    isRevoked = () => {
      return this.context.store.getState().mobile.revoked
    }

    render() {
      if (this.state.isLoggingOut) {
        return <LogoutModal />
      }

      return (
        <Wrapped
          {...this.props}
          {...{
            isAuthenticated: this.isAuthenticated,
            isRevoked: this.isRevoked,
            onAuthentication: this.onAuthentication,
            setupAuth: this.setupAuth
          }}
        />
      )
    }
  }

const MobileRouter = ({
  router,
  history,
  routes,
  isAuthenticated,
  isRevoked,
  onAuthentication,
  setupAuth
}) => {
  return (
    <Router history={history}>
      <Route>
        <Route
          path={AUTH_PATH}
          component={props => (
            <Authentication
              {...props}
              router={history}
              onComplete={onAuthentication}
              onException={logException}
            />
          )}
        />
        <Route
          onEnter={setupAuth(isAuthenticated, router)}
          component={props => {
            const revoked = isRevoked()
            return revoked ? (
              <Revoked
                {...props}
                router={history}
                revoked={isRevoked()}
                onLogBackIn={onAuthentication}
              />
            ) : (
              props.children
            )
          }}
        >
          {routes}
        </Route>
      </Route>
    </Router>
  )
}

export default withClient(withAuth(MobileRouter))
