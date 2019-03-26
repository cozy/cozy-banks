import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'

import { translate } from 'cozy-ui/react'
import Alerter from 'cozy-ui/react/Alerter'
import Spinner from 'cozy-ui/react/Spinner'
import Icon from 'cozy-ui/react/Icon'
import { queryConnect, withMutations } from 'cozy-client'

import PinKeyboard from 'ducks/pin/PinKeyboard'
import PinWrapper from 'ducks/pin/PinWrapper'
import PinButton from 'ducks/pin/PinButton'
import { pinSetting } from 'ducks/pin/queries'
import { SETTINGS_DOCTYPE } from 'doctypes'
import styles from 'ducks/pin/styles.styl'
import { PIN_MAX_LENGTH } from 'ducks/pin/constants'
import PinRestrictedArea from 'ducks/pin/PinRestrictedArea'

/**
 * Handles pin edit
 *  - user has to repeat
 *  - show error if both pin are not the same
 *  - show spinner while pin in saving
 **/
class PinEditView extends React.Component {
  state = {
    pin1: null,
    error: null,
    value: '',
    saving: false
  }

  constructor(props) {
    super(props)
    this.handleKeyboardChange = this.handleKeyboardChange.bind(this)
  }

  componentDidMount() {
    document.addEventListener('back', this.props.onExit)
  }

  componentWillUnmount() {
    document.removeEventListener('back', this.props.onExit)
  }

  async savePin(pinValue) {
    const doc = this.props.pinSetting.data
    await this.props.saveDocument({
      _type: SETTINGS_DOCTYPE,
      _id: 'pin',
      ...doc,
      pin: pinValue
    })
  }

  async checkToSave(pin) {
    const t = this.props.t
    if (this.state.pin1) {
      if (this.state.pin1 === pin) {
        this.setState({ saving: true })
        try {
          await this.savePin(pin)
        } catch (e) {
          Alerter.error(t('Pin.error-save'))
          throw e
        } finally {
          this.setState({ saving: false })
        }
        Alerter.success(t('Pin.successfully-changed'))
        this.props.onSaved()
      } else {
        this.setState({ error: 'different-pins', pin1: null, value: '' })
      }
    } else {
      this.setState({ error: null, pin1: pin, value: '' })
    }
  }

  handleKeyboardChange(value) {
    this.setState({ value })
    if (value.length === PIN_MAX_LENGTH) {
      this.checkToSave(value)
    }
  }

  render() {
    const { t } = this.props
    if (this.state.saving) {
      return (
        <PinWrapper>
          <Spinner />
        </PinWrapper>
      )
    }
    return (
      <PinRestrictedArea onCancel={this.props.onExit}>
        <PinWrapper>
          <div>
            {!this.state.pin1
              ? t('Pin.please-enter-pin')
              : t('Pin.please-repeat-pin')}
            <br />
            {this.state.error ? (
              <div className={styles['Pin__error']}>
                {t(`Pin.errors.${this.state.error}`)}
              </div>
            ) : null}
          </div>
          <PinKeyboard
            leftButton={
              <PinButton onClick={this.props.onExit}>
                <Icon icon="back" />
              </PinButton>
            }
            value={this.state.value}
            onChange={this.handleKeyboardChange}
          />
        </PinWrapper>
      </PinRestrictedArea>
    )
  }
}

PinEditView.propTypes = {
  onSaved: PropTypes.func.isRequired
}

export const DumbPinEditView = PinEditView
export default compose(
  translate(),
  withMutations(),
  queryConnect({
    pinSetting
  })
)(PinEditView)
