import React from 'react'
import { Router, Route } from 'react-router'

import Authentication from './Authentication'
import Revoked from './Revoked'
import { resetClient } from './lib/client'

export const AUTH_PATH = 'authentication'

const redirectToAuth = (isAuthenticated, router) => (nextState, replace) => {
  if (!isAuthenticated()) {
    resetClient()
    replace({
      pathname: `/${AUTH_PATH}`
    })
  }
}

const MobileRouter = ({ router, history, appRoutes, isAuthenticated, isRevoked, onAuthenticated }) => (
  <Router history={history}>
    <Route>
      <Route onEnter={redirectToAuth(isAuthenticated, router)} component={(props) => <Revoked {...props} revoked={isRevoked()} onLogBackIn={onAuthenticated} />}>
        {appRoutes}
      </Route>
      <Route path={AUTH_PATH} component={(props) => <Authentication {...props} onComplete={onAuthenticated} />} />
    </Route>
  </Router>
)

export default MobileRouter
