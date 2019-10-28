import keyBy from 'lodash/keyBy'
import { createSelector } from 'reselect'
import { queryDataSelector } from 'selectors'

export const getApps = queryDataSelector('apps')

export const getAppsById = createSelector(
  [getApps],
  apps => keyBy(apps, app => app._id)
)

export const getAppURLById = id =>
  createSelector(
    [getAppsById],
    apps => {
      const app = apps[id]
      if (!app) {
        return null
      } else {
        return app.links.related
      }
    }
  )

export const getHomeURL = getAppURLById('io.cozy.apps/home')
