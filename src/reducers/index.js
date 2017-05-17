import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import { accounts, selectedAccounts, groups } from './accounts'

export const reducers = {
  alerts: alerterReducer,
  operations,
  accounts,
  groups,
  selectedAccounts
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
