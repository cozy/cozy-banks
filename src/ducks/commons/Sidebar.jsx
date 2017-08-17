import React, { Component } from 'react'
import { AccountSwitch } from 'ducks/account'
import Nav from './Nav'
import styles from './Sidebar.styl'

const Sidebar = () => (
  <aside class={styles['bnk-sidebar']}>
    <AccountSwitch />
    <Nav />
  </aside>
)

export default Sidebar
