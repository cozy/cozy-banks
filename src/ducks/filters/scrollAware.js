import React, { Component } from 'react'
import { throttle } from 'lodash'

const getMain = function () {
  return document.querySelector('main')
}

/**
 * HOC to provide info to the `Wrapped` component
 * about the scrolling state of `<main />`. If we are
 * not at the top, the component will have its prop `scrolling`
 * set to true. It is useful when the children wants to apply
 * a class only we are not at the top.
 */
export default Wrapped => class extends Component {
  state = { scrolling: false }

  componentDidMount () {
    const main = getMain()
    main.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    const main = getMain()
    main.removeEventListener(main, 'scroll', this.onScroll)
  }

  onScroll = throttle(ev => {
    const scrollTop = ev.target.scrollTop
    const { scrolling } = this.state.scrolling
    if (scrollTop > 0 && !scrolling) {
      this.setState({ scrolling: true })
    } else if (scrollTop === 0 && scrolling) {
      this.setState({ scrolling: false })
    }
  }, 16)

  render (props, { scrolling }) {
    return <Wrapped {...props} scrolling={scrolling} />
  }
}
