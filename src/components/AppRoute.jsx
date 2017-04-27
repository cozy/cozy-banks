import React from 'react'
import { Route, Redirect } from 'react-router'
import App from './App'

import Movements from '../containers/Movements'
import Categories from '../containers/Categories'
import Parametres from '../containers/Parametres'

export const ComingSoon = () => (<p style='margin-left: 2em'>Coming soon!</p>)

const AppRoute = (
  <Route component={App}>
    <Redirect from='/' to='movements' />
    <Route path='currentBalance' component={ComingSoon} />
    <Route path='movements' component={Movements} />
    <Route path='categories' component={Categories} />
    <Route path='projections' component={ComingSoon} />
    <Route path='savings' component={ComingSoon} />
    <Route path='settings' component={Parametres} />
  </Route>
)

export default AppRoute
