/* global cozy, __TARGET__ */

import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import 'number-to-locale-string'

import { setupHistory } from 'utils/history'
import { getClient } from 'utils/client'
import { fetchSettingsCollection, initSettings } from 'ducks/settings'
import 'utils/flag'

if (__TARGET__ === 'mobile') {
  require('styles/mobile.styl')
}

if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
}

let store, client, history, lang, root

const initRender = () => {
  const AppContainer = require('./AppContainer').default

  root = render(
    <AppContainer
      store={store}
      client={client}
      lang={lang}
      history={history}
    />,
    document.querySelector('[role=application]', root)
  )
}

const setupApp = persistedState => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  lang =
    __TARGET__ === 'mobile' && navigator && navigator.language
      ? navigator.language.slice(0, 2)
      : data.cozyLocale || 'en'

  history = setupHistory()

  client = getClient(persistedState)
  store = configureStore(client, persistedState)
  // Initialize settings
  store.dispatch(fetchSettingsCollection()).then(res => {
    if (res.data.length === 0) {
      store.dispatch(initSettings())
    }
  })

  persistState(store)

  if (__TARGET__ !== 'mobile') {
    cozy.bar.init({
      appName: data.cozyAppName,
      iconPath: data.cozyIconPath,
      lang: data.cozyLocale,
      replaceTitleOnMobile: true
    })
  }

  initRender()
}

document.addEventListener('DOMContentLoaded', () => {
  loadState().then(setupApp)
})

if (module.hot) {
  module.hot.accept('./AppContainer', () => requestAnimationFrame(initRender))
}
