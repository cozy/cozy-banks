/* global __TARGET__ */

import { initMobileStackClient } from 'ducks/authentication/lib/client'

import CozyStackClient from 'cozy-stack-client'
import CozyClient, { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'
import { schema
  /* ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE */ } from 'doctypes'

export const links = {}

export const getClient = async () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const stackClient = __TARGET__ === 'mobile'
    ? await initMobileStackClient()
    : new CozyStackClient({
      uri: `${window.location.protocol}//${data.cozyDomain}`,
      token: data.cozyToken
    })

  if (__TARGET__ === 'mobile') {
    links.pouch = new PouchLink({
      doctypes: ['io.cozy.bank.operations'],
      // doctypes: [ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE]
      initialSync: true,
      client: stackClient
    })
  }

  links.stack = new StackLink({ client: stackClient })

  const client = new CozyClient({
    link: [
      __TARGET__ === 'mobile' && links.pouch,
      links.stack
    ].filter(Boolean),
    schema: schema,
    // TODO: we need to pass the stack client to the client so that
    // OAuth register() call can be forwarded to the right stack client...
    // Definitely not good...
    client: stackClient
  })

  return client
}
