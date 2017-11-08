import React from 'react'
import { Icon } from 'cozy-ui/react'

const CategoryIcon = ({category}) => {
  let icon
  try {
    if (category === undefined) category = 'uncategorized'
    icon = require(`assets/icons/categories/icon-cat-${category}.svg`)
  } catch (err) {
    icon = require(`assets/icons/categories/icon-cat-uncategorized.svg`)
  }
  return <Icon icon={icon.default} width='2em' height='2em' />
}

export default CategoryIcon
