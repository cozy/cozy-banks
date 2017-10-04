/* global cozy __APP_VERSION__ */

import { LocalStorage as Storage } from 'cozy-client-js'
import { onRegistered } from './registration'

const isCordova = () => window.cordova !== undefined
const hasDeviceCordovaPlugin = () => isCordova() && window.device !== undefined
export const getDeviceName = () => hasDeviceCordovaPlugin() ? window.device.model : 'Device'
const SOFTWARE_ID = 'io.cozy.bank.mobile'
const SOFTWARE_NAME = 'Cozy Bank'
const getLang = () => (navigator && navigator.language) ? navigator.language.slice(0, 2) : 'en'

export function resetClient () {
  // reset cozy-bar
  if (document.getElementById('coz-bar')) {
    document.getElementById('coz-bar').remove()
  }
  // reset pouchDB
  if (cozy.client.offline.destroyAllDatabase) {
    cozy.client.offline.destroyAllDatabase()
  }
  // reset cozy-client-js
  if (cozy.client._storage) {
    cozy.client._storage.clear()
  }
}

export const initClient = (url, onRegister = null, deviceName) => {
  if (url) {
    console.log(`Cozy Client initializes a connection with ${url}`)
    cozy.client.init({
      cozyURL: url,
      oauth: {
        storage: new Storage(),
        clientParams: {
          redirectURI: 'http://localhost',
          softwareID: SOFTWARE_ID,
          clientName: `${SOFTWARE_NAME} (${deviceName})`,
          softwareVersion: __APP_VERSION__,
          clientKind: 'mobile',
          clientURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank',
          logoURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank/raw/master/src/targets/favicons/favicon-32x32.png',
          policyURI: 'https://files.cozycloud.cc/cgu.pdf',
          scopes: ['io.cozy.notifications', 'io.cozy.bank.settings', 'io.cozy.bank.accounts', 'io.cozy.bank.operations', 'io.cozy.bank.groups', 'io.cozy.bills', 'io.cozy.settings', 'io.cozy.mocks.sharings', 'io.cozy.mocks.recipients']
        },
        onRegistered: onRegister
      },
      offline: {doctypes: ['io.cozy.bank.settings', 'io.cozy.bank.accounts', 'io.cozy.bank.operations', 'io.cozy.bank.groups', 'io.cozy.bills', 'io.cozy.settings']}
    })
  }
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

const registrationCallback = (client, url) => {
  return onRegistered(client, url)
}

export const registerDevice = (serverUrl) => {
  initClient(serverUrl, registrationCallback, getDeviceName())
  return cozy.client.authorize(true)
}

export const isClientRegistered = async (client) => {
  try {
    await cozy.client.auth.getClient(client)
    return true
  } catch (err) {
    // this is the error sent if we are offline
    if (err.message === 'Failed to fetch') {
      return true
    } else {
      console.warn(err)
      return false
    }
  }
}
