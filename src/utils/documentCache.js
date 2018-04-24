/* global cozy */

const cache = {}

const get = async (doctype, id) => {
  const key = `${doctype}:${id}`
  if (!cache[key]) {
    try {
      const doc = await cozy.client.data.find(doctype, id)
      cache[key] = doc
    } catch (e) {
      return
    }
  }
  return cache[key]
}

export { get }
