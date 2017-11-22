/* global cozy */

import React from 'react'
import styles from './styles.styl'
import withBreakpoints from 'cozy-ui/react/helpers/breakpoints'

const { BarCenter } = cozy.bar

export const Topbar = withBreakpoints()(({ children, breakpoints }) => {
  const title = (
    <div className={styles['Topbar']}>
      {children}
    </div>
  )
  return breakpoints.isMobile
    ? <BarCenter children={ title } />
    : title
})

export default Topbar
