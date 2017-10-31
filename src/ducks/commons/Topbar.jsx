/* global cozy */

import React from 'react'
import classNames from 'classnames'
import styles from './Topbar.styl'
import withBreakpoints from 'utils/breakpointsAware'

const { BarCenter, BarLeft } = cozy.bar

export const TopbarTitle = withBreakpoints()(({ children, breakpoints }) => {
  return breakpoints.isMobile ? <BarCenter>
    <div className={styles['Topbar-title']}>
      {children}
    </div>
  </BarCenter> : <div className={styles['Topbar-title']}>
    {children}
  </div>
})

export const TopbarLeft = ({className, children}) => (
  <BarLeft>
    <div className={classNames(styles['Topbar-left'], className)}>
      {children}
    </div>
  </BarLeft>
)

export default TopbarTitle
