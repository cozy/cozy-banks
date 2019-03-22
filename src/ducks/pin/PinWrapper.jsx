import React from 'react'
import LockedBody from 'ducks/pin/LockedBody'
import styles from 'ducks/pin/styles.styl'
import BarTheme from 'ducks/mobile/BarTheme'
import Portal from 'cozy-ui/react/Portal'

const PinWrapper = ({ children }) => (
  <LockedBody>
    <BarTheme theme="primary" />
    <Portal into="body">
      <div className={styles.PinWrapper}>{children}</div>
    </Portal>
  </LockedBody>
)

export default PinWrapper
