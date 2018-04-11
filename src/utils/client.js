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
  return (...args) => {
    if (typeof res === 'undefined') {
      res = fn(...args)
    }
    return res
  }
}

export const getClient = memoize(persistedState => {
  return __TARGET__ === 'mobile'
    ? getClientMobile(persistedState)
    : getClientBrowser()
})
