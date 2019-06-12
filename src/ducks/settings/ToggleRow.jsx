import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toggle from 'cozy-ui/react/Toggle'
import styles from 'ducks/settings/ToggleRow.styl'

const parseNumber = val => {
  val = val.replace(/\D/gi, '') || 0
  return parseInt(val, 10)
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
      onToggle,
      unit
    } = this.props

    const hasValue = value !== undefined

    return (
      <div>
        {title && <h5>{title}</h5>}
        <div className={styles.ToggleRow__body}>
          <p className={styles.ToggleRow__description}>
            <span dangerouslySetInnerHTML={{ __html: description }} />
            {hasValue && (
              <span className={styles.ToggleRow__input}>
                <span className={styles.ToggleRow__inputContainer}>
                  <input
                    type="text"
                    onChange={e => onChangeValue(parseNumber(e.target.value))}
                    value={value}
                  />
                </span>
                {unit && <span>{unit}</span>}
              </span>
            )}
          </p>

          <div className={styles.ToggleRow__toggle}>
            <Toggle
              id={name}
              checked={enabled}
              onToggle={checked => onToggle(checked)}
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
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  unit: PropTypes.string
}

export default ToggleRow
