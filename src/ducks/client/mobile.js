/* global cozy, __APP_VERSION__ */

import CozyClient from 'cozy-client'
import { getDeviceName } from 'cozy-device-helper'

import { merge, get } from 'lodash'
import { getLinks } from './links'
import { schema } from 'doctypes'
import manifest from 'ducks/client/manifest'
import { revokeClient } from 'ducks/mobile'
import pushPlugin from 'ducks/mobile/push'
import barPlugin from 'ducks/mobile/bar'

import { protocol } from 'ducks/mobile/constants'
import { resetFilterByDoc } from 'ducks/filters'
import { unlink } from 'ducks/mobile'

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

// Should be moved to cozy-pouch
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

// Should be moved to cozy-pouch
const checkForRevocation = async (client, getStore) => {
  const revoked = await isRevoked(client)
  if (revoked) {
    const store = getStore()
    client.stackClient.unregister()
    await store.dispatch(revokeClient())
  }
}

const registerPlugin = (client, plugin) => {
  plugin(client)
}

const registerPluginsAndHandlers = (client, getStore) => {
  registerPlugin(client, pushPlugin)
  registerPlugin(client, barPlugin)

  client.on('logout', () => {
    const store = getStore()
    store.dispatch(unlink())
    store.dispatch(resetFilterByDoc())
  })
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
      redirectURI: __DEV__ ? 'http://localhost:5000/auth' : protocol + 'auth',
      softwareID: SOFTWARE_ID,
      softwareVersion: __APP_VERSION__,
      clientKind: 'mobile',
      clientURI: 'https://github.com/cozy/cozy-banks',
      logoURI:
        'https://downcloud.cozycloud.cc/upload/cozy-banks/email-assets/logo-bank.png',
      notificationPlatform: 'firebase',
      ...clientInfos
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
  registerPluginsAndHandlers(client, getStore)
  return client
}
