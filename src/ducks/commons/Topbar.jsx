import React from 'react'
import styles from './Topbar.styl'

const Topbar = ({ children }) => (
  <div className={styles['fil-topbar']}>
    {children}
  </div>
)

export default Topbar
