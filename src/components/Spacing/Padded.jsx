import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from 'components/Spacing/Padded.styl'

const Padded = ({ children, className, style }) => (
  <div className={cx(styles.Padded, className)} style={style}>
    {children}
  </div>
)

Padded.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Padded
