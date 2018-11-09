/* global cozy */
const getLang = () =>
  navigator && navigator.language ? navigator.language.slice(0, 2) : 'en'

export async function resetClient(cozyClient) {
  if (cozyClient) {
    await cozyClient.logout()
  }

  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
  }
}

export const initBar = (url, accessToken, options = {}) => {
  cozy.bar.init({
    appNamePrefix: 'Cozy',
    appName: 'Banks',
    appEditor: 'Cozy',
    appSlug: 'banks',
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
