const querystring = (k) => {
  const search = window.location.search
  if (!search) {
    return false
  } else {
    const items = search.substr(1).split('&')
    const data = items.reduce((agg, item) => {
      const kv = item.split('=')
      if (kv.length === 2) {
        agg[kv[0]] = data[kv[1]]
      } else {
        agg[kv[0]] = true
      }
      return agg
    }, {})
    return data[k]
  }
}

export default querystring
