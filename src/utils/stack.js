/* global cozy */

const flagForDeletion = doc => {
  return {_id: doc._id, _rev: doc._rev, _deleted: true}
}

export const deleteAll = async (doctype, docs) => {
  return cozy.client.fetchJSON(
    'POST', `/data/${doctype}/_bulk_docs`,
    { docs: docs.map(flagForDeletion) }
  )
}

export const queryAll = function (mangoIndex, options = {}) {
  return new Promise((resolve, reject) => {
    const documents = []
    let skip = options.skip || 0
    const fetch = () => {
      return cozy.client.data.query(mangoIndex, {
        ...options,
        wholeResponse: true,
        skip: skip
      })
        .then(onSuccess)
        .catch(reject)
    }
    const onSuccess = response => {
      const docs = response.docs
      skip = skip + docs.length
      documents.push.apply(documents, docs)
      if (response.next) {
        fetch()
      } else {
        resolve(documents)
      }
    }
    fetch()
  })
}
