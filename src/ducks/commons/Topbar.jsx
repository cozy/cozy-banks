/* global cozy */

import React from 'react'
import styles from './Topbar.styl'
import withBreakpoints from 'utils/breakpointsAware'

const { BarCenter } = cozy.bar

export const Topbar = withBreakpoints()(({ children, breakpoints }) => {
  const title = (
    <div className={styles['Topbar-title']}>
      {children}
    </div>
  )
  return breakpoints.isMobile
    ? <BarCenter children={title} />
    : title
})

export default Topbar
