import React, { useEffect } from 'react'

import flag from 'cozy-flags'
import { queryConnect } from 'cozy-client'
import { withRouter } from 'react-router'
import compose from 'lodash/flowRight'
import CozyDevTools from 'cozy-client/dist/devtools'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Content, Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import UISidebar from 'cozy-ui/transpiled/react/Sidebar'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { settingsConn } from 'doctypes'

import Nav from 'ducks/commons/Nav'
import { Warnings } from 'ducks/warnings'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { pinGuarded } from 'ducks/pin'

import ErrorBoundary from 'components/ErrorBoundary'
import ReactHint from 'components/ReactHint'
import RouterContext from 'components/RouterContext'
import AppSearchBar from 'components/AppSearchBar'
import useKeyboardState from 'components/useKeyboardState'

import banksPanels from 'ducks/devtools/banksPanels'
import {
  useRequestStateContext,
  REQUEST_FAILED
} from 'ducks/context/RequestStateContext'

import styles from './App.styl'
import { getActivatePouch } from 'ducks/client/links'

const KeyboardAwareSidebar = ({ children }) => {
  const showing = useKeyboardState()
  return showing ? null : <UISidebar>{children}</UISidebar>
}

const App = props => {
  const { requestState, setRequestState } = useRequestStateContext()
  const { showBottomNav, settingsCollection } = props
  const settings = getDefaultedSettingsFromCollection(settingsCollection)
  const { t } = useI18n()

  useEffect(() => {
    if (!getActivatePouch() && requestState === REQUEST_FAILED) {
      Alerter.error(t('Error.fetch-error'), {
        buttonText: t('General.reload'),
        buttonAction: () => window.location.reload()
      })
      setRequestState(null) // Reset network state
    }
  }, [requestState, setRequestState, t])

  useEffect(() => {
    flag('local-model-override', settings.community.localModelOverride.enabled)
  }, [settings.community.localModelOverride.enabled])

  return (
    <RouterContext.Provider value={props.router}>
      <AppSearchBar />
      <Layout>
        {showBottomNav && (
          <KeyboardAwareSidebar>
            <Nav />
          </KeyboardAwareSidebar>
        )}

        <Main>
          <Content className={styles.Main}>
            <ErrorBoundary>{props.children}</ErrorBoundary>
          </Content>
        </Main>

        {/* Outside every other component to bypass overflow:hidden */}
        <ReactHint />

        <Warnings />
        <Alerter />
      </Layout>
      {flag('debug') ? <CozyDevTools panels={banksPanels} /> : null}
    </RouterContext.Provider>
  )
}

App.defaultProps = {
  showBottomNav: true
}

export default compose(
  pinGuarded({
    timeout: flag('pin.debug') ? 10 * 1000 : undefined,
    showTimeout: flag('pin.debug')
  }),
  queryConnect({ settingsCollection: settingsConn }),
  withRouter
)(App)
