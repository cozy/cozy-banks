import React from 'react'
import Icon from 'cozy-ui/react/Icon'
import categoryIcons from 'ducks/categories/icons'
import {
  getParentCategory,
  getCategoryName
} from 'ducks/categories/categoriesMap'

const getCategoryIcon = categoryId => {
  let categoryName = getCategoryName(categoryId)
  const catIcon = categoryIcons[categoryName]
  if (catIcon) {
    return catIcon
  } else {
    const parentCategoryName = getParentCategory(categoryId)
    const pIcon = categoryIcons[parentCategoryName]
    if (pIcon) {
      return pIcon
    }
  }
  return categoryIcons.uncategorized
}

const CategoryIcon = ({ categoryId, className }) => {
  const icon = getCategoryIcon(categoryId)
  if (!icon) {
    return null
  }
  return <Icon icon={icon} width={32} height={32} className={className} />
}
export default CategoryIcon
