import styles from '../styles/sidebar'

import React, { Component } from 'react'

import AccountSwitch from '../containers/AccountSwitch'
import Nav from '../containers/Nav'

class Sidebar extends Component {
  render () {
    return (
      <aside class={styles['bnk-sidebar']}>
        <AccountSwitch />
        <Nav />
      </aside>
    )
  }
}

export default Sidebar
