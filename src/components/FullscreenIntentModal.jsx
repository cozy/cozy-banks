import Modal from 'cozy-ui/react/Modal'

import React, { Component } from 'react'
import styles from 'styles/modals'

export default class FullscreenIntentModal extends Component {
  constructor () {
    super()
    this.saveRef = this.saveRef.bind(this)
  }

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
      <Modal overflowHidden withCross secondaryAction={this.props.secondaryAction}>
        <div className={styles.content} ref={this.saveRef} />
      </Modal>
    </div>
  }
}
