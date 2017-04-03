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

const categoriesColorsMap = new Map([
  ['bills', '#7F6BEE'],
  ['daily-life', '#FD7461'],
  ['transportation', '#4DCEC5'],
  ['hobbies', '#FC4C83'],
  ['health', '#F62C2C'],
  ['house', '#FF962F'],
  ['travel', '#40DE8E'],
  ['transfer', '#35CE68'],
  ['toBeDefined', '#95999D']
])

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
          color: categoriesColorsMap.get(creditCategoryName),
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
          color: categoriesColorsMap.get(debitCategoryName),
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
