import fetch from 'node-fetch'
global.fetch = fetch

import CozyClient from 'cozy-client'
import { schema } from 'doctypes'
import { Document } from 'cozy-doctypes'

export const runService = service => {
  const client = CozyClient.fromEnv(process.env, {
    schema
  })
  Document.registerClient(client)

  return service({ client }).catch(e => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
}
