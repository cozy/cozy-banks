/* global cozy */
import 'babel-polyfill'
import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { I18n } from 'cozy-ui/react/I18n'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import AppRoute from 'components/AppRoute'
import 'number-to-locale-string'

const renderAppWithPersistedState = persistedState => {
  const store = configureStore(persistedState)
  persistState(store)
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  // Force the French language for the translation of dates
  const lang = data.cozyLocale || 'en'

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  cozy.bar.init({
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: true
  })

  const piwikEnabled = shouldEnableTracking() && getTracker()
  let history = hashHistory
  if (piwikEnabled) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(hashHistory)
    trackerInstance.track(history.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }

  render((
    <I18n lang={lang} dictRequire={(lang) => require(`./locales/${lang}`)}>
      <Provider store={store}>
        <Router history={history} routes={AppRoute} />
      </Provider>
    </I18n>
  ), document.querySelector('[role=application]'))
}

document.addEventListener('DOMContentLoaded', () => {
  loadState().then(renderAppWithPersistedState)
})
