import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import operations from './operations'
import categoriesMap from '../lib/categoriesMap'

export const reducers = {
  alerts: alerterReducer,
  operations
}

export const getCategoriesGroups = (operations) => {
  let creditsCategories = {}
  let totalCredits = 0
  let debitsCategories = {}
  let totalDebits = 0
  operations.forEach((operation) => {
    if (operation.amount > 0) {
      const creditCategory = categoriesMap.get(operation.operationType) ||
        categoriesMap.get('uncategorized_others')

      if (!creditsCategories.hasOwnProperty(creditCategory.name)) {
        creditsCategories[creditCategory.name] = {
          name: creditCategory.name,
          color: creditCategory.color,
          amount: operation.amount,
          currency: operation.currency,
          operationsNumber: 1,
          subcategories: {
            [operation.operationType]: {
              name: [operation.operationType],
              amount: operation.amount,
              operationsNumber: 1,
              currency: operation.currency
            }
          }
        }
      } else {
        creditsCategories[creditCategory.name].amount += operation.amount
        creditsCategories[creditCategory.name].operationsNumber++
        // subcategories
        const subcategories =
          creditsCategories[creditCategory.name].subcategories
        if (subcategories.hasOwnProperty(operation.operationType)) {
          subcategories[operation.operationType].amount += operation.amount
          subcategories[operation.operationType].operationsNumber++
        } else {
          subcategories[operation.operationType] = {
            name: [operation.operationType],
            amount: operation.amount,
            operationsNumber: 1,
            currency: operation.currency
          }
        }
      }
      totalCredits += operation.amount
    } else {
      const debitCategory = categoriesMap.get(operation.operationType) ||
        categoriesMap.get('uncategorized_others')
      if (!debitsCategories.hasOwnProperty(debitCategory.name)) {
        debitsCategories[debitCategory.name] = {
          name: debitCategory.name,
          color: debitCategory.color,
          amount: operation.amount,
          currency: operation.currency,
          operationsNumber: 1,
          subcategories: {
            [operation.operationType]: {
              name: [operation.operationType],
              amount: operation.amount,
              operationsNumber: 1,
              currency: operation.currency
            }
          }
        }
      } else {
        debitsCategories[debitCategory.name].amount += operation.amount
        debitsCategories[debitCategory.name].operationsNumber++
        // subcategories
        const subcategories =
          debitsCategories[debitCategory.name].subcategories
        if (subcategories.hasOwnProperty(operation.operationType)) {
          subcategories[operation.operationType].amount += operation.amount
          subcategories[operation.operationType].operationsNumber++
        } else {
          subcategories[operation.operationType] = {
            name: [operation.operationType],
            amount: operation.amount,
            operationsNumber: 1,
            currency: operation.currency
          }
        }
      }
      totalDebits += operation.amount
    }
  })

  // sorting categories
  const credits = Object.values(creditsCategories).sort((a, b) => {
    return b.amount - a.amount
  })

  const debits = Object.values(debitsCategories).sort((a, b) => {
    return a.amount - b.amount
  })

  debits.forEach((debit) => {
    // category percentage
    debit.percentage = Math.round(debit.amount / totalDebits * 100)
    // subcategories sorting
    debit.subcategories = Object.values(debit.subcategories).sort((a, b) => {
      return a.amount - b.amount
    })
    // subcategories percentage
    debit.subcategories.forEach((subcategory) => {
      subcategory.percentage =
        Math.round(subcategory.amount / totalDebits * 100)
    })
  })
  credits.forEach((credit) => {
    // category percentage
    credit.percentage = Math.round(credit.amount / totalCredits * 100)
    // subcategories sorting
    credit.subcategories = Object.values(credit.subcategories).sort((a, b) => {
      return b.amount - a.amount
    })
    // subcategories percentage
    credit.subcategories.forEach((subcategory) => {
      subcategory.percentage =
        Math.round(subcategory.amount / totalCredits * 100)
    })
  })

  return {
    credits,
    debits,
    totalDebits,
    totalCredits,
    currency: '€'
  }
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
