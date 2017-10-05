/* global cozy __APP_VERSION__ */
import { CozyClient } from 'redux-cozy-client'
import { LocalStorage as Storage } from 'cozy-client-js'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'

const isCordova = () => window.cordova !== undefined
const hasDeviceCordovaPlugin = () => isCordova() && window.device !== undefined
export const getDeviceName = () => hasDeviceCordovaPlugin() ? window.device.model : 'Device'
const SOFTWARE_ID = 'io.cozy.bank.mobile'
const SOFTWARE_NAME = 'Cozy Bank'
const getLang = () => (navigator && navigator.language) ? navigator.language.slice(0, 2) : 'en'

export function resetClient (clientInfo) {
  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
  }
  // reset pouchDB
  if (cozy.client.offline.destroyAllDatabase) {
    cozy.client.offline.destroyAllDatabase()
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
        scopes: ['io.cozy.notifications', 'io.cozy.bank.settings', 'io.cozy.bank.accounts', 'io.cozy.bank.operations', 'io.cozy.bank.groups', 'io.cozy.bills', 'io.cozy.settings', 'io.cozy.mocks.sharings', 'io.cozy.mocks.recipients']
      }
    },
    offline: {doctypes: [ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE]}
  })
}

export const initBar = () => {
  cozy.bar.init({
    appName: 'Bank',
    appEditor: 'Cozy',
    iconPath: require('targets/favicons/icon-bank.svg'),
    lang: getLang(),
    replaceTitleOnMobile: true
  })
}
