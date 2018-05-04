import React from 'react'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import ReactDOM from 'react-dom'

function elementInViewport(el, thresold) {
  const bcr = el.getBoundingClientRect()
  const top = bcr.top + thresold
  const viewportTop = window.pageYOffset
  const viewportBottom = viewportTop + window.innerHeight
  return top >= viewportTop && top <= viewportBottom
}

class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props)
    this.checkForLimits = throttle(this.checkForLimits, 100)
    this.onWindowResize = debounce(this.onWindowResize, 500)
  }

  componentDidMount() {
    this.listenToScroll()
    this.checkForLimits()
    window.addEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    // scrolling element may have changed
    this.stopListeningToScroll()
    this.listenToScroll()
  }

  getScrollingElement() {
    return this.props.getScrollingElement.apply(this)
  }

  componentWillUnmount() {
    this.stopListeningToScroll()
  }

  componentWillUpdate(nextProps) {
    // If the top limit has changed (elements have been added at the top),
    // we need to schedule a restore of the scroll position
    if (this.props.limitMin !== nextProps.limitMin) {
      this.restoreScroll = this.getRestoreScroll()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.restoreScroll) {
      this.restoreScroll()
      this.restoreScroll = null
    }
    if (prevProps.children !== this.props.children) {
      this.checkForLimits()
    }
  }

  listenToScroll() {
    this.scrollingElement = this.getScrollingElement()
    if (!this.scrollingElement) {
      throw new Error(
        'getScrollingElement returned null, make sure it returns a node.'
      )
    }
    this.scrollingElement.addEventListener('scroll', this.handleScroll, {
      passive: true
    })
  }

  stopListeningToScroll() {
    if (this.scrollingElement) {
      this.scrollingElement.removeEventListener('scroll', this.handleScroll)
    }
  }

  getScroll = () => {
    const node = this.getScrollingElement()
    return node === window
      ? window.pageYOffset || document.documentElement.scrollTop
      : node.scrollTop
  }

  setScroll(scroll) {
    if (this.scrollingElement === window) {
      this.scrollingElement.scrollTo(0, scroll)
    } else {
      this.scrollingElement.scrollTop = scroll
    }
  }

  handleScroll = () => {
    this.checkForLimits()
    if (this.props.onScroll) {
      this.props.onScroll(this.getScrollInfo)
    }
  }

  getScrollInfo = () => {
    return {
      scroll: this.getScroll(),
      scrollHeight: this.getScrollHeight()
    }
  }

  getScrollHeight() {
    if (this.scrollingElement === window) {
      return window.document.scrollingElement.getBoundingClientRect().height
    } else {
      return this.scrollingElement.scrollHeight
    }
  }

  getRestoreScroll() {
    // Save scroll position to restore it later
    const height = this.getScrollHeight()
    const scroll = this.getScroll()
    return function() {
      const newHeight = this.getScrollHeight()
      const newScroll = scroll + (newHeight - height)
      this.setScroll(newScroll)
    }
  }

  checkForLimits() {
    const reachingTop = elementInViewport(
      this.limitMinRef,
      -this.props.thresoldTop
    )
    const reachingBottom = elementInViewport(
      this.limitMaxRef,
      this.props.thresoldBottom
    )
    const canLoadAtTop = this.props.canLoadAtTop
    const canLoadAtBottom = this.props.canLoadAtBottom
    if (reachingTop && canLoadAtTop) {
      this.props.onReachTop()
    } else if (reachingBottom && canLoadAtBottom) {
      this.props.onReachBottom()
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div ref={ref => (this.limitMinRef = ref)} />
        {this.props.children}
        <div ref={ref => (this.limitMaxRef = ref)} />
      </div>
    )
  }
}

InfiniteScroll.defaultProps = {
  thresoldTop: 50,
  thresoldBottom: -100,
  thresoldForInfiniteScrollTop: 150,
  getScrollingElement: function() {
    return ReactDOM.findDOMNode(this) // eslint-disable-line
  }
}

export default InfiniteScroll
