import includes from 'lodash/includes'

import { Registry } from 'cozy-client'

import { buildTriggerWithoutCurrentStateQuery } from 'src/doctypes'
import brands from 'ducks/brandDictionary/brands'

const FETCH_BRANDS = 'FETCH_BRANDS'

const makeBrand = (
  registryKonnector,
  allJSONBrands,
  configuredKonnectorsSlugs
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
    hasTrigger: includes(configuredKonnectorsSlugs, registryKonnector.slug)
  }
}
// !TODO remove when CozyClient getKonnector returns also worker === konnector & worker=== client
export const getKonnectorSlug = trigger => {
  if (trigger.message && trigger.message.konnector) {
    return trigger.message.konnector
  }
  return false
}

export const makeBrands = async (client, dispatch, inService) => {
  const registry = new Registry({ client })
  const allRegistryKonnectors = await registry.fetchApps({
    limit: 1000,
    channel: 'stable',
    type: 'konnector'
  })

  const triggerWithoutCurrentStateQuery = buildTriggerWithoutCurrentStateQuery()
  const triggers = await client.queryAll(
    triggerWithoutCurrentStateQuery.definition,
    triggerWithoutCurrentStateQuery.options
  )

  const configuredKonnectorsSlugs = triggers
    ? triggers.map(getKonnectorSlug).filter(Boolean)
    : []

  const allBrands = allRegistryKonnectors.reduce(
    (allBrands, data) => [
      ...allBrands,
      makeBrand(data, brands, configuredKonnectorsSlugs)
    ],
    []
  )

  if (inService) {
    return allBrands
  }
  return dispatch({ type: FETCH_BRANDS, brands: allBrands })
}

const brandsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return action.brands
    default:
      return state
  }
}

export default brandsReducer
