// Map instance for categories

/*
  Categories
*/

import tree from './tree'

const parentCategories = {
  kids: {
    name: 'kids',
    color: '#1FA8F1'
  },

  expenseTheme: {
    name: 'dailyLife',
    color: '#FD7461'
  },

  educationAndTraining: {
    name: 'educationAndTraining',
    color: '#FC6D00'
  },

  health: {
    name: 'health',
    color: '#F62C2C'
  },

  homeAndRealEstate: {
    name: 'housing',
    color: '#FF962F'
  },

  incomeTheme: {
    name: 'income',
    color: '#35CE68'
  },

  activities: {
    name: 'activities',
    color: '#FC4C83'
  },

  excludeFromBudgetCat: {
    name: 'excludeFromBudgetCat',
    color: '#FF0D3D'
  },

  services: {
    name: 'services',
    color: '#7F6BEE'
  },

  tax: {
    name: 'tax',
    color: '#B449E7'
  },

  transportation: {
    name: 'transportation',
    color: '#4DCEC5'
  },

  goingOutAndTravel: {
    name: 'goingOutAndTravel',
    color: '#40DE8E'
  },

  uncategorized: {
    name: 'uncategorized',
    color: '#95999D'
  }
}

const getOptions = function (idStr) {
  let k = parseInt(idStr, 10)
  let m = 10
  let name = tree[k]
  while (!parentCategories.hasOwnProperty(name)) {
    k = k - (k % m)
    name = tree[k]
    m = 10 * m
  }
  return parentCategories[name]
}

const categoryToParent = new Map(
  Object.keys(tree)
    .map(id => {
      const options = getOptions(id)
      return [id, options]
    })
)

export default categoryToParent
