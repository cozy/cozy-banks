import React from 'react'
import styles from 'ducks/pin/styles.styl'
import cx from 'classnames'

const PinButton = ({ className, ...props }) => {
  return <button {...props} className={cx(styles['Pin__button'], className)} />
}

export default PinButton
