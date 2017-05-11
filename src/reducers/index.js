import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import categoriesMap from '../lib/categoriesMap'

export const reducers = {
  alerts: alerterReducer,
  operations
}

export const groupOperationsByCategory = (operations) => {
  let categories = {}

  operations.forEach(operation => {
    let category = categoriesMap.get(operation.operationType) || categoriesMap.get('uncategorized_others')

    //create a new parent category if necessary
    if (!categories.hasOwnProperty(category.name)) {
      categories[category.name] = {
        name: category.name,
        color: category.color,
        operations: [],
        subcategories: {}
      }
    }

    //create the subcategory if necessary
    if (!categories[category.name].subcategories.hasOwnProperty(operation.operationType)){
      categories[category.name].subcategories[operation.operationType] = {
        name: operation.operationType,
        operations: []
      }
    }

    categories[category.name].operations.push(operation)
    categories[category.name].subcategories[operation.operationType].operations.push(operation);
  })

  return Object.values(categories);
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
