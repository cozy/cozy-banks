import React from 'react'
import { TopbarLeft } from 'ducks/commons/Topbar'
import styles from './style.styl'
import withBackSwipe from 'utils/backSwipe'
import { onlyMobile } from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'

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
const BackButton = ({ onClick, to, router }) => (
  <TopbarLeft className={styles['back-button']}>
    <a onClick={onClick || (() => to && router.push(to))} />
  </TopbarLeft>
)

BackButton.propTypes = {
  /** Location to go when clicking on the button. Uses react-router. */
  to: React.PropTypes.string,
  /** onClick handler. Mutually exclusive with `to` */
  onClick: React.PropTypes.func,
  /** Provided by `withRouter` in `withBackSwipe` */
  router: React.PropTypes.object
}

const Enhanced = compose(
  onlyMobile,
  withBackSwipe({ getLocation: ownProps => ownProps.to })
)(BackButton)

export default Enhanced
