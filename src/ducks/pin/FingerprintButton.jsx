/* global Fingerprint */
import React from 'react'

class FingerprintButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.checkForFingerprintSystem()
  }

  checkForFingerprintSystem() {
    if (typeof Fingerprint === 'undefined') {
      return
    }
    Fingerprint.isAvailable(
      () => {
        this.showFingerprintAuth()
      },
      () => {}
    )
  }

  showFingerprintAuth() {
    Fingerprint.show(
      {
        clientId: 'cozy-banks',
        clientSecret: 'cozy-banks' //Only necessary for Android
      },
      this.props.onSuccess,
      this.handleError
    )
  }

  handleError(err) {
    if (err.indexOf('Canceled by user') > 0) {
      this.props.onCancel(err)
    } else {
      this.props.onError(err)
    }
  }

  render() {
    return null
  }
}

export default FingerprintButton
