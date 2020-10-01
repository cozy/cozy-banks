import React, { useContext, createContext, useEffect } from 'react'
import memoize from 'lodash/memoize'

import flag from 'cozy-flags'
import {
  getTracker as uiGetTracker,
  shouldEnableTracking
} from 'cozy-ui/transpiled/react/helpers/tracker'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

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
    trackPage: pagePath => {
      const message = `Tracking page ${pagePath}`
      console.info(message)
      if (flag('banks.show-tracking-alerts')) {
        Alerter.info(message)
      }
      trackerInstance.push([
        'setCustomUrl',
        'https://cozy-banks/' + pagePath.replace(/:/g, '/')
      ])
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

export const useTrackPage = pageName => {
  const tracker = useTracker()

  useEffect(() => {
    if (!pageName) {
      return
    }
    tracker.trackPage(pageName)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
