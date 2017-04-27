import styles from '../styles/toggle.styl'

import React, { Component } from 'react'

class Toggle extends Component {
  onChange () {
    if (this.props.onToggle) {
      this.props.onToggle(!this.props.checked)
    }
  }
  render (props, state) {
    return (
      <span className={styles['toggle']}>
        <input type="checkbox" name={props.name} id={props.name} className={styles['checkbox']} checked={props.checked} onChange={this.onChange.bind(this)} />
        <label for={props.name} className={styles['label']} />
      </span>
    )
  }
}

export default Toggle
