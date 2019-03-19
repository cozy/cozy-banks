import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import styles from './styles.styl'
import Round from './Round'
import PinKeyboard from './PinKeyboard'

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
const AffixRed = props => {
  return (
    <div style={{ background: 'red', position: 'fixed', top: 0, zIndex: 1000 }}>
      {props.children}
    </div>
  )
}
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
        {this.props.showTimeout ? (
          <AffixRed>
            {this.props.timeout - (Date.now() - this.state.last)}
          </AffixRed>
        ) : null}
      </React.Fragment>
    )
  }

  static defaultProps = {
    timeout: 30 * 1000
  }
}

export default PinGuard
