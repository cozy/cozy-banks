/* global __TARGET__ */

import React from 'react'
import { Provider } from 'react-redux'

import I18n from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import { CozyProvider } from 'cozy-client'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import flag from 'cozy-flags'

import { TrackerProvider } from 'ducks/tracking/browser'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.

https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const AppContainer = ({ store, lang, history, client }) => {
  const AppRoute = require('components/AppRoute').default
  const Router =
    __TARGET__ === 'mobile' || flag('authentication')
      ? require('ducks/mobile/MobileRouter').default
      : require('react-router').Router
  return (
    <BreakpointsProvider>
      <IconSprite />
      <TrackerProvider>
        <Provider store={store}>
          <StylesProvider generateClassName={generateClassName}>
            <CozyProvider client={client}>
              <I18n
                lang={lang}
                dictRequire={lang => require(`locales/${lang}`)}
              >
                <MuiCozyTheme>
                  <Router history={history} routes={AppRoute()} />
                </MuiCozyTheme>
              </I18n>
            </CozyProvider>
          </StylesProvider>
        </Provider>
      </TrackerProvider>
    </BreakpointsProvider>
  )
}

export default AppContainer
