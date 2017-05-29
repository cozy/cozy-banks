import Modal from 'cozy-ui/react/Modal'
import modalStyles from 'cozy-ui/react/Modal/styles.styl'

import React, { Component } from 'react'
import cx from 'classnames'
import styles from '../styles/modals'

export default class IntentModal extends Component {
  componentDidMount () {
    this.intent = this.props.intent
      .start(this.target)
      .then(this.props.onIntentSuccess)
      .catch(err => this.props.onIntentError(err))
  }

  render ({ style }) {
    return <div style={style} className={ styles['modal--fullscreen'] } >
      <Modal withCross={ true } secondaryAction={ this.props.secondaryAction }>
        <div className={ styles.content } ref={ ref => this.target = ref } />
      </Modal>
    </div>
  }
}
