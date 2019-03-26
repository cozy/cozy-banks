import React from 'react'
import compose from 'lodash/flowRight'
import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import PinWrapper from 'ducks/pin/PinWrapper'
import PinAuth from 'ducks/pin/PinAuth'
import { withCached, pinIdentity } from 'ducks/pin/queries'

/**
 * Protects children with a Pin.
 * User can cancel.
 */
class PinRestrictedArea extends React.Component {
  constructor(props) {
    super(props)
    this.handlePinSuccess = this.handlePinSuccess.bind(this)
  }

  state = { hasEnteredPin: false }

  handlePinSuccess() {
    this.setState({ hasEnteredPin: true })
  }

  render() {
    const { children, t, pinSetting, onCancel } = this.props

    if (!pinSetting || !pinSetting.pin || this.state.hasEnteredPin) {
      return children
    }

    return (
      <PinWrapper>
        <PinAuth
          message={t('Pin.enter-pin-restricted-area')}
          onSuccess={this.handlePinSuccess}
        />
        <Button icon="back" onClick={onCancel}>
          {t('General.back')}
        </Button>
      </PinWrapper>
    )
  }
}

export default compose(
  translate(),
  withCached({
    pinSetting: pinIdentity
  })
)(PinRestrictedArea)
