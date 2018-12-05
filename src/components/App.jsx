/* global __DEV__ */
import React from 'react'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Main, Content, Sidebar, IconSprite } from 'cozy-ui/react'
import Nav from 'ducks/commons/Nav'
import { Warnings } from 'ducks/warnings'
import flag, { FlagSwitcher } from 'cozy-flags'
import { settingsConn } from 'doctypes'
import { queryConnect } from 'cozy-client'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'

const ReactHint = ReactHintFactory(React)

const App = props => {
  const settings = getDefaultedSettingsFromCollection(props.settingsCollection)
  flag('local-model-override', settings.community.localModelOverride.enabled)

  return (
    <Layout>
      {__DEV__ ? <FlagSwitcher /> : null}
      <Sidebar>
        <Nav />
      </Sidebar>

      <Main>
        <Content>{props.children}</Content>
      </Main>

      {/* Outside every other component to bypass overflow:hidden */}
      <ReactHint />

      <Warnings />
      <IconSprite />
    </Layout>
  )
}
export default queryConnect({ settingsCollection: settingsConn })(App)
