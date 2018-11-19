import { getUniqueCategories, getAlphaParameter } from './services'

describe('getUniqueCategories', () => {
  it('Should return the list of unique categories for the given transactions', () => {
    const transactions = [
      { manualCategoryId: '200100' },
      { manualCategoryId: '200100' },
      { manualCategoryId: '400100' },
      { manualCategoryId: '400400' },
      { manualCategoryId: '400400' },
      { manualCategoryId: '600170' }
    ]

    const expected = ['200100', '400100', '400400', '600170']

    expect(getUniqueCategories(transactions)).toEqual(expected)
  })
})

describe('getAlphaParemeter', () => {
  const MIN = 0.1
  const MAX = 10
  const MAX_SMOOTHING = 20

  it('Should never be lesser than the passed min parameter', () => {
    const nbUniqueCategories = 500
    const alpha = getAlphaParameter(nbUniqueCategories, MIN, MAX, MAX_SMOOTHING)

    expect(alpha).toBe(MIN)
  })

  it('Should never be higher than the passed max parameter', () => {
    const nbUniqueCategories = 1
    const alpha = getAlphaParameter(nbUniqueCategories, MIN, MAX, MAX_SMOOTHING)

    expect(alpha).toBe(MAX)
  })

  it('Should return the right value between MIN and MAX', () => {
    expect(getAlphaParameter(10, MIN, MAX, MAX_SMOOTHING)).toBe(2)
    expect(getAlphaParameter(20, MIN, MAX, MAX_SMOOTHING)).toBe(1)
    expect(getAlphaParameter(40, MIN, MAX, MAX_SMOOTHING)).toBe(0.5)
  })
})
