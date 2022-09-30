import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useNavigate, useLocation } from 'react-router-dom'

import IconButton from 'cozy-ui/transpiled/react/IconButton'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useCozyTheme } from 'cozy-ui/transpiled/react/CozyTheme'

// import withBackSwipe from 'utils/backSwipe'
import arrowLeft from 'assets/icons/icon-arrow-left.svg'
import { BarLeft } from 'components/Bar'
// import { useRouter } from 'components/RouterContext'
import styles from 'components/BackButton/style.styl'

export const BackIcon = () => {
  const theme = useCozyTheme()
  return (
    <Icon
      className={cx(
        theme ? styles[`BackIcon--${theme}`] : null,
        styles.BackIcon
      )}
      icon={arrowLeft}
    />
  )
}

export const BackButton = ({ className, onClick, ...props }) => (
  <IconButton
    className={cx(styles.BackArrow, className)}
    size="medium"
    onClick={onClick}
    {...props}
  >
    <BackIcon />
  </IconButton>
)

export const BarBackButton = ({ onClick }) => {
  const { isMobile } = useBreakpoints()
  return isMobile ? (
    <BarLeft>
      <div className="u-pl-half">
        <BackButton onClick={onClick} />
      </div>
    </BarLeft>
  ) : null
}
/**
 * Display a BackButton on mobile. When it is displayed,
 * a right swipe on the screen or a click will bring
 * the user back to `to`.
 *
 * ```jsx
 * <BackButton onClick={ console.log('back button' )} />
 * <BackButton to={ '/settings' } />
 * ```
 */
const MobileAwareBackButton = ({ onClick, to, arrow = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isMobile } = useBreakpoints()
  // const location = router.getCurrentLocation()
  let toToUse = to
  if (!onClick && !toToUse) {
    toToUse = location.pathname.split('/').slice(0, -1).join('/')
  }

  const handleClick = onClick ? onClick : () => toToUse && navigate(toToUse)
  return isMobile ? (
    <BarBackButton onClick={handleClick} />
  ) : (
    arrow && <BackButton onClick={handleClick} />
  )
}

MobileAwareBackButton.propTypes = {
  /** Location to go when clicking on the button. Uses react-router. */
  to: PropTypes.string,
  /** onClick handler. Mutually exclusive with `to` */
  onClick: PropTypes.func,
  /** Provided by `withRouter` in `withBackSwipe` */
  router: PropTypes.object
}

export default MobileAwareBackButton

// export default withBackSwipe({ getLocation: ownProps => ownProps.to })(
//   MobileAwareBackButton
// )
