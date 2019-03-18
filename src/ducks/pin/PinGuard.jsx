/* global Fingerprint */

import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import styles from './styles.styl'

const Round = props => {
  return <button {...props} className={styles.Round} />
}

class FingerprintAuthButton extends React.PureComponent {
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
    ) : null
  }
}

class PinKeyboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFingerprintSuccess = this.handleFingerprintSuccess.bind(this)
    this.handleFingerprintError = this.handleFingerprintError.bind(this)
    this.handleFingerprintCancel = this.handleFingerprintCancel.bind(this)
  }

  handleFingerprintSuccess(res) {
    this.props.onSuccess()
  }

  handleFingerprintError(res) {
    this.props.onError()
  }

  handleFingerprintCancel(res) {
    this.props.onCancel()
  }

  render() {
    return (
      <div className={styles.Wrapper}>
        {range(1, 10).map(n => (
          <Round children={n} />
        ))}
        <FingerprintAuthButton
          onSuccess={this.handleFingerprintSuccess}
          onError={this.handleFingerprintError}
          onCancel={this.handleFingerprintCancel}
        />
        <Round children={0} />
      </div>
    )
  }

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }
}

const AffixRed = props => {
  return (
    <div style={{ background: 'red', position: 'fixed', top: 0, zIndex: 1000 }}>
      {props.children}
    </div>
  )
}

const Fullscreen = props => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      zIndex: 10000,
      position: 'absolute',
      top: 0,
      background: 'white'
    }}
  >
    {props.children}
  </div>
)

class PinGuard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleInteraction = this.handleInteraction.bind(this)
    this.handlePinSuccess = this.handlePinSuccess.bind(this)
    this.handleResume = this.handleResume.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.handleInteraction)
    document.addEventListener('resume', this.handleResume)
    document.addEventListener('pause', this.handlePause)
    this.handleInteraction()
    this.interval = setInterval(this.update, 1000)
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleInteraction)
    document.removeEventListener('resume', this.handleResume)
    document.removeEventListener('pause', this.handlePause)
    clearInterval(this.interval)
  }

  update() {
    this.setState({})
  }

  handlePause() {
    this.setState({ showPin: true })
  }

  handleResume() {
    this.setState({ showPin: true })
  }

  handleInteraction() {
    this.setState({ last: Date.now() })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({ showPin: true })
    }, this.props.timeout)
  }

  handlePinSuccess() {
    this.setState({ showPin: false })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showPin ? (
          <Fullscreen>
            <PinKeyboard onSuccess={this.handlePinSuccess} />
          </Fullscreen>
        ) : null}
        {this.props.children}
        <AffixRed>
          {this.props.timeout - (Date.now() - this.state.last)}
        </AffixRed>
      </React.Fragment>
    )
  }

  static defaultProps = {
    timeout: 30 * 1000
  }
}

export default PinGuard
