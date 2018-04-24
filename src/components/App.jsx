/* global __DEVELOPMENT__ */
import React from 'react'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Content } from 'components/Layout'
import { Sidebar } from 'cozy-ui/react'
import { AccountSwitch } from 'ducks/account'
import Nav from 'ducks/commons/Nav'
import FlagSwitcher from 'components/FlagSwitcher'
import { withBreakpoints } from 'cozy-ui/react'

const _App = ({ children, location, breakpoints: { isMobile } }) => {
  const onBalancePage = location.pathname === '/balances'
  const showFilters = (onBalancePage && !isMobile) || !onBalancePage

  return (
    <Layout>
      {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
      <Sidebar>
        {showFilters && <AccountSwitch />}
        <Nav />
      </Sidebar>

      <Content>{children}</Content>

      {/* Outside every other component to bypass overflow:hidden */}
      <ReactHint />
    </Layout>
  )
}
const App = withBreakpoints()(_App)

export default App
