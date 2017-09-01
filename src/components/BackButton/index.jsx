import React from 'react'
import { TopbarLeft } from 'ducks/commons/Topbar'
import styles from './style.styl'

export default ({ children }) => (
  <TopbarLeft className={styles['back-button']}>
    { children }
  </TopbarLeft>
)
