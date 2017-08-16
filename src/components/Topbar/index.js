/* global __TARGET__ */
import styles from './styles.styl'

import React from 'react'

const Topbar = ({ children }) => (
  <div className={styles['fil-topbar']}>
    {children}
  </div>
)

export default Topbar
