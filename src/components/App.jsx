import styles from 'styles/app'

import React from 'react'
import classNames from 'classnames'

import Sidebar from 'components/Sidebar'
import ReactHint from 'react-hint'
import 'react-hint/css/index.css'

export const App = ({ children }) => (
  <div className={classNames(styles['bnk-wrapper'], styles['bnk-sticky'])}>
    <Sidebar />

    <main className={styles['bnk-content']}>
      { children }
    </main>

    {/* Outside every other component to bypass overflow:hidden */}
    <ReactHint />
  </div>
)

export default App
