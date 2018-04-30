import React from 'react'
import styles from './styles.styl'
import cx from 'classnames'

const PageTitle = function({ className, ...props }) {
  return <h2 className={cx(styles.PageTitle, className)} {...props} />
}

export default PageTitle
