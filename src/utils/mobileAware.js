import React, { Component } from 'react'
import { throttle, mapValues, flowRight as compose, pick } from 'lodash'

const breakpoints = {
  'desktop': Infinity,
  'tablet': 1024,
  'mobile': 768
}

const getBreakpointsStatus = function (breakpoints) {
  const width = window.innerWidth
  return mapValues(breakpoints, maxWidth => width < maxWidth)
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
const breakpointsAware = breakpoints => Wrapped =>
  class Aware extends Component {
    state = { breakpoints: getBreakpointsStatus(breakpoints) }

    componentDidMount () {
      window.addEventListener('resize', this.checkBreakpoints)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.checkBreakpoints)
    }

    checkBreakpoints = throttle(() => {
      this.setState({ breakpoints: getBreakpointsStatus(breakpoints) })
    }, 100, { trailing: true })

    render (props, { breakpoints }) {
      return <Wrapped {...props} breakpoints={breakpoints} />
    }
  }

/**
 * HOC that tries a predicate on props + state and
 * renders a component only if the predicate returns true
 */
const renderOnlyIf = predicate => Wrapped => class extends Component {
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

export default breakpointsAware
