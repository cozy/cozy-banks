import localforage from 'localforage'
import find from 'lodash/find'
import some from 'lodash/some'
import includes from 'lodash/includes'

import { triggers as triggerModel } from 'cozy-client/dist/models/trigger'

import brands from 'ducks/brandDictionary/brands'
import { cronKonnectorTriggersConn } from 'src/doctypes'

const getRegexp = brand => {
  return new RegExp(brand.regexp, 'i')
}

export const getJSONBrands = () => {
  return brands
}

export const getBrands = async filterFct => {
  const { brands } = (await localforage.getItem('brands')) || []
  return filterFct ? brands.filter(filterFct) : brands
}

export const isMatchingBrand = (brand, label) => getRegexp(brand).test(label)

export const findMatchingBrand = (brands, label) => {
  return find(brands, brand => isMatchingBrand(brand, label))
}

export const matchBrands = (brands, label) => {
  return some(brands, brand => isMatchingBrand(brand, label))
}

export const getBrandsWithInstallationInfo = async installedSlugs => {
  const brands = await getBrands()
  const brandsWithInfo = brands.map(brand => ({
    ...brand,
    isInstalled: installedSlugs.includes(brand.konnectorSlug)
  }))

  return brandsWithInfo
}

export const getInstalledBrands = async installedSlugs => {
  const brands = await getBrandsWithInstallationInfo(installedSlugs)

  return brands.filter(brand => brand.isInstalled)
}

export const getNotInstalledBrands = async installedSlugs => {
  const brands = await getBrandsWithInstallationInfo(installedSlugs)

  return brands.filter(brand => !brand.isInstalled)
}

const makeBrand = (
  registryKonnector,
  allJSONBrands,
  installedKonnectorsSlugs
) => {
  const match = allJSONBrands.find(
    brand => brand.konnectorSlug === registryKonnector.slug
  )
  const name =
    registryKonnector.latest_version?.manifest?.name ||
    match?.name ||
    registryKonnector.slug

  const regexp =
    registryKonnector.latest_version?.manifest?.banksTransactionRegExp ||
    match?.regexp ||
    ''

  return {
    name,
    konnectorSlug: registryKonnector.slug,
    regexp,
    ...(match?.health && { health: match.health }),
    ...(match?.contact && { contact: match.contact }),
    maintenance: !!registryKonnector.maintenance_activated,
    hasTrigger: includes(installedKonnectorsSlugs, registryKonnector.slug)
  }
}

export const makeBrands = async client => {
  const allJSONBrands = getJSONBrands()
  const { data: allRegistryKonnectors } = await client.stackClient.fetchJSON(
    'GET',
    '/registry/?limit=1000&filter[type]=konnector'
  )
  const { data: triggers } = await client.query(
    cronKonnectorTriggersConn.query()
  )
  const { getKonnector, isKonnectorWorker } = triggerModel
  const installedKonnectorsSlugs = triggers
    ? triggers.filter(isKonnectorWorker).map(getKonnector).filter(Boolean)
    : []

  const allBrands = allRegistryKonnectors.reduce(
    (allBrands, data) => [
      ...allBrands,
      makeBrand(data, allJSONBrands, installedKonnectorsSlugs)
    ],
    []
  )

  localforage.setItem('brands', { brands: allBrands })
}

export default findMatchingBrand
