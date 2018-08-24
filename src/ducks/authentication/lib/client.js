/* global cozy */
const getLang = () =>
  navigator && navigator.language ? navigator.language.slice(0, 2) : 'en'

export function resetClient(clientInfo, client) {
  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
  }
  // reset pouchDB
  if (client && client.resetStore) {
    client.resetStore()
  }
  // unregister the client
  if (clientInfo && cozy.client.auth.unregisterClient) {
    cozy.client.auth.unregisterClient(clientInfo)
  }
  // reset cozy-client-js
  if (cozy.client._storage) {
    cozy.client._storage.clear()
  }
}

export const getToken = async () => {
  try {
    const response = await cozy.client.authorize()
    return response.token
  } catch (e) {
    throw e
  }
}

export const initBar = (url, accessToken, options = {}) => {
  cozy.bar.init({
    appName: 'Banks',
    appEditor: 'Cozy',
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
