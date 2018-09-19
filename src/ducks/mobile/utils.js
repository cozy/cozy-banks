/* global cozy */
const getLang = () =>
  navigator && navigator.language ? navigator.language.slice(0, 2) : 'en'

export function resetClient(cozyClient) {
  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
  }

  if (cozyClient) {
    cozyClient.logout()
  }
}

export const initBar = (url, accessToken, options = {}) => {
  cozy.bar.init({
    appName: 'Banks',
    appEditor: 'Cozy',
    appSlug: 'banks',
    cozyURL: url,
    token: accessToken,
    iconPath: require('targets/favicons/icon-banks.svg'),
    lang: getLang(),
    replaceTitleOnMobile: true,
    displayOnMobile: true,
    ...options
  })
}

export const updateAccessTokenBar = accessToken => {
  cozy.bar.updateAccessToken(accessToken)
}
