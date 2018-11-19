import { getUniqueCategories } from './services'

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
