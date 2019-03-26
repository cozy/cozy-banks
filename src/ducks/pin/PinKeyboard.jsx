import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'

import styles from 'ducks/pin/styles'
import PinButton from 'ducks/pin/PinButton'
import { PIN_MAX_LENGTH } from 'ducks/pin/constants'

const invisible = {
  opacity: 0
}

/**
 * Shows a value as Dots
 */
class Dots extends React.Component {
  render() {
    const props = this.props
    return (
      <div ref={props.ref} className={styles['Pin__dots']}>
        {range(1, props.max + 1).map(i => (
          <span className={styles['Pin__dot']} key={i}>
            {i <= props.value.length ? '●' : '_'}
          </span>
        ))}
      </div>
    )
  }
}

Dots.propTypes = {
  value: PropTypes.string.isRequired
}

/**
 * Allows to type a value with an onScreen keyboard.
 * If `onChange` is defined, it acts as a controlled component,
 * otherwise, it keeps an internal state.
 */
class PinKeyboard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleClickNumber = this.handleClickNumber.bind(this)
    this.handleRemoveCharacter = this.handleRemoveCharacter.bind(this)
  }

  state = {
    value: ''
  }

  handleConfirm() {
    this.props.onConfirm(this.getValue())
  }

  getValue() {
    return this.props.value || this.state.value
  }

  handleClickNumber(n) {
    const value = this.getValue()
    const newVal = (value + n).substr(0, this.props.pinMaxLength)
    this.handleNewValue(newVal)
  }

  handleRemoveCharacter() {
    const newVal = this.state.value.substr(0, this.state.value.length - 1)
    this.handleNewValue(newVal)
  }

  handleNewValue(newVal) {
    if (this.props.onChange) {
      this.props.onChange(newVal)
    } else {
      this.setState({ value: newVal })
    }
  }

  render() {
    const { topMessage, bottomMessage } = this.props
    const value = this.getValue()
    return (
      <div className={styles.PinKeyboard}>
        <div className={styles.PinKeyboard__top}>
          <div className={styles.PinKeyboard__topMessage}>{topMessage}</div>
          <Dots
            ref={this.props.dotsRef}
            max={this.props.pinMaxLength}
            value={value}
          />
          <div className={styles.PinKeyboard__bottomMessage}>
            {bottomMessage}
          </div>
        </div>
        <div className={styles.PinKeyboard__keyboard}>
          {range(1, 10).map(n => (
            <PinButton
              onClick={this.handleClickNumber.bind(null, n.toString())}
              key={n}
            >
              {n}
            </PinButton>
          ))}
          {this.props.leftButton || <PinButton style={invisible} />}
          <PinButton>0</PinButton>
          <PinButton onClick={this.handleRemoveCharacter}>R</PinButton>
        </div>
      </div>
    )
  }
}

PinKeyboard.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  topMessage: PropTypes.node,
  bottomMessage: PropTypes.node,
  dotsRef: PropTypes.object
}

PinKeyboard.defaultProps = {
  pinMaxLength: PIN_MAX_LENGTH
}

export default PinKeyboard
