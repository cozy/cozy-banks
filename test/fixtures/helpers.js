const categoryNameToId = inverseObject(require('./linxo-categories'))

module.exports = {
  helpers: {
    categoryId: function(catName) {
      return categoryNameToId[catName]
    }
  }
}

function inverseObject(obj) {
  const out = {}
  Object.keys(obj).forEach(function(k) {
    out[obj[k]] = k
  })
  return out
}
