/* global __TARGET__ */

import { initClient } from 'ducks/authentication/lib/client'

import CozyStackClient from 'cozy-stack-client'
import CozyClient, { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'

export const getClientMobile = persistedState => {
  const hasPersistedMobileStore = persistedState && persistedState.mobile
  return initClient(hasPersistedMobileStore ? persistedState.mobile.url : '')
}

export const links = {}

export const getClientBrowser = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const stackClient = new CozyStackClient({
    uri: `${window.location.protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })

  links.pouch = new PouchLink({
    doctypes: ['io.cozy.bank.operations'],
    initialSync: true,
    client: stackClient
  })

  links.stack = new StackLink({ client: stackClient })

  const client = new CozyClient({
    link: [
      links.pouch,
      links.stack
    ],
  })

  return client
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
  return __TARGET__ === 'mobile' ? getClientMobile(persistedState) : getClientBrowser()
})
