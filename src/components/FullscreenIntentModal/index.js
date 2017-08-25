import React, { Component } from 'react'
import Modal from 'cozy-ui/react/Modal'
import styles from './styles.styl'

class FullscreenIntentModal extends Component {
  componentDidMount () {
    this.intent = this.props.intent
      .start(this.target)
      .then(this.props.onIntentSuccess)
      .catch(err => this.props.onIntentError(err))
  }

  saveRef = ref => {
    this.target = ref
  }

  render ({ style }) {
    return (
      <div style={style} className={styles['modal--fullscreen']} >
        <Modal overflowHidden withCross secondaryAction={this.props.secondaryAction}>
          <div className={styles.content} ref={this.saveRef} />
        </Modal>
      </div>
    )
  }
}

export default FullscreenIntentModal
