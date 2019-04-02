/* global cozy, __TARGET__, __DEV__ */
import { setTheme as setStatusBarTheme } from './statusBar'
import barOverrides from 'ducks/bar/overrides'
import { stopPushNotifications } from 'ducks/mobile/push'
import { resetFilterByDoc } from 'ducks/filters'
import { unlink } from 'ducks/mobile'

const getLang = () =>
  navigator && navigator.language ? navigator.language.slice(0, 2) : 'en'

export async function resetClient(cozyClient) {
  if (cozyClient) {
    await cozyClient.logout()
  }

  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
    document.body.setAttribute('style', '')
  }
}

export const initBar = (client, url, accessToken, options = {}) => {
  cozy.bar.init({
    appNamePrefix: 'Cozy',
    appName: 'Banks',
    appEditor: 'Cozy',
    appSlug: 'banks',
    cozyClient: client,
    cozyURL: url,
    token: accessToken,
    iconPath: require('targets/favicons/icon-banks.svg'),
    lang: getLang(),
    replaceTitleOnMobile: true,
    ...options
  })
}

export const updateAccessTokenBar = accessToken => {
  cozy.bar.updateAccessToken(accessToken)
}

export const setBarTheme = theme => {
  if (__TARGET__ === 'mobile') {
    setStatusBarTheme(theme)
  }

  if (cozy.bar && cozy.bar.setTheme) {
    const overrides = barOverrides[theme]
    cozy.bar.setTheme(theme, overrides)
  }
}

export const AUTH_PATH = 'authentication'
export const onLogout = async (store, cozyClient, routerOrHistoryOrReplace) => {
  await stopPushNotifications()
  store.dispatch(unlink())
  store.dispatch(resetFilterByDoc())

  try {
    await resetClient(cozyClient)

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.info('Resetted client')
    }
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('Error while resetting client', e)
    }
  }

  try {
    // TODO Some caller pass history, other the router
    if (routerOrHistoryOrReplace.push) {
      routerOrHistoryOrReplace.push(`/${AUTH_PATH}`)
    } else if (routerOrHistoryOrReplace.replace) {
      routerOrHistoryOrReplace.replace(`/${AUTH_PATH}`)
    } else {
      routerOrHistoryOrReplace(`/${AUTH_PATH}`)
    }
  } catch (e) {
    window.location.reload()
  }
}
