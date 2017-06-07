const mockStatus = {}
export const fetchSharingInfo = function (doctype, id) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (mockStatus[id]) { return mockStatus[id] }
      else {
        const r = Math.random()
        if (r < 0.33) {
          resolve({}) // not shared
        } else if (r < 0.66) {
          resolve({ recipients: ['Patrick Browne', 'Catherine Hepburn'] })
        } else {
          resolve({ shared: true })
        }
      }
    }, 1000)
  })
}
