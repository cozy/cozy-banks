/* global __TARGET__ */

let client

const lib = __TARGET__ === 'mobile' ? require('./mobile') : require('./web')

export const getClient = state => {
  if (client) {
    return client
  }

  const cozyURL = lib.getCozyURL(state)
  const token = lib.getToken(state)
  client = lib.getClient(cozyURL, token)

  // eslint-disable-next-line no-console
  console.log('client', client)

  return client
}
