import React from 'react'
import classNames from 'classnames'
import withGestures from 'ducks/commons/withGestures'
import styles from './Backdrop.styl'

const Backdrop = ({className}) => (
  <div className={classNames(styles['menu-backdrop'], className)} />
)

export default withGestures(
  ownProps => ({
    tap: () => ownProps.onClose()
  })
)(Backdrop)
