import React from 'react'
import styles from 'ducks/pin/styles.styl'
import cx from 'classnames'

const Round = ({ className, ...props }) => {
  return <button {...props} className={cx(styles.Round, className)} />
}

export default Round
