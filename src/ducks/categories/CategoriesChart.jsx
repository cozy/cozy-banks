import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Chart from './Chart'
import styles from './styles'
import FigureBlock from 'components/Figure/FigureBlock'

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
      const category = categories.find(cat => cat.name === selectedCategory)
      selectCategory(category.name, category.subcategories[index].name)
    }
  }

  render({
    t,
    categories,
    selectedCategory,
    width,
    height,
    total,
    currency,
    label
  }) {
    if (categories.length === 0) return

    const labels = []
    const data = []
    const colors = []

    if (selectedCategory === undefined) {
      for (const category of categories) {
        labels.push(t(`Data.categories.${category.name}`))
        data.push(Math.abs(category.amount).toFixed(2)) // use positive values
        colors.push(category.color)
      }
    } else {
      const category = categories.find(
        category => category.name === selectedCategory
      )
      let alpha = 1
      const alphaDiff = 0.7 / category.subcategories.length
      for (const subcategory of category.subcategories) {
        labels.push(t(`Data.subcategories.${subcategory.name}`))
        data.push(Math.abs(subcategory.amount).toFixed(2)) // use positive values
        colors.push(hexToRGBA(category.color, alpha))
        alpha -= alphaDiff
      }
    }

    return (
      <div className={styles['bnk-cat-chart']}>
        <div className={styles.CategoriesChart__FigureBlockContainer}>
          <FigureBlock
            label={label}
            total={total}
            currency={currency}
            signed
            className={styles.CategoriesChart__FigureBlock}
            figureClassName={styles.CategoriesChart__Figure}
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
