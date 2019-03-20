/* global Fingerprint */
import React from 'react'
import Round from 'ducks/pin/Round'

class FingerprintButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    this.checkForFingerprintSystem()
  }

  checkForFingerprintSystem() {
    Fingerprint.isAvailable(
      method => {
        this.setState({ method })
      },
      error => {
        this.setState({ method: null, error })
      }
    )
  }

  handleClick() {
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
    return this.state.method ? (
      <Round onClick={this.handleClick}>F</Round>
    ) : (
      <Round className="u-hide" />
    )
  }
}

export default FingerprintButton
