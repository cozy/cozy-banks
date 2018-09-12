import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Toggle } from 'cozy-ui/react'
import styles from './ToggleRow.styl'

const parseNumber = val => {
  return parseInt(val.replace(/\D/i, ''), 10)
}

class ToggleRow extends Component {
  render() {
    const {
      enabled,
      value,
      title,
      description,
      onChangeValue,
      name,
      onToggle
    } = this.props

    const hasValue = value !== undefined

    return (
      <div>
        <h5>{title}</h5>
        <div className={styles.ToggleRow__body}>
          <p className={styles.ToggleRow__description}>
            <span dangerouslySetInnerHTML={{ __html: description }} />
            {hasValue && (
              <input
                type="number"
                onChange={e => onChangeValue(name, parseNumber(e.target.value))}
                value={value}
                className={cx(
                  styles.ToggleRow__input,
                  styles['ToggleRow__input--suffixed']
                )}
              />
            )}
            {hasValue && <span>€</span>}
          </p>

          <div className={styles.ToggleRow__toggle}>
            <Toggle
              id={name}
              checked={enabled}
              onToggle={checked => onToggle(name, checked)}
            />
          </div>
        </div>
      </div>
    )
  }
}

ToggleRow.propTypes = {
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default ToggleRow
