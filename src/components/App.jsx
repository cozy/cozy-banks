/* global __DEV__ */
import React from 'react'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import Alerter from 'cozy-ui/react/Alerter'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import Sidebar from 'cozy-ui/react/Sidebar'
import Nav from 'ducks/commons/Nav'
import { Warnings } from 'ducks/warnings'
import flag, { FlagSwitcher } from 'cozy-flags'
import { settingsConn } from 'doctypes'
import { queryConnect } from 'cozy-client'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import ErrorBoundary, { Error } from 'components/ErrorBoundary'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import { hasParameter } from 'utils/qs'
import { pinGuarded } from 'ducks/pin'

const ReactHint = ReactHintFactory(React)

const App = props => {
  const settings = getDefaultedSettingsFromCollection(props.settingsCollection)
  flag('local-model-override', settings.community.localModelOverride.enabled)
  flag(
    'late-health-reimbursement-limit',
    settings.notifications.lateHealthReimbursement.value
  )

  return (
    <Layout>
      {__DEV__ ? <FlagSwitcher /> : null}
      <Sidebar>
        <Nav />
      </Sidebar>

      <Main>
        <Content>
          {hasParameter(props.location.query, 'error') ? (
            <Error />
          ) : (
            <ErrorBoundary>{props.children}</ErrorBoundary>
          )}
        </Content>
      </Main>

      {/* Outside every other component to bypass overflow:hidden */}
      <ReactHint />

      <Warnings />
      <Alerter />
    </Layout>
  )
}

export default compose(
  // When removing the pin flag, do not forget to replace the exports (uncomment)
  // in ducks/pin/index.browser.jsx so that pin functionality is not included
  // in browsers
  flag('pin') ? pinGuarded({}) : x => x,
  queryConnect({ settingsCollection: settingsConn }),
  withRouter
)(App)
