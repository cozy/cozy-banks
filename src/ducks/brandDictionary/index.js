import { some, find } from 'lodash'
import brands from './brands'

const getRegexp = brand => {
  return new RegExp(brand.regexp, 'i')
}

export const getBrands = filterFct =>
  filterFct ? brands.filter(filterFct) : brands

export const findMatchingBrand = (brands, label) => {
  return find(brands, brand => getRegexp(brand).test(label))
}

export const matchBrands = (brands, label) => {
  return some(brands, brand => getRegexp(brand).test(label))
}

export default findMatchingBrand
