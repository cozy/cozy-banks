/* global __DEV__ */
import React from 'react'
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import { Layout, Main, Content, Sidebar } from 'cozy-ui/react'
import Nav from 'ducks/commons/Nav'
import { Warnings } from 'ducks/warnings'
import { FlagSwitcher } from 'cozy-flags'
import styles from 'styles/main.styl'

const ReactHint = ReactHintFactory(React)

const App = ({ children }) => (
  <Layout>
    {__DEV__ ? <FlagSwitcher /> : null}
    <Sidebar>
      <Nav />
    </Sidebar>

    <Main>
      <Content className={styles['c-content']}>{children}</Content>
    </Main>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />

    <Warnings />
  </Layout>
)

export default App
