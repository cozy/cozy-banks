import { getBrands, matchBrands, findMatchingBrand } from '.'
import brands from './brands'

const getFilteredBrands = () => getBrands(brand => brand.name === 'Filtered')

describe('brandDictionary', () => {
  describe('getBrands', () => {
    it('Should return brands', () => {
      expect(getBrands()).toBe(brands)
    })
    it('Should return brands filtered', () => {
      expect(getFilteredBrands()).toEqual([])
    })
  })

  describe('matchBrands', () => {
    it('Should return true if label match with regex', () => {
      expect(matchBrands(getBrands(), 'Cpam Des Yvelines')).toBeTruthy()
      expect(matchBrands(getBrands(), 'C.P.A.M Des Yvelines')).toBeTruthy()
      expect(matchBrands(getBrands(), 'C.P.AaM Des Yvelines')).toBeFalsy()
      expect(
        matchBrands(getBrands(), 'caisse primaire Des Yvelines')
      ).toBeTruthy()
      expect(matchBrands(getBrands(), 'Gandi Paris')).toBeFalsy()
    })

    it('Should return false if brand is filtered', () => {
      expect(matchBrands(getFilteredBrands(), 'Cpam Des Yvelines')).toBeFalsy()
    })
  })

  describe('findMatchingBrand', () => {
    it('Should return brand information if label match with regex', () => {
      expect(findMatchingBrand(getBrands(), 'Gandi Paris')).toBeFalsy()
      expect(
        findMatchingBrand(getBrands(), 'Cpam Des Yvelines').konnectorSlug
      ).toBe('ameli')
      expect(findMatchingBrand(getBrands(), 'Free Telecom').konnectorSlug).toBe(
        'free'
      )
      expect(
        findMatchingBrand(getBrands(), 'Free HautDebit').konnectorSlug
      ).toBe('free')
      expect(findMatchingBrand(getBrands(), 'Free Mobile').konnectorSlug).toBe(
        'freemobile'
      )
    })
  })
})
