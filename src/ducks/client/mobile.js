/* global cozy, __APP_VERSION__ */
import CozyClient from 'cozy-client'
import { getDeviceName } from 'cozy-device-helper'

import { merge, get } from 'lodash'
import { getLinks } from './links'
import { schema } from 'doctypes'
import manifest from 'manifest.webapp'
import { setToken, revokeClient } from 'ducks/mobile'

const SOFTWARE_ID = 'registry://banks'

const getCozyURIFromState = state => get(state, 'mobile.url')
const getTokenFromState = state => get(state, 'mobile.token')
const getClientInfosFromState = state => get(state, 'mobile.client')

export const getScope = m => {
  if (m.permissions === undefined) {
    throw new Error(`Your manifest must have a 'permissions' key.`)
  }

  return Object.keys(m.permissions).map(permission => {
    const { type /*, verbs, selector, values*/ } = m.permissions[permission]

    return type
  })
}

export const getSoftwareName = m => {
  if (m.name === undefined) {
    throw new Error(`Your manifest must have a 'name' key.`)
  }

  return m.name_prefix ? `${m.name_prefix} ${m.name}` : m.name
}

export const getClientName = m => `${getSoftwareName(m)} (${getDeviceName()})`

export const getManifestOptions = manifest => {
  const cozyPolicyURI = 'https://files.cozycloud.cc/cgu.pdf'

  return {
    oauth: {
      clientName: getClientName(manifest),
      policyURI: manifest.name_prefix === 'Cozy' ? cozyPolicyURI : ''
    },
    scope: getScope(manifest)
  }
}

export const isRevoked = async client => {
  try {
    await client.stackClient.fetchInformation()
    return false
  } catch (err) {
    if (err.message && err.message.indexOf('Client not found') > -1) {
      return true
    } else {
      return false
    }
  }
}

const unregister = client => {
  client.stackClient.unregister()
}

const checkForRevocation = async (client, getStore) => {
  const revoked = await isRevoked(client)
  if (revoked) {
    const store = getStore()
    unregister(client)
    await store.dispatch(revokeClient())
  }
}

export const getClient = (state, getStore) => {
  const uri = getCozyURIFromState(state)
  const token = getTokenFromState(state)
  const clientInfos = getClientInfosFromState(state)
  const manifestOptions = getManifestOptions(manifest)

  let client
  const banksOptions = {
    uri,
    token,
    schema,
    oauth: {
      redirectURI: 'cozybanks://auth',
      softwareID: SOFTWARE_ID,
      softwareVersion: __APP_VERSION__,
      clientKind: 'mobile',
      clientURI: 'https://github.com/cozy/cozy-banks',
      logoURI:
        'https://downcloud.cozycloud.cc/upload/cozy-banks/email-assets/logo-bank.png',
      notificationPlatform: 'firebase',
      ...clientInfos
    },
    onTokenRefresh: token => {
      cozy.bar.updateAccessToken(token.accessToken)
      getStore().dispatch(setToken(token))
    },
    links: getLinks({
      pouchLink: {
        onSyncError: async () => {
          checkForRevocation(client, getStore)
        }
      }
    })
  }

  client = new CozyClient(merge(manifestOptions, banksOptions))
  return client
}
