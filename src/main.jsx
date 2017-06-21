/* global cozy __DEVELOPMENT__ */

import 'babel-polyfill'

import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { I18n } from 'lib/I18n'

import store from 'store'
import AppRoute from 'components/AppRoute'

import {
  shouldEnableTracking,
  getTracker } from 'cozy-ui/react/helpers/tracker'

if (__DEVELOPMENT__) {
  // Enables React dev tools for Preact
  // Cannot use import as we are in a condition
  require('preact/devtools')

  // Export React to window for the devtools
  window.React = React
}


const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

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
    <I18n context={context} lang={lang}>
      <Provider store={store}>
        <Router history={history} routes={AppRoute} />
      </Provider>
    </I18n>
  ), document.querySelector('[role=application]'))
})
