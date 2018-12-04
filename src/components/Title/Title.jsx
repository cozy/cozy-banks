import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { MainTitle } from 'cozy-ui/react'
import styles from './Title.styl'

const Title = ({ children, color }) => (
  <MainTitle
    tag="h1"
    ellipsis={true}
    className={cx(styles.Title, styles[`TitleColor_${color}`])}
  >
    {children}
  </MainTitle>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['default', 'primary'])
}

Title.defaultProps = {
  color: 'default'
}

export default Title
