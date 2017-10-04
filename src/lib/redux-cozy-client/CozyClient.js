/* global cozy */
import CozyStackAdapter from './adapters/CozyStackAdapter'
import PouchdbAdapter from './adapters/PouchdbAdapter'

export default class CozyClient {
  constructor (config) {
    this.indexes = {}
    this.specialDirectories = {}
    this.adapter = config.offline ? new PouchdbAdapter(config) : new HttpAdapter(config)
  }

  async fetchCollection (name, doctype, options = {}, skip = 0) {
    if (options.selector) {
      const index = await this.getCollectionIndex(name, doctype, options)
      return this.adapter.queryDocuments(doctype, index, {...options, skip})
    }
    return this.adapter.fetchDocuments(doctype)
  }

  fetchDocument (doctype, id) {
    return this.adapter.fetchDocument(doctype, id)
  }

  fetchFile (id) {
    return this.adapter.fetchFile(id)
  }

  fetchReferencedFiles (doc, skip = 0) {
    return this.adapter.fetchReferencedFiles(doc, skip)
  }

  addReferencedFiles (doc, ids) {
    return this.adapter.addReferencedFiles(doc, ids)
  }

  removeReferencedFiles (doc, ids) {
    return this.adapter.removeReferencedFiles(doc, ids)
  }

  createDocument (doc) {
    return this.adapter.createDocument(doc)
  }

  updateDocument (doc) {
    return this.adapter.updateDocument(doc)
  }

  deleteDocument (doc) {
    return this.adapter.deleteDocument(doc)
  }

  createFile (file, dirID) {
    return this.adapter.createFile(file, dirID)
  }

  trashFile (file) {
    return this.adapter.trashFile(file)
  }

  async ensureDirectoryExists (path) {
    if (!this.specialDirectories[path]) {
      const dir = await cozy.client.files.createDirectoryByPath(path)
      this.specialDirectories[path] = dir._id
    }
    return this.specialDirectories[path]
  }

  async checkUniquenessOf (doctype, property, value) {
    const index = await this.getUniqueIndex(doctype, property)
    const existingDocs = await cozy.client.data.query(index, {
      selector: { [property]: value },
      fields: ['_id']
    })
    return existingDocs.length === 0
  }

  async getCollectionIndex (name, doctype, options) {
    if (!this.indexes[name]) {
      this.indexes[name] = await this.adapter.createIndex(doctype, this.getIndexFields(options))
    }
    return this.indexes[name]
  }

  async getUniqueIndex (doctype, property) {
    const name = `${doctype}/${property}`
    if (!this.indexes[name]) {
      this.indexes[name] = await this.adapter.createIndex(doctype, [property])
    }
    return this.indexes[name]
  }

  getIndexFields (options) {
    const { selector, sort } = options
    if (sort) {
      // We filter possible duplicated fields 
      return [...Object.keys(selector), ...Object.keys(sort)].filter((f, i, arr) => arr.indexOf(f) === i)
    }
    return Object.keys(selector)
  }

  startSync () {
    return this.adapter.startSync()
  }
}
