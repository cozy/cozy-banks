import mergeWith from 'lodash/mergeWith'
import { schema } from './schema'
import { schemaCustomizer } from './customizers'

export const isDocumentUpdateConflict = error => {
  try {
    const data = JSON.parse(error.message)
    return (
      data.error === 'conflict' ||
      data.status === '409' ||
      data.reason === 'Document update conflict.'
    )
  } catch (e) {
    return false
  }
}

/**
 * Fetches remote document corresponding to {_type, _id} of doc, merges doc
 * against the remote doc according to doctype schema, and saves it
 */
export const recoverFromConflict = async (client, doc) => {
  // Re-fetch and merge according to getDoctypeSchema
  const { _id, _type } = doc
  const { data: latestDoc } = await client.query(client.all(_type).getById(_id))
  const docSchema = Object.values(schema).find(
    docSchema => docSchema.doctype === _type
  )

  const mergeCustomizer = schemaCustomizer(docSchema.conflicts)
  const updatedDoc = mergeWith(latestDoc, doc, mergeCustomizer)
  return await client.save(updatedDoc)
}

export const saveDocHandlingConflicts = async (client, updatedDoc) => {
  try {
    await client.save(updatedDoc)
  } catch (e) {
    if (isDocumentUpdateConflict(e)) {
      return recoverFromConflict(client, updatedDoc)
    } else {
      throw e
    }
  }
}
