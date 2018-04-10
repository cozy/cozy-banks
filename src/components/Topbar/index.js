/* global cozy */

import React from 'react'
import styles from './styles.styl'
import { withBreakpoints } from 'cozy-ui/react'

const { BarCenter } = cozy.bar

export const Topbar = withBreakpoints()(
  ({ children, breakpoints: { isMobile } }) => {
    const title = <div className={styles['Topbar']}>{children}</div>
    return isMobile ? <BarCenter children={title} /> : title
  }
)

export default Topbar
