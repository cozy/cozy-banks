import styles from 'styles/app'

import React from 'react'
import classNames from 'classnames'

import Sidebar from 'components/Sidebar'

export const App = ({ children }) => (
  <div className={classNames(styles['bnk-wrapper'], styles['bnk-sticky'])}>
    <Sidebar />

    <main className={styles['bnk-content']}>
      { children }
    </main>
  </div>
)

export default App
