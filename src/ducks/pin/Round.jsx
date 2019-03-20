import React from 'react'
import styles from 'ducks/pin/styles.styl'
import cx from 'classnames'

const Round = props => {
  return <button {...props} className={cx(styles.Round, props.className)} />
}

export default Round
