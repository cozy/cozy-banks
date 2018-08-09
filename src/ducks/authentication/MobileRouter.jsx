import { defaultRoute } from 'components/AppRoute'
import React from 'react'
import { Router, Route } from 'react-router'
import { setURLContext, logException } from 'lib/sentry'
import { Authentication, Revoked } from 'cozy-authentication'
import {
  storeCredentials,
  revokeClient,
  unlink,
  setToken,
  getURL,
  getAccessToken
} from 'ducks/mobile'
import {
  registerPushNotifications,
  stopPushNotifications
} from 'ducks/mobile/push'
import {
  initBar,
  updateAccessTokenBar,
  resetClient,
  getToken
} from 'ducks/authentication/lib/client'
import { withClient } from 'utils/client'

export const AUTH_PATH = 'authentication'

export const onLogout = (store, client, replaceFn) => {
  const mobile = store.getState().mobile
  store.dispatch(unlink())
  stopPushNotifications()
  resetClient(mobile.client, client)
  replaceFn(`/${AUTH_PATH}`)
}

const withAuth = Wrapped => (props, { store, client }) => {
  const onAuthentication = async res => {
    if (res) {
      // first authentication
      const { url, clientInfo, router, token } = res
      setURLContext(url)
      store.dispatch(storeCredentials(url, clientInfo, token))
      router.replace(defaultRoute())
    } else {
      // when user is already authenticated
      // token can expire so ask stack to replace it
      try {
        const token = await getToken()
        if (
          token &&
          token.accessToken !== getAccessToken(store.getState().mobile)
        ) {
          store.dispatch(setToken(token))
          updateAccessTokenBar(token.accessToken)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e)
      }
    }

    await registerPushNotifications(props.client)
  }

  const setupAuth = isAuthenticated => () => {
    if (!isAuthenticated()) {
      resetClient()
      props.history.replace(`/${AUTH_PATH}`)
      store.dispatch(revokeClient())
    } else {
      onAuthentication()
      const mobile = store.getState().mobile
      const url = getURL(mobile)
      setURLContext(url)
      initBar(url, getAccessToken(mobile), {
        onLogOut: () => {
          onLogout(store, client, props.history.replace)
        }
      })
    }
  }

  const isAuthenticated = () => {
    return store.getState().mobile.client !== null
  }

  const isRevoked = () => {
    return store.getState().mobile.revoked
  }

  return (
    <Wrapped
      {...props}
      {...{ isAuthenticated, isRevoked, onAuthentication, setupAuth }}
    />
  )
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
