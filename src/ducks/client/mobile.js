/* global __APP_VERSION__ */
import CozyClient, { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'
import { OAuthClient } from 'cozy-stack-client'
import { merge, get } from 'lodash'

import { offlineDoctypes, schema } from 'doctypes'
import manifest from '../../../manifest.webapp'
import { getManifestOptions } from 'utils/mobileClient'

const SOFTWARE_ID = 'io.cozy.banks.mobile'

export const getCozyURL = state => get(state, 'mobile.url')
export const getToken = state => get(state, 'mobile.token')

export const getClient = (uri, token) => {
  const manifestOptions = getManifestOptions(manifest)
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
      notificationPlatform: 'firebase'
    },
    link: [pouchLink, stackLink]
  }
  const options = merge(manifestOptions, banksOptions)

  const oAuthClient = new OAuthClient(options)
  const stackLink = new StackLink({ client: oAuthClient })
  const pouchLink = new PouchLink({
    doctypes: offlineDoctypes,
    client: oAuthClient
  })

  const client = new CozyClient(merge(options, { client: oAuthClient }))
  pouchLink.syncAll()
  window.c = client

  return client
}
