/* global __TARGET__ */
import { Intents } from 'cozy-interapp'

let client

const lib = __TARGET__ === 'mobile' ? require('./mobile') : require('./web')

export const getClient = state => {
  if (client) {
    return client
  }

  const cozyURL = lib.getCozyURL(state)
  const token = lib.getToken(state)
  client = lib.getClient(cozyURL, token)

  const intents = new Intents({ client })
  client.intents = intents

  return client
}
