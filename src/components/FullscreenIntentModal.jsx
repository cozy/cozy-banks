import Modal from 'cozy-ui/react/Modal'

import React, { Component } from 'react'
import styles from '../styles/modals'

export default class IntentModal extends Component {
  componentDidMount () {
    this.intent = this.props.intent
      .start(this.target)
      .then(this.props.onIntentSuccess)
      .catch(err => this.props.onIntentError(err))
  }

  saveRef (ref) {
    this.target = ref
  }

  render ({ style }) {
    return <div style={style} className={styles['modal--fullscreen']} >
      <Modal withCross secondaryAction={this.props.secondaryAction}>
        <div className={styles.content} ref={ this.saveRef } />
      </Modal>
    </div>
  }
}
