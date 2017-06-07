import React from 'react'
import styles from 'styles/icons'
import cx from 'classnames'

export default function ({to, from}) {
  return <i title={ to || from } className={
    cx(styles['sharing-icon'], {
      [styles['sharing-icon--to']]: to,
      [styles['sharing-icon--from']]: from
    })
  } />
}
