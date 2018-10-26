/* global __PIWIK_SITEID__, __PIWIK_TRACKER_URL__ */

import MatomoTracker from 'matomo-tracker'

let nodeTracker

/**
 * Get a Matomo/Piwik tracker to be used in node processes (tipically services)
 * @return {MatomoTracker}
 */
export function getNodeTracker() {
  if (nodeTracker) {
    return nodeTracker
  }

  const tracker = new MatomoTracker(__PIWIK_SITEID__, __PIWIK_TRACKER_URL__)

  tracker.on('error', err => {
    // eslint-disable-next-line
    console.log('error tracking request: ', err)
  })

  nodeTracker = tracker

  return tracker
}
