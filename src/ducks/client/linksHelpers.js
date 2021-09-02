import fromPairs from 'lodash/fromPairs'

import { Q } from 'cozy-client'

export const makeWarmupQueryOptions = (doctype, indexedFields) => {
  return {
    definition: () => {
      const qdef = Q(doctype)
        .where(
          fromPairs(indexedFields.map(fieldName => [fieldName, { $gt: null }]))
        )
        .indexFields(indexedFields)
      return qdef
    },
    options: {
      as: `${doctype}-by-${indexedFields.join('-')}`
    }
  }
}
