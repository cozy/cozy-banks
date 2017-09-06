import React from 'react'
import classNames from 'classnames'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'
import Sidebar from './Sidebar'
import styles from './Layout.styl'

const Layout = ({ children }) => (
  <div className={classNames(styles['bnk-wrapper'], styles['bnk-sticky'])}>
    <Sidebar />

    <main className={styles['bnk-content']}>
      {children}
    </main>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />
  </div>
)

export default Layout
