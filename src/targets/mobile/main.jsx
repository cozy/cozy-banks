import 'babel-polyfill'
import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { CozyProvider } from 'redux-cozy-client'
import { hashHistory } from 'react-router'
import { I18n } from 'cozy-ui/react/I18n'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'
import { get } from 'lodash'

import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import MobileRouter from 'ducks/authentication/MobileRouter'
import { initClient, initBar } from 'ducks/authentication/lib/client'
import AppRoute from 'components/AppRoute'
import { setClient, setURL, revokeClient } from 'ducks/mobile'
import 'number-to-locale-string'

const renderAppWithPersistedState = persistedState => {
  const hasPersistedMobileStore = persistedState && persistedState.mobile
  const client = initClient(hasPersistedMobileStore ? persistedState.mobile.url : '')

  const store = configureStore(client, persistedState)
  persistState(store)

  // Force the French language for the translation of dates
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const lang = data.cozyLocale || 'en'

  client.isRegistered(get(persistedState, 'mobile.client', null)).then(isRegistered => {
    if (isRegistered) {
      initBar()
    } else {
      store.dispatch(revokeClient())
    }
  })

  const isAuthenticated = () => {
    return store.getState().mobile.client !== null
  }

  const isRevoked = () => {
    return store.getState().mobile.revoked
  }

  const storeCredentials = ({ url, clientInfo, router }) => {
    store.dispatch(setClient(clientInfo))
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
      <CozyProvider store={store} client={client}>
        <MobileRouter
          history={history}
          appRoutes={AppRoute}
          isAuthenticated={isAuthenticated}
          isRevoked={isRevoked}
          onAuthenticated={storeCredentials}
        />
      </CozyProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  loadState().then(renderAppWithPersistedState)
})
