import CozyClient from 'cozy-client'
import { schema } from 'doctypes'
import { receiveQueryResult, initQuery } from 'cozy-client/dist/store'
import { normalizeDoc } from 'cozy-stack-client/dist/DocumentCollection'

const defaultOptions = {
  uri: 'http://cozy.works:8080',
  token: 'MyOwnToken'
}

export const getClient = ({ uri, token, fetchJSONReturn } = defaultOptions) => {
  const client = new CozyClient({
    schema,
    uri,
    token
  })
  if (fetchJSONReturn) {
    client.client.fetchJSON = jest.fn().mockReturnValue(fetchJSONReturn)
  }
  client.intents = {
    create: () => {
      return {
        start: () => Promise.resolve()
      }
    }
  }
  return client
}

export const createClientWithData = ({ queries, data, clientOptions }) => {
  const client = new CozyClient(clientOptions || {})
  client.ensureStore()
  for (let [queryName, queryOptions] of Object.entries(queries || {})) {
    client.store.dispatch(
      initQuery(
        queryName,
        queryOptions.definition || client.all(queryOptions.doctype)
      )
    )
    client.store.dispatch(
      receiveQueryResult(queryName, {
        data: queryOptions.data.map(doc =>
          normalizeDoc(doc, queryOptions.doctype)
        )
      })
    )
  }
  client.query = jest.fn().mockImplementation(qdef => {
    if (data[qdef.doctype]) {
      return { data: data[qdef.doctype] }
    } else {
      return { data: [] }
    }
  })

  client.save = jest.fn()
  client.stackClient.fetchJSON = jest.fn()

  return client
}

export default getClient
