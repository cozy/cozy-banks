/* global cozy */
import React from 'react'
import styles from './Intent.styl'

class Intent extends React.Component {
  componentDidMount () {
    const { action, docType, data, closeModal } = this.props
    cozy.client.intents
      .create(action, docType, {
        ...data,
        exposeIntentFrameRemoval: true
      })
      .start(this.intentViewer)
      .then(() => {
        closeModal()
      })
  }

  render () {
    return (
      <div
        id='intentViewer'
        className={styles.intentViewer}
        ref={intentViewer => (this.intentViewer = intentViewer)}
      />
    )
  }
}

export default Intent
