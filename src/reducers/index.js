import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import movements from './movements'
import categoriesMap from '../lib/categoriesMap'

export const reducers = {
  alerts: alerterReducer,
  movements
}

export const getCategoriesGroups = (movements) => {
  let creditsCategories = {}
  let totalCredits = 0
  let debitsCategories = {}
  let totalDebits = 0
  movements.forEach((movement) => {
    if (movement.amount > 0) {
      const creditCategory = categoriesMap.get(movement.operationType) ||
        categoriesMap.get('uncategorized_others')

      if (!creditsCategories.hasOwnProperty(creditCategory.name)) {
        creditsCategories[creditCategory.name] = {
          name: creditCategory.name,
          color: creditCategory.color,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1,
          subcategories: {
            [movement.operationType]: {
              name: [movement.operationType],
              amount: movement.amount,
              operationsNumber: 1,
              currency: movement.currency
            }
          }
        }
      } else {
        creditsCategories[creditCategory.name].amount += movement.amount
        creditsCategories[creditCategory.name].operationsNumber++
        // subcategories
        const subcategories =
          creditsCategories[creditCategory.name].subcategories
        if (subcategories.hasOwnProperty(movement.operationType)) {
          subcategories[movement.operationType].amount += movement.amount
          subcategories[movement.operationType].operationsNumber++
        } else {
          subcategories[movement.operationType] = {
            name: [movement.operationType],
            amount: movement.amount,
            operationsNumber: 1,
            currency: movement.currency
          }
        }
      }
      totalCredits += movement.amount
    } else {
      const debitCategory = categoriesMap.get(movement.operationType) ||
        categoriesMap.get('uncategorized_others')
      if (!debitsCategories.hasOwnProperty(debitCategory.name)) {
        debitsCategories[debitCategory.name] = {
          name: debitCategory.name,
          color: debitCategory.color,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1,
          subcategories: {
            [movement.operationType]: {
              name: [movement.operationType],
              amount: movement.amount,
              operationsNumber: 1,
              currency: movement.currency
            }
          }
        }
      } else {
        debitsCategories[debitCategory.name].amount += movement.amount
        debitsCategories[debitCategory.name].operationsNumber++
        // subcategories
        const subcategories =
          debitsCategories[debitCategory.name].subcategories
        if (subcategories.hasOwnProperty(movement.operationType)) {
          subcategories[movement.operationType].amount += movement.amount
          subcategories[movement.operationType].operationsNumber++
        } else {
          subcategories[movement.operationType] = {
            name: [movement.operationType],
            amount: movement.amount,
            operationsNumber: 1,
            currency: movement.currency
          }
        }
      }
      totalDebits += movement.amount
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
