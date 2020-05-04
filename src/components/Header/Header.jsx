import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { ThemeContext } from 'components/useTheme'
import styles from 'components/Header/Header.styl'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

class Header extends React.PureComponent {
  render() {
    const { children, className, theme, fixed } = this.props

    return (
      <CozyTheme variant="inverted">
        <ThemeContext.Provider value={theme}>
          <div
            className={cx(
              styles[`HeaderColor_${theme}`],
              { [styles.HeaderFixed]: fixed },
              className
            )}
          >
            {children}
          </div>
        </ThemeContext.Provider>
      </CozyTheme>
    )
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary'])
}

Header.defaultProps = {
  theme: 'default',
  fixed: false
}

export default Header
