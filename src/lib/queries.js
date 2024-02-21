import CozyClient, { Q } from 'cozy-client'

const FIVE_MINUTES = 5 * 60 * 1000
const defaultFetchPolicy = CozyClient.fetchPolicies.olderThan(FIVE_MINUTES)

export const buildTriggersQueryByKonnectorSlug = (slug, enabled) => ({
  definition: () =>
    Q('io.cozy.triggers')
      .where({
        'message.konnector': slug
      })
      .indexFields(['message.konnector']),
  options: {
    as: `io.cozy.triggers/slug/${slug}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})


export const buildKonnectorBySlug = (slug, enabled = Boolean(slug)) => ({
  definition: () => Q('io.cozy.konnectors').getById(`io.cozy.konnectors/${slug}`),
  options: {
    as: 'konnector',
    singleDocData: true,
    enabled
  }
})
