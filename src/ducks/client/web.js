import CozyClient from 'cozy-client'
import { Intents } from 'cozy-interapp'
import { schema } from 'doctypes'
import { getLinks } from './links'

export const getToken = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  return data.cozyToken
}

export const getCozyURL = () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol

  return `${protocol}//${data.cozyDomain}`
}

export const getClient = (uri, token) => {
  const client = new CozyClient({ uri, token, schema, links: getLinks() })

  const intents = new Intents({ client })
  client.intents = intents

  return client
}
