import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'

export const reducers = {
  alerts: alerterReducer
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
