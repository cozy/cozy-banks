export const isCollectionLoading = col => {
  if (!col) {
    console.warn('isCollectionLoading called on falsy value.') // eslint-disable-line no-console
    return false
  }
  return col.fetchStatus === 'loading' || col.fetchStatus === 'pending'
}

export const mkEmptyDocFromSchema = schema => {
  const obj = {
    _type: schema.doctype
  }
  Object.entries(schema.relationships).forEach(([attr, options]) => {
    if (options.type === 'has-many') {
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
