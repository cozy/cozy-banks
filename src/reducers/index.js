import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import movements from './movements'
import categoriesMap from '../lib/categoriesMap'

export const reducers = {
  alerts: alerterReducer,
  movements
}

export const getCategoriesGroupBy = (movements) => {
  let creditsCategories = {}
  let totalCredits = 0
  let debitsCategories = {}
  let totalDebits = 0
  movements.forEach((movement) => {
    if (movement.amount > 0) {
      const creditCategory = categoriesMap.get(movement.type) ||
        categoriesMap.get('uncategorized_others')

      if (!creditsCategories.hasOwnProperty(creditCategory.name)) {
        creditsCategories[creditCategory.name] = {
          name: creditCategory.name,
          color: creditCategory.color,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1
        }
      } else {
        creditsCategories[creditCategory.name].amount += movement.amount
        creditsCategories[creditCategory.name].operationsNumber++
      }
      totalCredits += movement.amount
    } else {
      const debitCategory = categoriesMap.get(movement.type) ||
        categoriesMap.get('uncategorized_others')
      if (!debitsCategories.hasOwnProperty(debitCategory.name)) {
        debitsCategories[debitCategory.name] = {
          name: debitCategory.name,
          color: debitCategory.color,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1
        }
      } else {
        debitsCategories[debitCategory.name].amount += movement.amount
        debitsCategories[debitCategory.name].operationsNumber++
      }
      totalDebits += movement.amount
    }
  })
  const credits = Object.values(creditsCategories).sort((a, b) => {
    return a.amount - b.amount
  })

  const debits = Object.values(debitsCategories).sort((a, b) => {
    return a.amount - b.amount
  })

  // percentages
  debits.forEach((debit) => {
    debit.percentage = Math.round(debit.amount / totalDebits * 100)
  })
  credits.forEach((credit) => {
    credit.percentage = Math.round(credit.amount / totalCredits * 100)
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
