/* global __DEVELOPMENT__ */
import React from 'react'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Content } from 'components/Layout'
import { Sidebar } from 'cozy-ui/react'
import Nav from 'ducks/commons/Nav'
import { Warnings } from 'ducks/warnings'
import FlagSwitcher from 'components/FlagSwitcher'

const ReactHint = ReactHintFactory(React)

const App = ({ children }) => (
  <Layout>
    {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
    <Sidebar>
      <Nav />
    </Sidebar>

    <Content>{children}</Content>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />

    <Warnings />
  </Layout>
)

export default App
