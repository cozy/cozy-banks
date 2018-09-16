import React from 'react'

import { flowRight as compose } from 'lodash'
import { withMutations, Query } from 'cozy-client'

export const links = {}

export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest], Component)
  )
  enhancers.push(withMutations())
  return compose.apply(null, enhancers)(Component)
}

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

const ccRelationships = {
  // TODO export Relationship from cozy-client to check this
  isRelationship: value => !!value.target,
  // TODO add raw method to Relationships from cozy-client
  getRaw: value => value.target
}

export const dehydrateDoc = obj => {
  if (!obj) {
    return
  }
  const res = {}

  Object.entries(obj).forEach(([attr, value]) => {
    if (value instanceof Relationship) {
      res[attr] = value.raw()
    } else if (ccRelationships.isRelationship(value)) {
      res[attr] = ccRelationships.getRaw(value)
    } else {
      res[attr] = value
    }
  })
  return res
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
