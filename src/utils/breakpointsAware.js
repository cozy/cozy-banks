import React, { Component } from 'react'
import { throttle, mapValues, flowRight as compose, pick } from 'lodash'

const large = 1200
const medium = 1023
const small = 768
const tiny = 543

const breakpoints = {
  extraLarge: [large + 1],
  large: [medium + 1, large],
  medium: [small + 1, medium],
  small: [tiny + 1, small],
  tiny: [0, tiny],
  desktop: [medium + 1],
  tablet: [small + 1, medium],
  mobile: [0, small]
}

const getBreakpointsStatus = breakpoints => {
  const width = window.innerWidth
  return mapValues(breakpoints, ([min, max]) => width > min && (max === undefined || width < max))
}

/**
 * HOC to provide breakpoints property to its children
 * that will reflect if the window.innerWidth are under
 * those breakpoints
 *
 * @Example
 * ````
 * const B = breakpointsAware({ toto: 1000 })(A)
 * ````
 *
 * A will passed { breakpoints: { toto: $T }} as prop
 * $T will be true/false depending if the window size is
 * under 1000px
 *
 */
const breakpointsAware = (bp = breakpoints) => Wrapped =>
  class Aware extends Component {
    state = {
      breakpoints: getBreakpointsStatus(bp)
    }

    componentDidMount () {
      window.addEventListener('resize', this.checkBreakpoints)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.checkBreakpoints)
    }

    checkBreakpoints = throttle(() => {
      this.setState({ breakpoints: getBreakpointsStatus(bp) })
    }, 100, { trailing: true })

    render (props, { breakpoints }) {
      return <Wrapped {...props} breakpoints={breakpoints} />
    }
  }

/**
 * HOC that tries a predicate on props + state and
 * renders a component only if the predicate returns true
 */
export const renderOnlyIf = predicate => Wrapped => class extends Component {
  render (props, state) {
    if (predicate(props, state)) {
      return <Wrapped {...props} />
    }
  }
}

/**
 * Use this HOC if you only want your component to be
 * rendered on mobile
 */
export const onlyMobile = compose(
  breakpointsAware(pick(breakpoints, 'mobile')),
  renderOnlyIf(props => props.breakpoints.mobile)
)

/**
 * Use this HOC if you only want your component to be
 * rendered on tablet
 */
export const onlyTablet = compose(
  breakpointsAware(pick(breakpoints, 'tablet')),
  renderOnlyIf(props => props.breakpoints.tablet)
)

/**
 * Use this HOC if you only want your component to be
 * rendered on desktop
 */
export const onlyDesktop = compose(
  breakpointsAware(pick(breakpoints, 'desktop')),
  renderOnlyIf(props => props.breakpoints.desktop)
)

export default breakpointsAware
