import React from 'react'
import PropTypes from 'prop-types'
import { TopbarLeft } from 'ducks/commons/Topbar'
import styles from './style.styl'
import withBackSwipe from 'utils/backSwipe'
import { flowRight as compose } from 'lodash'
import { Icon } from 'cozy-ui/react'
import arrowLeft from 'assets/icons/icon-arrow-left.svg'
import breakpointsAware from 'utils/breakpointsAware'
import palette from 'utils/palette.json'

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
const BackButton = ({ onClick, to, router, breakpoints, arrow = false }) => {
  const location = router.getCurrentLocation()
  if (!onClick && !to) {
    to = location.pathname.split('/').slice(0, -1).join('/')
  }
  const handleClick = onClick = onClick || (() => to && router.push(to))
  return breakpoints.isMobile ? (
    <TopbarLeft className={styles['back-button']}>
      <button onClick={handleClick}>
        <Icon icon={arrowLeft} color={palette['cool-grey']} />
      </button>
    </TopbarLeft>
  ) : (arrow && <a onClick={handleClick} className={styles['back-arrow']}>
    <Icon icon={arrowLeft} />
  </a>)
}

BackButton.propTypes = {
  /** Location to go when clicking on the button. Uses react-router. */
  to: PropTypes.string,
  /** onClick handler. Mutually exclusive with `to` */
  onClick: PropTypes.func,
  /** Provided by `withRouter` in `withBackSwipe` */
  router: PropTypes.object
}

export default compose(
  breakpointsAware(),
  withBackSwipe({ getLocation: ownProps => ownProps.to })
)(BackButton)
