import React from 'react'
import PropTypes from 'prop-types'

import { queryConnect } from 'cozy-client'
import Alerter from 'cozy-ui/react/Alerter'
import { translate } from 'cozy-ui/react/I18n'
import compose from 'lodash/flowRight'

import PinKeyboard from 'ducks/pin/PinKeyboard'
import FingerprintButton from 'ducks/pin/FingerprintButton'
import { pinSetting } from 'ducks/pin/queries'

/**
 * Show pin keyboard and fingerprint button.
 * When user confirms, checks if it is the right pin and
 * calls onSuccess.
 */
class PinAuth extends React.Component {
  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess.bind(this)
    this.handleFingerprintError = this.handleFingerprintError.bind(this)
    this.handleFingerprintCancel = this.handleFingerprintCancel.bind(this)
    this.handleConfirmKeyboard = this.handleConfirmKeyboard.bind(this)
  }

  handleFingerprintSuccess() {
    this.props.onSuccess()
  }

  handleFingerprintError() {
    const { t } = this.props.t
    Alerter.info(t('Pin.bad-pin'))
  }

  handleFingerprintCancel() {
    // this.props.onCancel()
  }

  handleConfirmKeyboard(val) {
    const { pinSetting, t } = this.props
    const pinDoc = pinSetting.data
    if (!pinDoc) {
      Alerter.info(t('Pin.no-pin-configured'))
      this.props.onSuccess()
    } else {
      if (val === pinDoc.pin) {
        this.props.onSuccess()
      } else {
        Alerter.info(t('Pin.bad-pin'))
      }
    }
  }

  render() {
    return (
      <div>
        <FingerprintButton
          onSuccess={this.handleFingerprintSuccess}
          onError={this.handleFingerprintError}
          onCancel={this.handleFingerprintCancel}
        />
        <PinKeyboard onConfirm={this.handleConfirmKeyboard} />
      </div>
    )
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }
}

export default compose(
  translate(),
  queryConnect({
    pinSetting
  })
)(PinAuth)
