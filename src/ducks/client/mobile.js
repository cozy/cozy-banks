/* global cozy, __APP_VERSION__ */
import CozyClient from 'cozy-client'
import { merge, get } from 'lodash'
import { getLinks } from './links'

import { schema } from 'doctypes'
import manifest from '../../../manifest.webapp'
import { getManifestOptions } from 'utils/mobileClient'

const SOFTWARE_ID = 'io.cozy.banks.mobile'

const getCozyURI = state => get(state, 'mobile.url')
const getToken = state => get(state, 'mobile.token')

export const getClient = state => {
  const uri = getCozyURI(state)
  const token = getToken(state)

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
    onTokenRefresh: accessToken => {
      cozy.bar.updateAccessToken(accessToken)
    },
    links: getLinks()
  }

  return new CozyClient(merge(manifestOptions, banksOptions))
}
