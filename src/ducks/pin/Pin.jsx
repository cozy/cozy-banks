/* global Fingerprint */

import React from 'react'
import range from 'lodash/range'
import styles from './styles.styl'

const Round = props => {
  return <span {...props} className={styles.Round} />
}

class FingerprintAuthButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.checkForFingerprintSystem()
  }

  checkForFingerprintSystem() {
    Fingerprint.isAvailable(
      () => {
        this.setState({ methods: 'finger' })
      },
      () => {
        this.setState({ methods: null })
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
      this.props.onError
    )
  }

  render() {
    return this.state.finger ? <Round>F</Round> : null
  }
}

export default class Pin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess()
    this.handleFingerprintError = this.handleFingerprintError()
  }

  handleFingerprintSuccess(res) {
    console.log('success', res)
  }

  handleFingerprintError(res) {
    console.log('error', res)
  }

  render() {
    return (
      <div>
        <div>
          {range(1, 9).map(n => (
            <Round children={n} />
          ))}
        </div>
        <FingerprintAuthButton
          onSuccess={this.handleFingerprintSuccess}
          onError={this.handleFingerprintError}
        />
        <Round children={0} />
      </div>
    )
  }
}
