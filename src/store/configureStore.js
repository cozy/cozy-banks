/* global PouchDB, pouchdbFind */
/* global __DEVELOPMENT__ __TARGET__ */
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { shouldEnableTracking, getTracker, createTrackerMiddleware } from 'cozy-ui/react/helpers/tracker'

import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE } from 'doctypes'
import appReducers from 'reducers'
import { cozyMiddleware, CozyClient } from 'redux-cozy-client'

const getCozyClient = function () {
  // Bind `PouchDB` to window for `cozy-client-js` to find it
  // PouchDB is provided here by `webpack` through `ProvidedPlugin`
  window.PouchDB = PouchDB
  window.pouchdbFind = pouchdbFind

  const cozyOptions = {
    offline: { doctypes: [ACCOUNT_DOCTYPE, GROUP_DOCTYPE, TRANSACTION_DOCTYPE] }
  }

  if (__TARGET__ === 'browser') {
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    cozyOptions.cozyURL = `${window.location.protocol}//${data.cozyDomain}`
    cozyOptions.token = data.cozyToken
  } else {
    cozyOptions.cozyURL = persistedUrl
  }

  return new CozyClient(cozyOptions)
}

const configureStore = persistedState => {
  // Enable Redux dev tools
  const composeEnhancers = (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  // reducers
  const reducers = [appReducers, persistedState]

  // middlewares
  const middlewares = [
    thunkMiddleware,
    cozyMiddleware(getCozyClient(persistedState && persistedState.mobile.url ? persistedState.mobile.url : null))
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
