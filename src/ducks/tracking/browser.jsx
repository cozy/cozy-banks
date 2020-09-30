import React, { useContext, createContext } from 'react'
import memoize from 'lodash/memoize'
import {
  getTracker as uiGetTracker,
  shouldEnableTracking
} from 'cozy-ui/transpiled/react/helpers/tracker'

const trackerShim = {
  trackPage: () => {},
  trackEvent: () => {},
  push: () => {}
}

export const getMatomoTracker = memoize(() => {
  const trackerInstance = uiGetTracker(
    __PIWIK_TRACKER_URL__,
    __PIWIK_SITEID__,
    true, //
    false
  )

  if (!trackerInstance) {
    return trackerShim
  }

  trackerInstance.push([
    'setTrackerUrl',
    'https://matomo.cozycloud.cc/matomo.php'
  ])
  trackerInstance.push(['setSiteId', 8])

  return {
    trackEvent: event => {
      console.info('Tracking event', event)
      const { name, action, category, type } = event
      trackerInstance.push(['trackEvent', category, name, action])
    },
    trackPage: pageName => {
      console.info('Tracking page', pageName)
      trackerInstance.push(['setCustomUrl', pageName])
      trackerInstance.push(['trackPageView'])
    }
  }
})

export const getTracker = getMatomoTracker

export const TrackerContext = createContext()

export const TrackerProvider = ({ children }) => {
  const tracker = getTracker()
  return (
    <TrackerContext.Provider value={tracker}>
      {children}
    </TrackerContext.Provider>
  )
}

export const useTracker = () => {
  return useContext(TrackerContext)
}
