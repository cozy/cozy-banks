import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Chart from './Chart'
import styles from './CategoriesChart.styl'
import FigureBlock from 'components/Figure/FigureBlock'
import sortBy from 'lodash/sortBy'

const hexToRGBA = (hex, a) => {
  const cutHex = hex.substring(1)
  const r = parseInt(cutHex.substring(0, 2), 16)
  const g = parseInt(cutHex.substring(2, 4), 16)
  const b = parseInt(cutHex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

class CategoriesChart extends Component {
  click = index => {
    const { selectedCategory, categories, selectCategory } = this.props
    if (!selectedCategory) {
      selectCategory(categories[index].name)
    } else {
      selectCategory(
        selectedCategory.name,
        selectedCategory.subcategories[index].name
      )
    }
  }

  getSortedCategories() {
    const sortedCategories = sortBy(this.props.categories, category =>
      Math.abs(category.amount)
    ).reverse()

    return sortedCategories
  }

  getCategoriesColors(categories) {
    const { selectedCategory } = this.props

    if (selectedCategory === undefined) {
      return categories.map(category => category.color)
    }

    const alphaDiff = 0.7 / categories.length

    return categories.map((category, index) =>
      hexToRGBA(selectedCategory.color, 1 - alphaDiff * index)
    )
  }

  render() {
    const {
      t,
      categories,
      selectedCategory,
      width,
      height,
      total,
      currency,
      label
    } = this.props
    if (categories.length === 0) return null

    const sortedCategories = this.getSortedCategories()

    const labels = sortedCategories.map(category =>
      t(
        `Data.${selectedCategory ? 'subcategories' : 'categories'}.${
          category.name
        }`
      )
    )
    const data = sortedCategories.map(category =>
      Math.abs(category.amount).toFixed(2)
    )
    const colors = this.getCategoriesColors(sortedCategories)

    return (
      <div className={styles.CategoriesChart}>
        <div className={styles.CategoriesChart__FigureBlockContainer}>
          <FigureBlock
            label={label}
            total={total}
            currency={currency}
            signed
            className={styles.CategoriesChart__FigureBlock}
            figureClassName={styles.CategoriesChart__Figure}
            withCurrencySpacing={false}
          />
        </div>
        <Chart
          onClick={this.click}
          labels={labels}
          data={data}
          colors={colors}
          width={width}
          height={height}
        />
      </div>
    )
  }
}

export default translate()(CategoriesChart)
