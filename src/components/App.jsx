import React from 'react'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Sidebar, Content } from 'components/Layout'
import { AccountSwitch } from 'ducks/account'
import Nav from 'ducks/commons/Nav'

export default ({ children }) => (
  <Layout>
    <Sidebar>
      <AccountSwitch />
      <Nav />
    </Sidebar>

    <Content>
      {children}
    </Content>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />
  </Layout>
)
