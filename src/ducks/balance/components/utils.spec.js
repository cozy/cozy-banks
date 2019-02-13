const { memoize } = require('./utils')

describe('memoize', () => {
  let now
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => now)
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should remember results ', () => {
    now = 0
    let c = 0
    const counter = () => c++
    const mcounter = memoize(counter, { key: () => 'A', maxDuration: 5 })
    expect(mcounter()).toBe(0)
    expect(mcounter()).toBe(0)
    now = 6
    expect(mcounter()).toBe(1)
    expect(mcounter()).toBe(1)
  })
})
