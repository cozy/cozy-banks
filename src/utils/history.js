/* global __PIWIK_TRACKER_URL__ __PIWIK_SITEID__ */

import { hashHistory } from 'react-router'
import { getTracker } from 'ducks/tracking/browser'

export const setupHistory = () => {
  let history = hashHistory
  return history
}
