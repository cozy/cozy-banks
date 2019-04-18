import { findMatchingBrand } from 'ducks/brandDictionary'
import { getBrandsWithoutTrigger } from 'ducks/transactions/actions/KonnectorAction/helpers'

const match = (transaction, { brands, urls }) => {
  const brandsWithoutTrigger = getBrandsWithoutTrigger(brands)

  if (!brandsWithoutTrigger) {
    return false
  }

  const matchingBrand = findMatchingBrand(
    brandsWithoutTrigger,
    transaction.label
  )

  return (
    matchingBrand &&
    !matchingBrand.maintenance &&
    (urls['COLLECT'] || urls['HOME'])
  )
}

export default match
