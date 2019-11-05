import React from 'react'
import cx from 'classnames'
import styles from 'components/Spacing/Wrapper.styl'

const Wrapper = props => {
  const { className, ...rest } = props

  return <div className={cx(styles.Wrapper, className)} {...rest} />
}

export default Wrapper
