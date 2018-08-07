/* global __TARGET__ */
import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'
import App from 'components/App'

import { TransactionsPage } from 'ducks/transactions'
import { CategoriesPage } from 'ducks/categories'
import {
  Settings,
  AccountSettings,
  AccountsSettings,
  GroupsSettings,
  GroupSettings,
  NewGroupSettings,
  Configuration
} from 'ducks/settings'
import { Balance } from 'ducks/balance'
import { EnsureHasAccounts, EnsureIsFirstSynced } from 'ducks/onboarding'
import flag from 'cozy-flags'

export const ComingSoon = () => <p style="margin-left: 2em">Coming soon!</p>

export const defaultRoute = () =>
  flag('demo') && __TARGET__ === 'browser' ? 'transactions' : 'balances'

const AppRoute = (
  <Route component={EnsureIsFirstSynced}>
    <Route component={EnsureHasAccounts}>
      <Route component={App}>
        <Redirect from="/" to={defaultRoute()} />
        <Route path="balances" component={Balance} />
        <Route path="transactions" component={TransactionsPage} />
        <Route path="categories">
          <IndexRoute component={CategoriesPage} />
          <Route
            path=":categoryName/:subcategoryName"
            component={TransactionsPage}
          />
          <Route path=":categoryName" component={CategoriesPage} />
        </Route>
        <Route path="projections" component={ComingSoon} />
        <Route path="savings" component={ComingSoon} />
        <Route path="settings">
          <Route path="groups/new" component={NewGroupSettings} />
          <Route path="groups/:groupId" component={GroupSettings} />
          <Route path="accounts/:accountId" component={AccountSettings} />
          <Route component={Settings}>
            <IndexRoute component={Configuration} />
            <Route path="accounts" component={AccountsSettings} />
            <Route path="groups" component={GroupsSettings} />
            <Route path="configuration" component={Configuration} />
          </Route>
        </Route>
        <Redirect from="*" to={defaultRoute()} />
      </Route>
    </Route>
  </Route>
)

export default AppRoute
