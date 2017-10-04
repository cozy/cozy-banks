/* global cozy, PouchDB, pouchdbFind */
const FILES_DOCTYPE = 'io.cozy.files'
const FETCH_LIMIT = 50

const REPLICATION_INTERVAL = 30

export default class PouchdbAdapter {
  constructor (config) {
    // For now we let cozy-client-js creates PouchDB instances
    cozy.client.init(config)
    PouchDB.plugin(pouchdbFind)
    this.doctypes = config.offline.doctypes
  }

  getDatabase (doctype) {
    return cozy.client.offline.getDatabase(doctype)
  }

  startSync () {
    return Promise.all(this.doctypes.map(doctype =>
      cozy.client.offline.replicateFromCozy(doctype).catch(err => {
        // TODO: A 404 error on some doctypes is perfectly normal when there is no data
        // We should handle all errors in the same place
        if (err.status !== 404) {
          throw err
        }
      })
    )).then(() => {
      this.doctypes.forEach(doctype =>
        cozy.client.offline.startRepeatedReplication(doctype, REPLICATION_INTERVAL, {
          onComplete: (result) => console.log(result)
        })
      )
    })
  }

  async fetchDocuments (doctype) {
    const resp = await this.getDatabase(doctype).allDocs({ include_docs: true })
    return {
      data: resp.rows.filter(row => !row.doc.hasOwnProperty('views'))
        .map(row => ({...row.doc, id: row.id, _type: doctype})),
      meta: { count: resp.total_rows },
      skip: resp.offset,
      next: false
    }
  }

  async queryDocuments (doctype, index, options) {
    const queryOptions = {
      ...options,
      fields: [...options.fields, '_id'],
      sort: options.sort ? Object.keys(options.sort).map(k => ({[k]: options.sort[k]})) : undefined
    }
    const resp = await this.getDatabase(doctype).find(queryOptions)
    
    return {
      data: resp.docs.map(doc => ({...doc, id: doc._id, _type:doctype})),
      meta: { count: resp.docs.length },
      skip: 0,
      next: false
    }
  }

  async fetchDocument (doctype, id) {
    const resp = await this.getDatabase(doctype).get(id, { revs_info: true }) // We need the revs_info option to get the _rev property
    return { data: [{...resp, id: resp.id, _id: resp.id, _type: doctype}] }
  }

  async createDocument (doc) {
    const resp = await this.getDatabase(doc._type || doc.type).post(doc)
    return { data: [{...doc, id: resp.id, _id: resp.id}] }
  }

  async updateDocument (doc) {
    // TODO: _* properties are reserved by CouchDB, so we can't send the doc with its _type property...
    const { _type, ...safeDoc } = doc
    const resp = await this.getDatabase(_type).put(safeDoc)
    return { data: [{...doc, _rev: resp.rev}] }
  }

  async deleteDocument (doc) {
    const resp = await this.getDatabase(doc._type).remove(doc)
    return { data: [doc] }
  }

  createIndex (doctype, fields) {
    return this.getDatabase(doctype).createIndex({ index: { fields } })
  }

  fetchFileByPath (path) {
    throw 'Not implemented'
  }

  createFile (file, dirID) {
    throw 'Not implemented'
  }

  trashFile (file) {
    throw 'Not implemented'
  }

  fetchReferencedFiles (doc, skip = 0) {
    throw 'Not implemented'
  }

  addReferencedFiles (doc, ids) {
    throw 'Not implemented'
  }

  removeReferencedFiles (doc, ids) {
    throw 'Not implemented'
  }
}
