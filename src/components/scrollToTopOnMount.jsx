import React, { useEffect } from 'react'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const useScrollToOnMount = (node, scrollTop, scrollLeft) => {
  useEffect(
    () => {
      if (node && scrollTop !== undefined) {
        node.scrollTop = scrollTop
      }
      if (node && scrollLeft !== undefined) {
        node.scrollLeft = scrollLeft
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

const getMainNode = isMobile => {
  return isMobile
    ? document.scrollingElement || document.documentElement
    : document.querySelector('[role="main"]')
}

const ScrollToTopOnMountWrapper = ({ children, ...props }) => {
  const breakpoints = useBreakpoints()
  const node = getMainNode(breakpoints.isMobile)
  useScrollToOnMount(node, 0)

  return React.cloneElement(children, { ...props })
}

/**
 * Decorates a components so that it scrolls to the top of the main
 * scrolling container when mounted.
 */
// const scrollToTopOnMount =
//   Component =>
//   // eslint-disable-next-line react/display-name
//   ({ ...props }) => {
//     const breakpoints = useBreakpoints()
//     const node = getMainNode(breakpoints.isMobile)
//     useScrollToOnMount(node, 0)
//     return <Component {...props} />
//   }

export default ScrollToTopOnMountWrapper
