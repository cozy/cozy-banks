import React, { Component } from 'react'
import { translate } from 'cozy-ui/react'
import PopupSelect from 'components/PopupSelect'
import { getCategories, CategoryIcon, getParentCategory } from 'ducks/categories'

const getChildList = (props, category) => {
  const { t, categoryId } = props

  return Object.keys(category.child).map(catId => {
    const subcategory = category.child[catId]

    return {
      text: t(`Data.subcategories.${subcategory.name}`),
      icon: <CategoryIcon category={category.name} />,
      name: subcategory.name,
      selected: categoryId === catId,
      id: catId
    }
  })
}

const getList = props => {
  const { t, categoryId } = props
  const categories = getCategories()
  const parentName = getParentCategory(categoryId)

  return Object.keys(categories).map(catName => {
    const category = categories[catName]
    return {
      id: category.id,
      name: category.name,
      text: t(`Data.categories.${category.name}`),
      icon: <CategoryIcon category={category.name} />,
      selected: parentName === catName,
      child: getChildList(props, category)
    }
  })
}

class CategoryChoice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      list: getList(props)
    }
  }

  selectCategory = category => {
    if (category.name === 'uncategorized') {
      this.props.onSelect(category)
      return
    }
    this.setState({category})
  }

  selectSubcategory = subcategory => {
    this.props.onSelect(subcategory)
  }

  render () {
    const { t, onCancel } = this.props
    const { list, category } = this.state

    return (
      <PopupSelect
        title={category ? category.text : t('Categories.choice.title')}
        list={category ? category.child : list}
        onSelect={category ? this.selectSubcategory : this.selectCategory}
        onCancel={onCancel}
      />
    )
  }
}

export default translate()(CategoryChoice)
