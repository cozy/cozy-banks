/* global __TARGET__ */

import { initMobileStackClient } from 'ducks/authentication/lib/client'

import CozyStackClient from 'cozy-stack-client'
import CozyClient, { StackLink, withMutations, Query } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'
import { schema } from 'doctypes'
import { flowRight as compose } from 'lodash'

import React from 'react'

export const links = {}

let client

export const getClient = async () => {
  if (client) {
    return client
  }
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

  client = new CozyClient({
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

export const withQuery = (dest, queryOpts) => Component => (props, context) => {
  queryOpts = typeof queryOpts === 'function' ? queryOpts(props) : queryOpts
  if (queryOpts.doc) {
    return <Component {...{ [dest]: queryOpts.doc, ...props }} />
  } else {
    if (!context.client) {
      console.warn('Context', context)
      throw new Error(
        'Query should be used with client in context (use CozyProvider to set context)'
      )
    }
    return (
      <Query {...queryOpts}>
        {result => {
          console.log('query result', dest, result)
          return <Component {...{ [dest]: result, ...props }} />
        }}
      </Query>
    )
  }
}

export const withCrud = withMutations(client => ({
  saveDocument: document => client.save(document),
  destroyDocument: document => client.destroy(document)
}))

export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest])
  )
  enhancers.push(withCrud)
  return compose.apply(null, enhancers)(Component)
}

export const isCollectionLoading = col => {
  if (!col) {
    console.warn('isCollectionLoading called on falsy value.')
    return false
  }
  console.log(col)
  return (
    col.fetchStatus === 'loading' ||
    col.fetchStatus === 'pending'
  )
}

