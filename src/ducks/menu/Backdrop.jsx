import React from 'react'
import withGestures from 'ducks/commons/withGestures'
import styles from './Backdrop.styl'

const Backdrop = () => (
  <div className={styles['menu-backdrop']} />
)

export default withGestures(
  ownProps => ({
    tap: () => ownProps.onClose()
  })
)(Backdrop)
