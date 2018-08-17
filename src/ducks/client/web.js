/* global cozy */
import CozyClient from 'cozy-client'
import { schema } from 'doctypes'

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
  cozy.client.init({ cozyURL: uri, token })
  const client = new CozyClient({ uri, token, schema })

  return client
}
