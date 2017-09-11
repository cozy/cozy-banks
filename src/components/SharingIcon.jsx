import React, { PropTypes as Types } from 'react'
import styles from 'styles/icons'
import classnames from 'classnames'

const SharingIcon = ({to, from}) => (
  <i className={classnames(styles['sharing-icon'], {
    [styles['sharing-icon--to']]: to,
    [styles['sharing-icon--from']]: from
  })} />
)

SharingIcon.propTypes = {
  /** Name of the person to whom you are sharing */
  to: Types.string,
  /** Name of the person from whom you are sharing */
  from: Types.string
}

export default SharingIcon
