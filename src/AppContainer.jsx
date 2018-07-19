/* global __TARGET__ */

import { I18n } from 'cozy-ui/react/I18n'
import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'

const AppContainer = ({ store, lang, history, client }) => {
  const AppRoute = require('components/AppRoute').default
  const StoreProvider =
    __TARGET__ === 'mobile'
      ? require('cozy-client').CozyProvider
      : require('react-redux').Provider
  const Router =
    __TARGET__ === 'mobile'
      ? require('ducks/authentication/MobileRouter').default
      : require('react-router').Router
  const newCozyClient = new CozyClient({
    uri: client.facade.url,
    token: client.options.token
  })
  return (
    <CozyProvider client={newCozyClient}>
      <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
        <StoreProvider store={store} client={client}>
          <Router history={history} routes={AppRoute} />
        </StoreProvider>
      </I18n>
    </CozyProvider>
  )
}

export default AppContainer
