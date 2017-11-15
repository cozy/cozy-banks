/* global __TARGET__ */

import { initClient } from 'ducks/authentication/lib/client'
import { CozyClient } from 'cozy-client'

export const getClientMobile = persistedState => {
  const hasPersistedMobileStore = persistedState && persistedState.mobile
  return initClient(hasPersistedMobileStore ? persistedState.mobile.url : '')
}

export const getClientBrowser = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  return new CozyClient({
    cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })
}

const memoize = fn => {
  let res
  return () => {
    if (typeof res === 'undefined') {
      res = fn()
    }
    return res
  }
}

export const getClient = memoize(() => {
  return __TARGET__ === 'mobile' ? getClientMobile() : getClientBrowser()
})
