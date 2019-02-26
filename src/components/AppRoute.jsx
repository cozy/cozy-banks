import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'
import App from 'components/App'

import { TransactionsPageWithBackButton } from 'ducks/transactions'
import { CategoriesPage } from 'ducks/categories'
import {
  Settings,
  AccountSettings,
  AccountsSettings,
  GroupsSettings,
  GroupSettings,
  NewGroupSettings,
  Configuration,
  Debug
} from 'ducks/settings'
import { Balance } from 'ducks/balance'
import { EnsureHasAccounts, EnsureIsFirstSynced } from 'ducks/onboarding'

export const ComingSoon = () => <p style="margin-left: 2em">Coming soon!</p>

const AppRoute = (
  <Route component={EnsureIsFirstSynced}>
    <Route component={EnsureHasAccounts}>
      <Route component={App}>
        <Redirect from="/" to="balances" />
        <Route path="balances">
          <IndexRoute component={Balance} />
          <Route
            path="reimbursements"
            component={TransactionsPageWithBackButton}
          />
          <Route path="details" component={TransactionsPageWithBackButton} />
        </Route>
        <Route path="categories">
          <IndexRoute component={CategoriesPage} />
          <Route
            path=":categoryName/:subcategoryName"
            component={TransactionsPageWithBackButton}
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
            <Route path="debug" component={Debug} />
          </Route>
        </Route>
        <Redirect from="*" to="balances" />
      </Route>
    </Route>
  </Route>
)

export default AppRoute
