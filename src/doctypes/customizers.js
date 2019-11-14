import mergeWith from 'lodash/mergeWith'
import mapValues from 'lodash/mapValues'

// We trust the server by default
const DEFAULT_POLICY = 'server'

// When the value of an array is present in the server document but
// not in the user document, by default we trust the user, otherwise
// a user could not delete an item from an array
const DEFAULT_DELETION_POLICY = 'user'

const mergePolicies = {
  user: (serverValue, userValue) => userValue,
  server: serverValue => serverValue
}

const getCustomizerFromPolicy = policy => {
  return mergePolicies[policy] || mergePolicies[DEFAULT_POLICY]
}

/**
 * Can control what happens if case of deletion, should we trust the
 * server or the user ?
 */
const deletionPolicies = {
  user: group => group.user
}

/**
 * Returns a customizer to merge arrays of objects
 */
const mkArrayCustomizer = schema => {
  const itemCustomizer = mkObjectCustomizer(schema)
  return (serverValues, userValues) =>
    mergeArrays(serverValues, userValues, schema, itemCustomizer)
}

/**
 * From an object { attribute -> customizer }, returns a customizer
 * that will merge objects with per-attribute customizer.
 * If no customizer is precised for an attribute, the DEFAULT_POLICY
 * will be used
 */
const combineCustomizers = customizersByAttr => {
  return (serverValue, userValue, key) => {
    const customizer = customizersByAttr[key] || mergePolicies[DEFAULT_POLICY]
    return customizer(serverValue, userValue, key)
  }
}

/**
 * Returns a customizer to merge two objects according to a schema
 */
const mkObjectCustomizer = schema => {
  // Each attribute can be a schema so we recurse
  const perAttributeCustomizers = mapValues(schema.attributes, schemaCustomizer)
  const itemCustomizer = combineCustomizers(perAttributeCustomizers)
  return itemCustomizer
}

/**
 * Utilities to make customizers according to the type of the schema
 */
export const customizerFactories = {
  array: mkArrayCustomizer,
  object: mkObjectCustomizer
}

const invalidTypeError = wrongType => {
  return new Error(
    `${wrongType} is not a valid type, available types : ${Object.keys(
      customizerFactories
    ).join(', ')}`
  )
}

/**
 * From a declarative schema, builds a customizer usable with lodash's
 * mergeWith.
 *
 * ```
 * const schema = {
 *   attributes: {
 *     name: {
 *       conflictResolution: 'user'
 *     },
 *     messages: {
 *       type: 'array',
 *       attributes: {
 *         isImportant: {
 *           conflictResolution: 'user',
 *          },
 *         hasBeenRead: {
 *           conflictResolution: 'server'
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * const customizer = schemaCustomizer(schema)
 * ```
 */
export const schemaCustomizer = schema => {
  if (schema.attributes) {
    // If a type is given on the schema, it can serve to transform
    // the item customizer, for it work on the given type (ex: array)
    const customizerFactory = customizerFactories[schema.type || 'object']

    if (customizerFactory === undefined) {
      throw invalidTypeError(schema.type)
    }

    return customizerFactory(schema)
  } else {
    // We are on leaves, where the user has directly indicated a conflictResolution
    return getCustomizerFromPolicy(schema.conflictResolution)
  }
}

/**
 * Zips values contained in valuesByName entries. Each item of the
 * resulting array is an object keyed by the "name" under which the
 * value was found.
 *
 * @example
 * ```
 * > objectZip({
 *   server: [{ id: 1, name: 'toto'}, { id: 2: name: 'foo'}],
 *   user: [{ id: 1, name: 'tata'}]
 * }, 'id')
 * [
 *   {
 *     server: { id: 1, name: 'toto' },
 *     user: { id: 1, name: 'tata'}
 *    },
 *   { server: { id: 2, name: 'foo'} }
 * ]
 * ```
 */
const objectZip = (valuesByName, idAttribute) => {
  const groups = {}
  Object.entries(valuesByName).forEach(([valueName, values]) => {
    values.forEach(value => {
      const id = value[idAttribute]
      groups[id] = groups[id] || {}
      Object.assign(groups[id], {
        [valueName]: value
      })
    })
  })

  return Object.values(groups)
}

/**
 * Merge two arrays by first regrouping values according to their
 * attribute and then, by group, merging values according to
 * itemCustomizer
 */
const mergeArrays = (serverValues, userValues, schema, itemCustomizer) => {
  const { deletionPolicy: deletionPolicyName, idAttribute } = schema
  const groups = objectZip(
    {
      server: serverValues,
      user: userValues
    },
    idAttribute
  )

  const deletionPolicy =
    deletionPolicies[deletionPolicyName || DEFAULT_DELETION_POLICY]
  return Object.values(groups)
    .filter(deletionPolicy)
    .map(group => mergeWith(group.server, group.user, itemCustomizer))
}
