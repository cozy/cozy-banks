import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'

export const reducers = {
  alerts: alerterReducer,
  operations
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
