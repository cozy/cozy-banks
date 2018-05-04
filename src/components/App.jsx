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
import styles from './App.styl'

const shouldShowAccountSwitch = (location, isMobile) => {
  if (!isMobile) {
    return true
  } else {
    return (
      location.pathname.includes('/transactions') ||
      location.pathname.includes('/categories')
    )
  }
}

const _App = ({ children, location, breakpoints: { isMobile } }) => {
  const showAccountSwitch = shouldShowAccountSwitch(location, isMobile)
  return (
    <Layout>
      {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
      <Sidebar className={styles.AppSidebar}>
        {showAccountSwitch && <AccountSwitch />}
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
