import React from 'react'
import { Route, Redirect } from 'react-router'
import { Layout } from 'ducks/commons'

import Movements from 'containers/Movements'
import { CategoriesPage } from 'ducks/categories'
import { Settings } from 'ducks/settings'
import { Balance } from 'ducks/balance'
import { AccountSettings } from 'ducks/account'
import GroupSettings, { NewGroupSettings } from 'components/GroupSettings'

export const ComingSoon = () => (<p style='margin-left: 2em'>Coming soon!</p>)

const AppRoute = (
  <Route component={Layout}>
    <Redirect from='/' to='movements' />
    <Route path='currentBalance' component={Balance} />
    <Route path='movements' component={Movements} />
    <Route path='categories' component={CategoriesPage} />
    <Route path='projections' component={ComingSoon} />
    <Route path='savings' component={ComingSoon} />
    <Route path='settings/accounts/:accountId' component={AccountSettings} />
    <Route path='settings/groups/new' component={NewGroupSettings} />
    <Route path='settings/groups/:groupId' component={GroupSettings} />
    <Route path='settings(/:tab)' component={Settings} />
    <Redirect from='*' to='/' />
  </Route>
)

export default AppRoute
