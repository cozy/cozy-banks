import 'babel-polyfill'
import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import { I18n } from 'cozy-ui/react/I18n'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import MobileRouter from 'ducks/authentication/MobileRouter'
import AppRoute from 'components/AppRoute'
import { setClient, setURL, initServices } from 'ducks/mobile'
import 'number-to-locale-string'

const renderAppWithPersistedState = persistedState => {
  const store = configureStore(persistedState)
  persistState(store)
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  // Force the French language for the translation of dates
  const lang = data.cozyLocale || 'en'

  initServices(store)

  const isAuthenticated = () => {
    return store.getState().mobile.client !== null
  }

  const isRevoked = () => {
    return store.getState().mobile.revoked
  }

  const storeCredentials = ({ url, client, router }) => {
    store.dispatch(setClient(client))
    store.dispatch(setURL(url))
    router.replace('/')
  }

  const piwikEnabled = shouldEnableTracking() && getTracker()
  let history = hashHistory
  if (piwikEnabled) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(hashHistory)
    trackerInstance.track(history.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }

  render(
    <I18n lang={lang} dictRequire={lang => require(`../../locales/${lang}`)}>
      <Provider store={store}>
        <MobileRouter
          history={history}
          appRoutes={AppRoute}
          isAuthenticated={isAuthenticated}
          isRevoked={isRevoked}
          onAuthenticated={storeCredentials}
        />
      </Provider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  loadState().then(renderAppWithPersistedState)
})
