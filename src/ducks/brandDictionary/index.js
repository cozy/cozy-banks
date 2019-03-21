import { some, find } from 'lodash'
import brands from './brands'

const getRegexp = brand => {
  return new RegExp(brand.regexp, 'i')
}

export const getBrands = filterFct =>
  filterFct ? brands.filter(filterFct) : brands

export const isMatchingBrand = (brand, label) => getRegexp(brand).test(label)

export const findMatchingBrand = (brands, label) => {
  return find(brands, brand => isMatchingBrand(brand, label))
}

export const matchBrands = (brands, label) => {
  return some(brands, brand => isMatchingBrand(brand, label))
}

export default findMatchingBrand
