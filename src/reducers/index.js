import { combineReducers } from 'redux'

import alerterReducer from 'cozy-ui/react/Alerter'
import movements from './movements'

export const reducers = {
  alerts: alerterReducer,
  movements
}

const debitsGroupByIndex = {
  bills: 'bills',
  cart: 'daily-life',
  car: 'transportation',
  entertainment: 'hobbies',
  fastfood: 'daily-life',
  health: 'health',
  house: 'house',
  phone: 'bills',
  restaurant: 'hobbies',
  shopping: 'hobbies',
  travel: 'travel',
  transfer: 'transfer'
}

const creditsGroupByIndex = {
  transfer: 'transfer'
}

export const getCategoriesGroupBy = (movements) => {
  let creditsCategories = {}
  let totalCredits = 0
  let debitsCategories = {}
  let totalDebits = 0
  movements.forEach((movement) => {
    if (movement.amount > 0) {
      const creditCategoryName = creditsGroupByIndex[movement.type] || 'toBeDefined'
      if (!creditsCategories.hasOwnProperty(creditCategoryName)) {
        creditsCategories[creditCategoryName] = {
          name: creditCategoryName,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1
        }
      } else {
        creditsCategories[creditCategoryName].amount += movement.amount
        creditsCategories[creditCategoryName].operationsNumber++
      }
      totalCredits += movement.amount
    } else {
      const debitCategoryName = debitsGroupByIndex[movement.type] || 'toBeDefined'
      if (!debitsCategories.hasOwnProperty(debitCategoryName)) {
        debitsCategories[debitCategoryName] = {
          name: debitCategoryName,
          amount: movement.amount,
          currency: movement.currency,
          operationsNumber: 1
        }
      } else {
        debitsCategories[debitCategoryName].amount += movement.amount
        debitsCategories[debitCategoryName].operationsNumber++
      }
      totalDebits += movement.amount
    }
  })
  return {
    credits: Object.values(creditsCategories),
    debits: Object.values(debitsCategories),
    totalDebits,
    totalCredits,
    currency: '€'
  }
}

const combinedReducers = combineReducers(reducers)

export default combinedReducers
