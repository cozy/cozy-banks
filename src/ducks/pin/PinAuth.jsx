import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'
import debounce from 'lodash/debounce'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { queryConnect } from 'cozy-client'
import Alerter from 'cozy-ui/react/Alerter'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import { withBreakpoints } from 'cozy-ui/react'
import { Media, Bd, Img } from 'cozy-ui/react/Media'

import styles from 'ducks/pin/styles.styl'
import PinWrapper from 'ducks/pin/PinWrapper'
import PinKeyboard from 'ducks/pin/PinKeyboard'
import WithFingerprint from 'ducks/pin/WithFingerprint'
import { pinSetting } from 'ducks/pin/queries'
import PinButton from 'ducks/pin/PinButton'
import { PIN_MAX_LENGTH, MAX_ATTEMPT } from 'ducks/pin/constants'
import { onLogout } from 'ducks/mobile/utils'
import lock from 'assets/icons/icon-lock.svg'
import openLock from 'assets/icons/icon-lock-open.svg'
import fingerprint from 'assets/icons/icon-fingerprint.svg'

const AttemptCount_ = ({ t, current, max }) => {
  return (
    <div className={styles['Pin__error']}>
      {t('Pin.attempt-count', { current, max })}
    </div>
  )
}

const AttemptCount = translate()(AttemptCount_)

/**
 * Show pin keyboard and fingerprint button.
 * Automatically checks if it is the right pin while it is entered.
 *
 * - After <props.maxAttempt> bad attempts it logouts the user
 * - It automatically confirms when entered password's length is <props.maxLength>
 */
class PinAuth extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess.bind(this)
    this.handleFingerprintError = this.handleFingerprintError.bind(this)
    this.handleFingerprintCancel = this.handleFingerprintCancel.bind(this)
    this.handleEnteredPin = this.handleEnteredPin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleBadAttempt = this.handleBadAttempt.bind(this)

    this.state = {
      attempt: 0,
      pinValue: '',
      success: false
    }
    this.dots = React.createRef()

    this.clearPinWithAnimation = debounce(this.clearPinWithAnimation, 100, {
      leading: false,
      trailing: true
    })
  }

  handleFingerprintSuccess() {
    this.setState({ success: true, pinValue: '******' })
    this.props.onSuccess()
  }

  handleFingerprintError() {
    const { t } = this.props.t
    Alerter.info(t('Pin.bad-pin'))
  }

  handleFingerprintCancel() {
    // this.props.onCancel()
  }

  handleLogout() {
    this.logout()
  }

  onMaxAttempt() {
    this.logout()
  }

  logout() {
    const { router } = this.props
    const { client, store } = this.context
    onLogout(store, client, router)
  }

  handleEnteredPin(pinValue) {
    if (this.cleaning) {
      return
    }
    const { pinSetting, t } = this.props
    const pinDoc = pinSetting.data
    if (!pinDoc) {
      Alerter.info(t('Pin.no-pin-configured'))
      return this.props.onSuccess()
    }

    this.setState({ pinValue })

    if (pinValue === pinDoc.pin) {
      this.setState({ success: true })
      this.props.onSuccess()
      return
    }

    if (pinValue.length === this.props.maxLength) {
      const newAttempt = this.state.attempt + 1
      if (newAttempt >= this.props.maxAttempt) {
        return this.onMaxAttempt()
      }
      return this.handleBadAttempt()
    }
  }

  async handleBadAttempt() {
    this.clearPinWithAnimation()
    this.setState({ attempt: this.state.attempt + 1 })
  }

  /* Cleans PIN animatedly */
  clearPinWithAnimation() {
    const pinValue = this.state.pinValue
    if (pinValue !== '') {
      this.cleaning = true
      this.setState(
        {
          pinValue: pinValue.substr(0, pinValue.length - 1)
        },
        this.clearPinWithAnimation
      )
    } else {
      this.cleaning = false
    }
  }

  render() {
    const {
      t,
      breakpoints: { largeEnough },
      pinSetting
    } = this.props
    const { attempt, pinValue, success } = this.state
    const pinDoc = pinSetting.data
    const topMessage = (
      <React.Fragment>
        {largeEnough ? (
          <Icon
            icon={success ? openLock : lock}
            size="3rem"
            className="u-mb-1"
          />
        ) : null}
        <br />
        {this.props.message || t('Pin.please-enter-your-pin')}
        {pinDoc && pinDoc.fingerprint ? (
          <WithFingerprint
            autoLaunch
            onSuccess={this.handleFingerprintSuccess}
            onError={this.handleFingerprintError}
            onCancel={this.handleFingerprintCancel}
          >
            {(method, promptFinger) => {
              return method ? (
                <Media
                  style={{ display: 'inline-flex' }}
                  onClick={promptFinger}
                  className={styles['Pin__FingerprintText'] + ' u-mv-half'}
                >
                  <Img className="u-pr-half">
                    <Icon size="1.5rem" icon={fingerprint} />
                  </Img>
                  <Bd>{t('Pin.fingerprint-text')}</Bd>
                </Media>
              ) : null
            }}
          </WithFingerprint>
        ) : null}
      </React.Fragment>
    )

    return (
      <PinWrapper className={success ? styles['PinWrapper--success'] : null}>
        <PinKeyboard
          dotsRef={this.handleDotsNode}
          leftButton={
            this.props.leftButton || (
              <PinButton isText onClick={this.handleLogout}>
                {t('Pin.logout')}
              </PinButton>
            )
          }
          topMessage={topMessage}
          bottomMessage={
            attempt ? (
              <AttemptCount max={this.props.maxAttempt} current={attempt} />
            ) : null
          }
          shake={attempt}
          value={pinValue}
          onChange={this.handleEnteredPin}
        />
      </PinWrapper>
    )
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired
  }

  static defaultProps = {
    maxAttempt: MAX_ATTEMPT,
    maxLength: PIN_MAX_LENGTH
  }
}

export default compose(
  withBreakpoints({
    largeEnough: [320]
  }),
  connect(),
  translate(),
  withRouter,
  queryConnect({
    pinSetting
  })
)(PinAuth)
