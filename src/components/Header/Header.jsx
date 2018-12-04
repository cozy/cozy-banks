import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './Header.styl'

const Header = ({ children, className, color }) => (
  <div className={cx(styles[`HeaderColor_${color}`], className)}>
    {children}
  </div>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary'])
}

Header.defaultProps = {
  color: 'default'
}

export default Header
