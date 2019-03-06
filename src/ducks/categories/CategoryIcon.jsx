import React from 'react'
import Icon from 'cozy-ui/react/Icon'

const CategoryIcon = ({ category, className }) => {
  let icon
  try {
    if (category === undefined) category = 'uncategorized'
    icon = require(`assets/icons/categories/icon-cat-${category}.svg`)
  } catch (err) {
    icon = require(`assets/icons/categories/icon-cat-uncategorized.svg`)
  }
  if (!icon.default) {
    return null
  }
  return (
    <Icon icon={icon.default} width={32} height={32} className={className} />
  )
}
export default CategoryIcon
