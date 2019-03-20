import React from 'react'

import styles from 'ducks/pin/styles.styl'
import PinKeyboard from 'ducks/pin/PinKeyboard'
import LockedBody from 'ducks/pin/LockedBody'
import PinTimeout from 'ducks/pin/PinTimeout.debug'
import BarTheme from 'ducks/mobile/BarTheme'

class PinGuard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleInteraction = this.handleInteraction.bind(this)
    this.handlePinSuccess = this.handlePinSuccess.bind(this)
    this.handleResume = this.handleResume.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.handleInteraction)
    document.addEventListener('resume', this.handleResume)
    document.addEventListener('pause', this.handlePause)
    this.handleInteraction()
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleInteraction)
    document.removeEventListener('resume', this.handleResume)
    document.removeEventListener('pause', this.handlePause)
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
        {this.props.children}
        {this.state.showPin ? (
          <LockedBody>
            <div className={styles.PinWrapper}>
              <BarTheme theme="primary" />
              <PinKeyboard onSuccess={this.handlePinSuccess} />
            </div>
          </LockedBody>
        ) : null}
        {this.props.showTimeout ? (
          <PinTimeout start={this.state.last} duration={this.props.timeout} />
        ) : null}
      </React.Fragment>
    )
  }

  static defaultProps = {
    timeout: 30 * 1000
  }
}

export default PinGuard
