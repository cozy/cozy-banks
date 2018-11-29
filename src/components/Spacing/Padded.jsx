import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Padded.styl'

const Padded = ({ children, className }) => (
  <div className={cx(styles.Padded, className)}>{children}</div>
)

Padded.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Padded
