/* global cozy */

// reducers
export const getApps = state => state.apps
export const getAppUrlBySource = (state, source) => {
  const apps = getApps(state)
  for (const app of apps) {
    if (app.attributes.source.indexOf(source) !== -1) {
      return app.links.related
    }
  }
  return undefined
}

// constants
const SET_APPS = 'SET_APPS'

// actions
export const setApps = apps => ({ type: SET_APPS, apps })

// actions async
export const fetchApps = () => async dispatch => {
  return cozy.client
    .fetchJSON('GET', '/apps/')
    .then(apps => dispatch(setApps(apps)))
}

// reducers
const apps = (state = [], action) => {
  switch (action.type) {
    case SET_APPS:
      return action.apps
    default:
      return state
  }
}

export default apps
