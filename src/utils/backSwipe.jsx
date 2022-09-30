import React, { Component } from 'react'
import Hammer from 'hammerjs'
import { useNavigate } from 'react-router-dom'

class BackSwipe extends Component {
  componentDidMount() {
    const node = document.body
    this.hammer = new Hammer.Manager(node, {
      recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_RIGHT }]]
    })
    this.hammer.on('swiperight', this.onSwipeRight)
  }

  componentWillUnmount() {
    this.hammer.destroy()
  }

  onSwipeRight = ev => {
    if (!ev.defaultPrevented) {
      const location = this.props.getLocation(this.props)
      if (location) {
        this.props.navigate(location)
        ev.preventDefault()
      }
    }
  }

  render() {
    const props = this.props
    return <this.props.Wrapped {...props} />
  }
}

export default ({ getLocation }) =>
  function Wrapper(Wrapped) {
    const navigate = useNavigate()
    return (
      <BackSwipe
        Wrapped={Wrapped}
        getLocation={getLocation}
        navigate={navigate}
      />
    )
  }
