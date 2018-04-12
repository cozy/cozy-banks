/* global cozy __APP_VERSION__ */
import { OAuthClient } from 'cozy-stack-client'
import localforage from 'localforage'

import getPermissions from 'utils/getPermissions'
import { capitalize } from 'lodash'

const SOFTWARE_ID = 'io.cozy.banks.mobile'
const SOFTWARE_NAME = 'Cozy Banks'
const getLang = () => (navigator && navigator.language) ? navigator.language.slice(0, 2) : 'en'
const isCordova = () => window.cordova !== undefined
const hasDeviceCordovaPlugin = () => isCordova() && window.device !== undefined

const getAppleModel = identifier => {
  const devices = ['iPhone', 'iPad']

  for (const device of devices) {
    if (identifier.match(new RegExp(device))) {
      return device
    }
  }

  return 'device'
}

export const getDeviceName = () => {
  if (!hasDeviceCordovaPlugin()) {
    return 'Device'
  }

  const {
    manufacturer,
    model: originalModel
  } = window.device

  const model = manufacturer === 'Apple' ? getAppleModel(originalModel) : originalModel

  return `${capitalize(manufacturer)} ${model}`
}

export const getDevicePlatform = () => {
  return window.device.platform.toLowerCase()
}

export const persistCredentials = (url, clientInfo, token) => {
  return localforage.setItem('oauth', { url, clientInfo, token })
}

export const getPersistedCredentials = () => {
  return localforage.getItem('oauth')
}

export const eraseCredentials = () => {
  return localforage.setItem('oauth', null)
}

export const initMobileStackClient = async () => {
  const credentials = await getPersistedCredentials() || {}
  const { url, clientInfo, token } = credentials
  return new OAuthClient({
    uri: url,
    scope: getPermissions(),
    token,
    oauth: {
      ...{
        redirectURI: 'http://localhost',
        softwareID: SOFTWARE_ID,
        clientName: `${SOFTWARE_NAME} (${getDeviceName()})`,
        softwareVersion: __APP_VERSION__,
        clientKind: 'mobile',
        clientURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank',
        logoURI: 'https://gitlab.cozycloud.cc/labs/cozy-bank/raw/master/src/targets/favicons/favicon-32x32.png',
        policyURI: 'https://files.cozycloud.cc/cgu.pdf',
        notificationPlatform: getDevicePlatform(),
        onTokenRefresh: accessToken => {
          cozy.bar.updateAccessToken(accessToken)
        }
      },
      ...clientInfo
    }
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
