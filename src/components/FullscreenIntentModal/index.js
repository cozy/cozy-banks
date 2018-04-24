import React, { Component } from 'react'
import Portal from 'preact-portal'
import Modal from 'cozy-ui/react/Modal'
import styles from './styles.styl'

class FullscreenIntentModal extends Component {
  componentDidMount() {
    this.intent = this.props.intent
      .start(this.target)
      .then(this.props.onIntentSuccess)
      .catch(err => this.props.onIntentError(err))
  }

  saveRef = ref => {
    this.target = ref
  }

  render({ style }) {
    return (
      <Portal into="body">
        <div style={style} className={styles['modal--fullscreen']}>
          <Modal overflowHidden dismissAction={this.props.dismissAction}>
            <div className={styles.content} ref={this.saveRef} />
          </Modal>
        </div>
      </Portal>
    )
  }
}

export default FullscreenIntentModal
