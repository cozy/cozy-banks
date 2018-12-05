import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tooltip.styl'

const Tooltip = ({ children, x, position }) => (
  <div
    className={styles.Tooltip}
    style={{ transform: `translateX(${x}px)`, [position]: 0 }}
  >
    {children}
  </div>
)

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  x: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'right']).isRequired
}

export default Tooltip
