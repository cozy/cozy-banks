import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import movements from './movements'

export const reducers = {
  alerts: alerterReducer,
  movements
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
