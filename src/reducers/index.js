import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import { accounts, groups, accountFilters } from './accounts'

export const reducers = {
  alerts: alerterReducer,
  operations,
  accounts,
  groups,
  accountFilters
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
