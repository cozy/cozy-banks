import { isDeprecatedBundle } from './selectors.js'

const now = Date.now()
const threeMonthsAgo = new Date(now)
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
const fiveMonthsAgo = new Date(now)
fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5)

describe('isDeprecatedBundle', () => {
  it('should consider inactive recurrences as deprecated', () => {
    const recurrences = [
      {
        latestDate: threeMonthsAgo.toISOString()
      },
      {
        latestDate: fiveMonthsAgo.toISOString()
      }
    ]
    expect(isDeprecatedBundle(recurrences[0])).toBe(false)
    expect(isDeprecatedBundle(recurrences[1])).toBe(true)
  })
})
