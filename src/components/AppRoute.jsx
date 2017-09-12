import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'
import App from 'components/App'

import { OperationsPage } from 'ducks/operations'
import { CategoriesPage } from 'ducks/categories'
import { Settings, AccountSettings, AccountsSettings, GroupsSettings, GroupSettings, NewGroupSettings } from 'ducks/settings'
import Notifications from 'ducks/settings/Notifications'
import { Balance } from 'ducks/balance'
import { EnsureHasAccounts } from 'ducks/onboarding'

export const ComingSoon = () => (<p style='margin-left: 2em'>Coming soon!</p>)

const AppRoute = (
  <Route component={EnsureHasAccounts}>
    <Route component={App}>
      <Redirect from='/' to='movements' />
      <Route path='currentBalance' component={Balance} />
      <Route path='movements' component={OperationsPage} />
      <Route path='categories' component={CategoriesPage} />
      <Route path='projections' component={ComingSoon} />
      <Route path='savings' component={ComingSoon} />
      <Route path='settings'>
        <Route path='groups/new' component={NewGroupSettings} />
        <Route path='groups/:groupId' component={GroupSettings} />
        <Route path='accounts/:accountId' component={AccountSettings} />
        <Route component={Settings}>
          <IndexRoute component={AccountsSettings} />
          <Route path='accounts' component={AccountsSettings} />
          <Route path='groups' component={GroupsSettings} />
          <Route path='notifications' component={Notifications} />
        </Route>
      </Route>
    </Route>
  </Route>
)

export default AppRoute
