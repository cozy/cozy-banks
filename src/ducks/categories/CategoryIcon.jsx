import React from 'react'
import { Icon } from 'cozy-ui/react'
import { getParentCategory } from './categoriesMap'

const CategoryIcon = ({transaction}) => {
  let catName = getParentCategory(transaction.categoryId)
  let icon
  try {
    if (catName === undefined) catName = 'uncategorized'
    icon = require(`../../assets/icons/categories/icon-cat-${catName}.svg`)
  } catch (err) {
    icon = require(`../../assets/icons/categories/icon-cat-uncategorized.svg`)
  }
  return <Icon icon={icon.default} width='2em' height='2em' />
}

export default CategoryIcon
