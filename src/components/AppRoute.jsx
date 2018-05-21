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
  NewGroupSettings
} from 'ducks/settings'
import Notifications from 'ducks/settings/Notifications'
import { Balance } from 'ducks/balance'
import { EnsureHasAccounts, EnsureIsFirstSynced } from 'ducks/onboarding'
import WarningsPage from 'ducks/warnings/WarningsPage'
import flag from 'utils/flag'

export const ComingSoon = () => <p style="margin-left: 2em">Coming soon!</p>

const AppRoute = (
  <Route component={EnsureIsFirstSynced}>
    <Route component={EnsureHasAccounts}>
      <Route path="/warnings" component={WarningsPage} />
      <Route component={App}>
        <Redirect from="/" to={flag('demo') ? 'transactions' : 'balances'} />
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
            <IndexRoute component={Notifications} />
            <Route path="accounts" component={AccountsSettings} />
            <Route path="groups" component={GroupsSettings} />
            <Route path="notifications" component={Notifications} />
          </Route>
        </Route>
        <Redirect from="*" to="/transactions" />
      </Route>
    </Route>
  </Route>
)

export default AppRoute
