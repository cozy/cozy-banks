import React from 'react'
import classNames from 'classnames'
import styles from './Topbar.styl'

export const TopbarTitle = ({ children }) => (
  <div className={styles['Topbar-title']}>
    {children}
  </div>
)

export const TopbarLeft = ({className, children}) => (
  <div className={classNames(styles['Topbar-left'], className)}>
    {children}
  </div>
)

export default TopbarTitle
