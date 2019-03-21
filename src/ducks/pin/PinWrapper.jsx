import React from 'react'
import LockedBody from 'ducks/pin/LockedBody'
import styles from 'ducks/pin/styles.styl'
import BarTheme from 'ducks/mobile/BarTheme'

const PinWrapper = ({ children }) => (
  <LockedBody>
    <BarTheme theme="primary" />
    <div className={styles.PinWrapper}>{children}</div>
  </LockedBody>
)

export default PinWrapper
