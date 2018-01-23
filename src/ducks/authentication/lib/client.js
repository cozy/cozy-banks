/* global cozy __APP_VERSION__ */
import { CozyClient } from 'cozy-client'
import { LocalStorage as Storage } from 'cozy-client-js'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'

const isCordova = () => window.cordova !== undefined
const hasDeviceCordovaPlugin = () => isCordova() && window.device !== undefined
export const getDeviceName = () => hasDeviceCordovaPlugin() ? window.device.model : 'Device'
const SOFTWARE_ID = 'io.cozy.banks.mobile'
const SOFTWARE_NAME = 'Cozy Banks'
const getLang = () => (navigator && navigator.language) ? navigator.language.slice(0, 2) : 'en'

export function resetClient (clientInfo, client) {
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

export const initClient = (url) => {
  return new CozyClient({
    cozyURL: url,
    oauth: {
      storage: new Storage(),
      clientParams: {
        redirectURI: 'http://localhost',
        softwareID: SOFTWARE_ID,
        clientName: `${SOFTWARE_NAME} (${getDeviceName()})`,
        softwareVersion: __APP_VERSION__,
        clientKind: 'mobile',
        clientURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank',
        logoURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank/raw/master/src/targets/favicons/favicon-32x32.png',
        policyURI: 'https://files.cozycloud.cc/cgu.pdf',
        scopes: [
          'io.cozy.notifications',
          'io.cozy.bank.settings',
          'io.cozy.bank.accounts',
          'io.cozy.bank.operations',
          'io.cozy.bank.groups',
          'io.cozy.bills',
          'io.cozy.settings',
          'io.cozy.mocks.sharings',
          'io.cozy.mocks.recipients',
          'io.cozy.apps'
        ]
      }
    },
    offline: {doctypes: [ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE]}
  })
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
