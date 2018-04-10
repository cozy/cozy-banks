/* global __DEVELOPMENT__ */
import React from 'react'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Content } from 'components/Layout'
import { Sidebar } from 'cozy-ui/react'
import { AccountSwitch } from 'ducks/account'
import Nav from 'ducks/commons/Nav'
import FlagSwitcher from 'components/FlagSwitcher'

export default ({ children }) => (
  <Layout>
    {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
    <Sidebar>
      <AccountSwitch />
      <Nav />
    </Sidebar>

    <Content>{children}</Content>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />
  </Layout>
)
