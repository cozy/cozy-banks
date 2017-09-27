import categoriesMap from './categoriesMap'

describe('categories map', function () {
  it('should map ids to categories', function () {
    expect(categoriesMap.get('400700').name).toBe('activities')
  })
  it('should map ids to categories 2', function () {
    expect(categoriesMap.get('400750').name).toBe('activities')
  })
  it('should map ids to categories 2', function () {
    expect(Object.keys(categoriesMap.get('400750'))).toEqual(['color', 'name', 'icon'])
  })
})
