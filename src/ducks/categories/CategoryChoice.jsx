import React, { Component } from 'react'
import { translate } from 'cozy-ui/react'
import PopupSelect from 'components/PopupSelect'
import { getCategories, CategoryIcon, getParentCategory } from 'ducks/categories'

class CategoryChoice extends Component {
  constructor (props) {
    super(props)

    this.options = {
      children: this.getOptions(getCategories()),
      title: props.t('Categories.choice.title')
    }
  }

  getOptions = (categories, subcategory = false) => {
    return Object.keys(categories).map(catName => {
      const option = categories[catName]

      const translateKey = subcategory ? 'subcategories' : 'categories'
      option.title = this.props.t(`Data.${translateKey}.${option.name}`)

      const iconCategory = subcategory ? getParentCategory(option.id) : option.name
      option.icon = <CategoryIcon category={iconCategory} />

      if (!subcategory) {
        option.children = this.getOptions(option.children, true)
      }

      return option
    })
  }

  isSelected = category => {
    const { categoryId } = this.props
    const parentName = getParentCategory(categoryId)
    return parentName === category.name || categoryId === category.id
  }

  render () {
    const { t, onCancel, onSelect } = this.props

    return (
      <PopupSelect
        title={t('Categories.choice.title')}
        options={this.options}
        isSelected={this.isSelected}
        onSelect={subcategory => onSelect(subcategory)}
        onCancel={onCancel}
      />
    )
  }
}

export default translate()(CategoryChoice)
