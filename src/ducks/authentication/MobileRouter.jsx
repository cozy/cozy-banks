import React from 'react'
import { Router, Route } from 'react-router'

import { Authentication, Revoked } from 'cozy-authentication'
import { storeCredentials, revokeClient, setToken, getURL, getAccessToken, setInitialSyncStatus, registerPushNotifications, unregisterPushNotifications } from 'ducks/mobile'
import { initBar, updateAccessTokenBar, resetClient, getToken, getDeviceName } from 'ducks/authentication/lib/client'
export const AUTH_PATH = 'authentication'

const withAuth = Wrapped => (props, { store, router, client }) => {
  const onAuthentication = async (res) => {
    if (res) {
      // first authentication
      const { url, clientInfo, router, token } = res
      store.dispatch(storeCredentials(url, clientInfo, token))
      router.replace('/')
    } else {
      // when user is already authenticated
      // token can expire so ask stack to replace it
      try {
        const token = await getToken()
        if (token && token.accessToken !== getAccessToken(store.getState().mobile)) {
          store.dispatch(setToken(token))
          updateAccessTokenBar(token.accessToken)
        }
      } catch (e) {
        console.warn(e)
      }
    }

    store.dispatch(registerPushNotifications(getDeviceName()))
  }

  const onLogout = () => {
    const mobile = store.getState().mobile
    resetClient(mobile.client, client)
    setInitialSyncStatus(false)
    store.dispatch(unregisterPushNotifications(getDeviceName()))
    props.history.replace(`/${AUTH_PATH}`)
  }

  const setupAuth = (isAuthenticated, router) => (nextState, replace) => {
    if (!isAuthenticated()) {
      resetClient()
      replace({
        pathname: `/${AUTH_PATH}`
      })
      store.dispatch(revokeClient())
    } else {
      onAuthentication()
      const mobile = store.getState().mobile
      initBar(getURL(mobile), getAccessToken(mobile), {
        onLogOut: onLogout
      })
    }
  }

  const isAuthenticated = () => {
    return store.getState().mobile.client !== null
  }

  const isRevoked = () => {
    return store.getState().mobile.revoked
  }

  return <Wrapped {...props} {...{ isAuthenticated, isRevoked, onAuthentication, setupAuth }} />
}

const logException = () => {
  console.log('exception during auth')
}

const MobileRouter = ({ router, history, routes, isAuthenticated, isRevoked, onAuthentication, setupAuth }, { store, client }) => {
  return (
    <Router history={history}>
      <Route>
        <Route path={AUTH_PATH} component={(props) => (
          <Authentication {...props}
            router={history}
            onComplete={onAuthentication}
            onException={logException}
          />
        )} />
        <Route onEnter={setupAuth(isAuthenticated, router)} component={(props, context) => {
          const revoked = isRevoked()
          return revoked
            ? <Revoked {...props}
              router={history}
              revoked={isRevoked()}
              onLogBackIn={onAuthentication} />
            : props.children
        }}>
          {routes}
        </Route>
      </Route>
    </Router>
  )
}

export default withAuth(MobileRouter)
