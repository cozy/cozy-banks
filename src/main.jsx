/* global cozy, __TARGET__ */

import 'whatwg-fetch'
import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import 'number-to-locale-string'

import { setupHistory } from 'utils/history'
import { getClient } from 'ducks/client'
import 'utils/flag'
import FastClick from 'fastclick'
import { isReporterEnabled, configureReporter, setURLContext } from 'lib/sentry'
import * as d3 from 'd3'
import 'utils/react-exposer'

const D3_LOCALES_MAP = {
  fr: 'fr-FR',
  en: 'en-GB'
}

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

const setupApp = async persistedState => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  lang =
    __TARGET__ === 'mobile' && navigator && navigator.language
      ? navigator.language.slice(0, 2)
      : data.cozyLocale || 'en'

  d3.timeFormatDefaultLocale(
    require(`d3-time-format/locale/${D3_LOCALES_MAP[lang]}.json`)
  )

  history = setupHistory()

  client = await getClient(persistedState)
  store = configureStore(client, persistedState)

  // if (client.facade.url) {
  //   // Initialize settings
  //   store.dispatch(fetchSettingsCollection()).then(res => {
  //     if (!res || res.data.length === 0) {
  //       store.dispatch(initSettings())
  //     }
  //   })
  // }

  persistState(store)

  if (__TARGET__ !== 'mobile') {
    cozy.bar.init({
      appName: data.cozyAppName,
      iconPath: data.cozyIconPath,
      lang: data.cozyLocale,
      replaceTitleOnMobile: true
    })
  }

  if (isReporterEnabled()) {
    configureReporter(client)
    if (__TARGET__ === 'browser') {
      setURLContext(window.location.href)
    }
  }

  initRender()
}

document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body)
  loadState().then(setupApp)
})

const makeItShine = node => {
  node.style.boxShadow = 'inset 0px 0px 20px yellow'
  node.style.transition = 'box-shadow 0.3s ease'
  setTimeout(() => {
    node.style.boxShadow = 'inset 0 0 0'
  }, 2000)
}
if (module.hot) {
  module.hot.accept('./AppContainer', () =>
    requestAnimationFrame(() => {
      makeItShine(document.body)
      initRender()
    })
  )
}
