import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Header.styl'

const Header = ({ children, className, color, fixed }) => (
  <div
    className={cx(
      styles[`HeaderColor_${color}`],
      { [styles.HeaderFixed]: fixed },
      className
    )}
  >
    {children}
  </div>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary'])
}

Header.defaultProps = {
  color: 'default',
  fixed: false
}

export default Header
