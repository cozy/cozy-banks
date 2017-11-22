import React from 'react'
import { Router, Route } from 'react-router'

import Authentication from './Authentication'
import Revoked from './Revoked'
import { resetClient } from './lib/client'
import { setClient, setURL, revokeClient } from 'ducks/mobile'
import { initBar } from 'ducks/authentication/lib/client'
export const AUTH_PATH = 'authentication'

const withAuth = Wrapped => (props, { store }) => {
  const storeCredentials = ({ url, clientInfo, router }) => {
    store.dispatch(setClient(clientInfo))
    store.dispatch(setURL(url))
    router.replace('/')
  }

  const onAuthentication = function (res) {
    if (res) {
      const { url, clientInfo, router } = res
      storeCredentials({ url, clientInfo, router })
    }
    initBar()
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
