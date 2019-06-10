import React from 'react'
import cx from 'classnames'
import styles from './PercentageLine.styl'

const PercentageLine = ({ value, color, className, style }) => (
  <div
    className={cx(className, styles.PercentageLine)}
    style={{
      width: `${value}%`,
      backgroundColor: color,
      ...style
    }}
  />
)

export default PercentageLine
