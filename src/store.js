import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import appReducers from 'reducers'

import {
  shouldEnableTracking,
  getTracker,
  createTrackerMiddleware } from 'cozy-ui/react/helpers/tracker'

const composeEnhancers = (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const loggerMiddleware = createLogger()

const middlewares = [
  thunkMiddleware,
  loggerMiddleware
]

if (shouldEnableTracking() && getTracker()) {
  middlewares.push(createTrackerMiddleware())
}

export default createStore(
  appReducers,
  composeEnhancers(applyMiddleware.apply(null, middlewares))
)
