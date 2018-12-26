// Map instance for categories

/*
  Categories
*/

import tree from './tree'
import { getCssVariableValue } from 'cozy-ui/react/utils/color'

export const categoriesStyle = {
  kids: {
    color: getCssVariableValue('azure')
  },
  dailyLife: {
    color: getCssVariableValue('melon')
  },
  educationAndTraining: {
    color: getCssVariableValue('blazeOrange')
  },
  health: {
    color: getCssVariableValue('pomegranate')
  },
  homeAndRealEstate: {
    color: getCssVariableValue('mango')
  },
  incomeCat: {
    color: getCssVariableValue('emerald')
  },
  activities: {
    // TODO: remove value after fuchsia is not overload by cozy-authentication
    // https://github.com/cozy/cozy-ui/issues/762
    color: getCssVariableValue('fuchsia') || '#FC4C83'
  },
  excludeFromBudgetCat: {
    color: getCssVariableValue('darkPeriwinkle')
  },
  services: {
    color: getCssVariableValue('purpley')
  },
  tax: {
    color: getCssVariableValue('lightishPurple')
  },
  transportation: {
    color: getCssVariableValue('puertoRico')
  },
  goingOutAndTravel: {
    color: getCssVariableValue('weirdGreen')
  },
  uncategorized: {
    color: getCssVariableValue('coolGrey')
  }
}

export const getCategoryIdFromName = name =>
  Object.keys(tree).find(id => tree[id] === name)

for (const key in categoriesStyle) {
  categoriesStyle[key].name = key
  categoriesStyle[key].id = getCategoryIdFromName(key)
  categoriesStyle[key].children = {}
  categoriesStyle[
    key
  ].icon = require(`../../assets/icons/categories/icon-cat-${key}.svg`)
}

export const getCategories = () => {
  return categoriesStyle
}

export const getCategoryName = id => {
  const undefinedId = 0
  if (id === undefined) {
    return tree[undefinedId]
  }

  const categoryName = tree[id]
  if (categoryName === undefined) {
    return tree[undefinedId]
  }

  return categoryName
}

const getOptions = function(idStr) {
  let k = parseInt(idStr, 10)
  let m = 10
  let name = tree[k]
  while (!categoriesStyle.hasOwnProperty(name)) {
    k = k - (k % m)
    name = tree[k]
    m = 10 * m
  }
  return categoriesStyle[name]
}

export const categoryToParent = new Map(
  Object.keys(tree).map(id => {
    const options = getOptions(id)
    return [id, options]
  })
)

export const getParentCategory = catId => {
  const parent = categoryToParent.get(catId)
  return parent && parent.name ? parent.name : 'uncategorized'
}

Object.keys(tree).forEach(catId => {
  const catName = tree[catId]
  const parentName = getParentCategory(catId)

  if (categoriesStyle[parentName]) {
    categoriesStyle[parentName].children[catId] = {
      name: catName,
      color: categoriesStyle[parentName].color,
      id: catId
    }
  }
})

export default categoryToParent
