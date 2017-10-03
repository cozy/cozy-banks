/* global cozy */
const FILES_DOCTYPE = 'io.cozy.files'
const FETCH_LIMIT = 50

const REPLICATION_INTERVAL = 10

export default class PouchdbAdapter {
  constructor (config) {
    cozy.client.init(config)
    config.offline.doctypes.forEach(doctype =>
      cozy.client.offline.startRepeatedReplication(doctype, REPLICATION_INTERVAL, {
        onComplete: (result) => console.log(result)
      })
    )
  }

  getDatabase (doctype) {
    return cozy.client.offline.getDatabase(doctype)
  }

  fetchDocuments (doctype) {
    return this.getDatabase(doctype).allDocs({ include_docs: true })
  }

  queryDocuments (doctype, index, options) {
    return this.getDatabase(doctype).find(options)
  }

  fetchDocument (doctype, id) {
    return this.getDatabase(doctype).get(id)
  }

  createDocument (doc) {
    return this.getDatabase(doc._type).put(doc)
  }

  updateDocument (doc) {
    return this.getDatabase(doc._type).put(doc)
  }

  deleteDocument (doc) {
    return this.getDatabase(doc._type).remove(doc)
  }

  createIndex (doctype, fields) {
    return this.getDatabase(doctype).createIndex({ index: { fields } })
  }

  async fetchFileByPath (path) {
    throw 'Not implemented'
  }

  async createFile (file, dirID) {
    throw 'Not implemented'
  }

  async trashFile (file) {
    throw 'Not implemented'
  }

  async fetchReferencedFiles (doc, skip = 0) {
    throw 'Not implemented'
  }

  async addReferencedFiles (doc, ids) {
    throw 'Not implemented'
  }

  async removeReferencedFiles (doc, ids) {
    throw 'Not implemented'
  }
}
