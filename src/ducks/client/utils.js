export const isCollectionLoading = col => {
  if (!col) {
    console.warn('isCollectionLoading called on falsy value.') // eslint-disable-line no-console
    return false
  }
  return col.fetchStatus === 'loading' || col.fetchStatus === 'pending'
}

class Relationship {}

export class UnsavedHasManyRelationship extends Relationship {
  constructor() {
    super()
    this.data = []
  }

  addById(id) {
    if (this.data.indexOf(id)) {
      this.data.push(id)
    }
  }

  removeById(id) {
    const i = this.data.indexOf(id)
    if (i > -1) {
      this.data.splice(i, 1)
    }
  }

  exists(obj) {
    return this.data.indexOf(obj.id) > -1
  }

  raw() {
    return this.data
  }
}

export const mkEmptyDocFromSchema = schema => {
  const obj = {
    _type: schema.doctype
  }
  Object.entries(schema.relationships).forEach(([attr, options]) => {
    if (options.type === 'has-many-UNSAFE') {
      obj[attr] = new UnsavedHasManyRelationship()
    } else {
      throw new Error('mkNewObject: Cannot understand ' + attr)
    }
  })
  return obj
}

export const associateDocuments = (
  originalDocument,
  associationName,
  associationDoctype,
  documentsToAssociate
) => {
  originalDocument[associationName] = {
    data: documentsToAssociate,
    doctype: associationDoctype,
    name: associationName,
    target: {
      ...originalDocument,
      [associationName]: documentsToAssociate.map(doc => doc.id)
    }
  }

  return originalDocument
}
