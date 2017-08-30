/* global __DEVELOPMENT__ */
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { shouldEnableTracking, getTracker, createTrackerMiddleware } from 'cozy-ui/react/helpers/tracker'

import appReducers from 'reducers'
import { cozyMiddleware, CozyClient } from 'redux-cozy-client'

const getCozyClient = function () {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  return new CozyClient({
    cozyURL: `//${data.cozyDomain}`,
    token: data.cozyToken
  })
}

const configureStore = persistedState => {
  // Enable Redux dev tools
  const composeEnhancers = (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  // reducers
  const reducers = [appReducers, persistedState]

  // middlewares
  const middlewares = [
    cozyMiddleware(getCozyClient()),
    thunkMiddleware
  ]
  if (shouldEnableTracking() && getTracker()) {
    middlewares.push(createTrackerMiddleware())
  }
  if (__DEVELOPMENT__) {
    // must be the last middleware in chain https://git.io/vHQpt
    const loggerMiddleware = createLogger()
    middlewares.push(loggerMiddleware)
  }

  const store = createStore(
    ...reducers,
    composeEnhancers(applyMiddleware.apply(null, middlewares))
  )

  return store
}

export default configureStore
