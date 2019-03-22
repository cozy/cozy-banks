import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'

import { queryConnect } from 'cozy-client'
import Alerter from 'cozy-ui/react/Alerter'
import { translate } from 'cozy-ui/react/I18n'

import PinKeyboard from 'ducks/pin/PinKeyboard'
import FingerprintButton from 'ducks/pin/FingerprintButton'
import { pinSetting } from 'ducks/pin/queries'

const MAX_ATTEMPT = 5

const AttemptCount_ = ({ t, current, max }) => {
  return <div>{t('Pin.attempt-count', { current, max })}</div>
}

const AttemptCount = translate()(AttemptCount_)

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
    this.handleEnteredPin = this.handleEnteredPin.bind(this)
    this.state = { attempt: 0 }
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
    const { attempt } = this.state
    return (
      <div>
        {attempt ? <AttemptCount max={5} current={attempt} /> : null}
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
