/**
 * Delete outdated results from cache
 */
const garbageCollect = (cache, maxDuration) => {
  const now = Date.now()
  for (const key of Object.keys(cache)) {
    const delta = now - cache[key].date
    if (delta > maxDuration) {
      delete cache[key]
    }
  }
}

/**
 * Memoize with maxDuration and custom key
 */
const memoize = (fn, options) => {
  const cache = {}

  return function() {
    const key = options.key.apply(null, arguments)
    garbageCollect(cache, options.maxDuration)
    const existing = cache[key]
    if (existing) {
      return existing.result
    } else {
      const result = fn.apply(this, arguments)
      cache[key] = {
        result,
        date: Date.now()
      }
      return result
    }
  }
}

export { memoize }
