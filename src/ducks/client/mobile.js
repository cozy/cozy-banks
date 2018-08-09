/* global __APP_VERSION__ */
import CozyClient from 'cozy-client'
import merge from 'lodash/merge'

import { offlineDoctypes } from 'doctypes'
import manifest from '../../../manifest.webapp'
import { getManifestOptions } from 'utils/mobileClient'

const SOFTWARE_ID = 'io.cozy.banks.mobile'

export const getCozyURL = state => state.mobile && state.mobile.url
export const getToken = state => state.mobile && state.mobile.token

export const getClient = (uri, token) => {
  const manifestOptions = getManifestOptions(manifest)
  const banksOptions = {
    uri,
    token,
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
    offline: {
      doctypes: offlineDoctypes
    }
  }
  const options = merge(manifestOptions, banksOptions)

  return new CozyClient(options)
}
