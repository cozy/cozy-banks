import styles from './styles.styl'
import cx from 'classnames'
import React from 'react'

const TextCard = ({ className, ...props }) => {
  return <span className={cx(styles.TextCard, className)} {...props} />
}
export default TextCard
