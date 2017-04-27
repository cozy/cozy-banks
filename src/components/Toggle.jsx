import styles from '../styles/toggle.styl'

import React, { Component } from 'react'

class Toggle extends Component {
  render () {
    return (
      <span className={styles['toggle']}>
        <input type="checkbox" name="checkbox1" id="checkbox1" className={styles['checkbox']} />
        <label for="checkbox1" className={styles['label']}></label>
      </span>
    )
  }
}

export default Toggle
