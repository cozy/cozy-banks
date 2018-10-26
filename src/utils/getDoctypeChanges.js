import { cozyClient, log } from 'cozy-konnector-libs'

export default async function getDoctypeChanges(doctype, since, filterFn) {
  // lastSeq = '0' // Useful for debug
  log('info', `Get ${doctype} updates since ${since}`)
  const result = await cozyClient.fetchJSON(
    'GET',
    `/data/${doctype}/_changes?include_docs=true&since=${since}`
  )

  const newLastSeq = result.last_seq
  const documents = result.results
    .map(x => {
      if (!x.doc) {
        log(
          'warn',
          `This response row doesn't contain a doc. Why?`,
          JSON.stringify(x)
        )
      }
      return x.doc
    })
    .filter(doc => doc._id.indexOf('_design') !== 0)
    .filter(doc => !doc._deleted)
    .filter(doc => (filterFn ? filterFn(doc) : true))
    .filter(Boolean) // TODO find out why some documents are not returned

  return { newLastSeq, documents }
}
