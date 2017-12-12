import React from 'react'
import { Router, Route } from 'react-router'

import Authentication from './Authentication'
import Revoked from './Revoked'
import { resetClient, getToken } from './lib/client'
import { storeCredentials, revokeClient, setToken, getURL, getAccessToken } from 'ducks/mobile'
import { initBar, updateAccessTokenBar } from 'ducks/authentication/lib/client'
export const AUTH_PATH = 'authentication'

const withAuth = Wrapped => (props, { store }) => {
  const onAuthentication = async (res) => {
    if (res) {
      // first authentication
      const { url, clientInfo, router, token } = res
      store.dispatch(storeCredentials(url, clientInfo, token))
      router.replace('/')
    }
    initBar(getURL(store.getState().mobile), getAccessToken(store.getState().mobile))
    if (!res) {
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
  }

  const checkAuth = (isAuthenticated, router) => (nextState, replace) => {
    if (!isAuthenticated()) {
      resetClient()
      replace({
        pathname: `/${AUTH_PATH}`
      })
      store.dispatch(revokeClient())
    } else {
      onAuthentication()
    }
  }

  const isAuthenticated = () => {
    return store.getState().mobile.client !== null
  }

  const isRevoked = () => {
    return store.getState().mobile.revoked
  }

  return <Wrapped {...props} {...{ isAuthenticated, isRevoked, onAuthentication, checkAuth }} />
}

const MobileRouter = ({ router, history, routes, isAuthenticated, isRevoked, onAuthentication, checkAuth }) => {
  return (
    <Router history={history}>
      <Route>
        <Route path={AUTH_PATH} component={(props) => <Authentication {...props} onComplete={onAuthentication} />} />
        <Route onEnter={checkAuth(isAuthenticated, router)} component={(props) => <Revoked {...props} revoked={isRevoked()} onLogBackIn={onAuthentication} />}>
          {routes}
        </Route>
      </Route>
    </Router>
  )
}

export default withAuth(MobileRouter)
