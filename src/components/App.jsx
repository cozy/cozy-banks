/* global __DEVELOPMENT__ */
import React from 'react'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Content } from 'components/Layout'
import { Sidebar } from 'cozy-ui/react'
import Nav from 'ducks/commons/Nav'
import FlagSwitcher from 'components/FlagSwitcher'
import styles from './App.styl'

const App = ({ children }) => (
  <Layout>
    {__DEVELOPMENT__ ? <FlagSwitcher /> : null}
    <Sidebar className={styles.AppSidebar}>
      <Nav />
    </Sidebar>

    <Content>{children}</Content>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />
  </Layout>
)

export default App
