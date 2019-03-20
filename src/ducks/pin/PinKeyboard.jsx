import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

import styles from 'ducks/pin/styles'
import Round from 'ducks/pin/Round'
import FingerprintButton from 'ducks/pin/FingerprintButton'

class PinKeyboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess.bind(this)
    this.handleFingerprintError = this.handleFingerprintError.bind(this)
    this.handleFingerprintCancel = this.handleFingerprintCancel.bind(this)
  }

  handleFingerprintSuccess() {
    this.props.onSuccess()
  }

  handleFingerprintError() {
    this.props.onError()
  }

  handleFingerprintCancel() {
    this.props.onCancel()
  }

  render() {
    return (
      <div className={styles.PinKeyboard}>
        {range(1, 10).map(n => (
          <Round key={n}>{n}</Round>
        ))}
        <FingerprintButton
          onSuccess={this.handleFingerprintSuccess}
          onError={this.handleFingerprintError}
          onCancel={this.handleFingerprintCancel}
        />
        <Round>0</Round>
        <Round className="u-hide" />
      </div>
    )
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }
}

export default PinKeyboard
