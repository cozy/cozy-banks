import React from 'react'
import styles from 'styles/icons'
import classnames from 'classnames'

const SharingIcon = ({to, from}) => (
  <i className={classnames(styles['sharing-icon'], {
    [styles['sharing-icon--to']]: to,
    [styles['sharing-icon--from']]: from
  })} />
)

export default SharingIcon
