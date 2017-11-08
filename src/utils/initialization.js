import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'
import { hashHistory } from 'react-router'
import { initClient } from 'ducks/authentication/lib/client'
import { CozyClient } from 'cozy-client'

export const getClientMobile = persistedState => {
  const hasPersistedMobileStore = persistedState && persistedState.mobile
  return initClient(hasPersistedMobileStore ? persistedState.mobile.url : '')
}

export const setupHistory = () => {
  const piwikEnabled = shouldEnableTracking() && getTracker()
  let history = hashHistory
  if (piwikEnabled) {
    const trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(history)
    trackerInstance.track(history.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }
  return history
}

export const getClientBrowser = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  return new CozyClient({
    cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })
}
