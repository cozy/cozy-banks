/* global cozy */
import React from 'react'
import styles from './Intent.styl'

/*
 * This component aims to create intent and call function on the end
 */

class Intent extends React.Component {
  componentDidMount () {
    const { action, docType, data, callback } = this.props
    cozy.client.intents
      .create(action, docType, {
        ...data,
        exposeIntentFrameRemoval: true
      })
      .start(this.intentViewer)
      .then(() => {
        callback()
      })
  }

  render () {
    return (
      <div
        className={styles.intentViewer}
        ref={intentViewer => (this.intentViewer = intentViewer)}
      />
    )
  }
}

export default Intent
