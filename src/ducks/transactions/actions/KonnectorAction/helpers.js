export function getBrandsWithoutTrigger(brands) {
  return brands.filter(brand => !brand.hasTrigger)
}
