import styles from '../styles/sidebar'

import React, { Component } from 'react'

import Nav from '../containers/Nav'

class Sidebar extends Component {
  render () {
    return (
      <aside class={styles['bnk-sidebar']}>
        <Nav />
      </aside>
    )
  }
}

export default Sidebar
