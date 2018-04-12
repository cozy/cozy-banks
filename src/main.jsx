/* global cozy, __TARGET__ */

import 'styles/main'

import React from 'react'
import { render } from 'react-dom'
import { I18n } from 'cozy-ui/react/I18n'
import { loadState, persistState } from 'store/persistedState'
import configureStore from 'store/configureStore'
import AppRoute from 'components/AppRoute'
import 'number-to-locale-string'
import { CozyProvider } from 'cozy-client'
import { setupHistory } from 'utils/history'
import { getClient } from 'utils/client'
import 'utils/flag'

if (__TARGET__ === 'mobile') {
  require('styles/mobile.styl')
}

if (process.env.NODE_ENV === 'development') {
  require('preact/debug')
}

const renderAppWithPersistedState = async persistedState => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const lang = __TARGET__ === 'mobile' && navigator && navigator.language ? navigator.language.slice(0, 2) : data.cozyLocale || 'en'

  const history = setupHistory()

  const client = await getClient()
  const store = configureStore(client, persistedState)

  // TODO cozy-client-v2
  // Initialize settings
  // store.dispatch(fetchSettingsCollection()).then(
  //   res => {
  //     if (res.data.length === 0) {
  //       store.dispatch(initSettings())
  //     }
  //   }
  // )

  persistState(store)

  const Router = __TARGET__ === 'mobile' ? require('ducks/authentication/MobileRouter').default : require('react-router').Router

  if (__TARGET__ !== 'mobile') {
    cozy.bar.init({
      appName: data.cozyAppName,
      iconPath: data.cozyIconPath,
      lang: data.cozyLocale,
      replaceTitleOnMobile: true
    })
  }

  render(
    <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
      <CozyProvider store={store} client={client}>
        <Router history={history} routes={AppRoute} />
      </CozyProvider>
    </I18n>,
    document.querySelector('[role=application]')
  )
}

document.addEventListener('DOMContentLoaded', () => {
  loadState().then(renderAppWithPersistedState)
})
