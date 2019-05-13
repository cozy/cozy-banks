import { protocol } from 'ducks/mobile/constants'

import { getUniversalLinkDomain } from 'cozy-ui/transpiled/react/AppLinker'
import { isAndroidApp } from 'cozy-device-helper'

export const getRedirectUri = appSlug => {
  return isAndroidApp()
    ? protocol + 'auth'
    : getUniversalLinkDomain() + '/' + appSlug + '/auth'
}
