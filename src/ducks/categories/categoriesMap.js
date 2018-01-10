// Map instance for categories

/*
  Categories
*/

import tree from './tree'

export const categoriesStyle = {
  kids: {
    color: '#1FA8F1'
  },
  dailyLife: {
    color: '#FD7461'
  },
  educationAndTraining: {
    color: '#FC6D00'
  },
  health: {
    color: '#F62C2C'
  },
  homeAndRealEstate: {
    color: '#FF962F'
  },
  incomeCat: {
    color: '#35CE68'
  },
  activities: {
    color: '#FC4C83'
  },
  excludeFromBudgetCat: {
    color: '#FF0D3D'
  },
  services: {
    color: '#7F6BEE'
  },
  tax: {
    color: '#B449E7'
  },
  transportation: {
    color: '#4DCEC5'
  },
  goingOutAndTravel: {
    color: '#40DE8E'
  },
  uncategorized: {
    color: '#95999D'
  }
}

export const getCategoryIdFromName = name =>
  Object.keys(tree).find(id => tree[id] === name)

for (const key in categoriesStyle) {
  categoriesStyle[key].name = key
  categoriesStyle[key].id = getCategoryIdFromName(key)
  categoriesStyle[key].children = {}
  categoriesStyle[key].icon =
    require(`../../assets/icons/categories/icon-cat-${key}.svg`)
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

const getOptions = function (idStr) {
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
  Object.keys(tree)
    .map(id => {
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
  if (catName !== parentName && categoriesStyle[parentName]) {
    categoriesStyle[parentName].children[catId] = {
      name: catName,
      color: categoriesStyle[parentName].color,
      id: catId
    }
  }
})

export default categoryToParent
