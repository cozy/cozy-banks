import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Toggle from 'cozy-ui/react/Toggle'
import { Table, TdWithIcon } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'
import { SelectDates } from 'ducks/filters'
import styles from './styles'
import CategoriesChart from './CategoriesChart'

class Categories extends Component {
  toggle = categoryName => {
    const { selectedCategory, selectCategory } = this.props
    if (selectedCategory) {
      selectCategory()
    } else {
      selectCategory(categoryName)
    }
  }

  render ({t, categories, selectedCategory, selectCategory, withIncome, filterWithInCome}) {
    if (categories === undefined) categories = []
    let operationsTotal = 0
    const globalCurrency = categories.length > 0 ? categories[0].currency : '€'

    if (categories.length !== 0) {
      // compute some global data
      const absoluteOperationsTotal = categories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
      for (let category of categories) {
        category.percentage = Math.round(Math.abs(category.amount) / absoluteOperationsTotal * 100)
        const absoluteSubcategoriesTotal = category.subcategories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
        for (let subcategory of category.subcategories) {
          subcategory.percentage = Math.round(Math.abs(subcategory.amount) / absoluteSubcategoriesTotal * 100)
        }
        category.subcategories = category.subcategories.sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage
          } else {
            return a.amount - b.amount
          }
        })
        operationsTotal += category.amount
      }
    }

     // sort the categories for display
    categories = categories.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage
      } else {
        return a.amount - b.amount
      }
    })

    const selectedCat = categories.find(category => category.name === selectedCategory)

    return (
      <div>
        <div className={styles['bnk-cat-top']}>
          <div className={styles['bnk-cat-form']}>
            <SelectDates />
            {selectedCategory === undefined && <div className={styles['bnk-cat-filter']}>
              <Toggle id='withIncome' checked={withIncome} onToggle={checked => filterWithInCome(checked)} />
              <label htmlFor='withIncome'>
                Inclure les revenus
              </label>
            </div>}
            {categories.length > 0 && <FigureBlock
              className={styles['bnk-cat-figure']}
              label={withIncome ? t('Categories.title.total') : t('Categories.title.debit')}
              total={selectedCat ? selectedCat.amount : operationsTotal}
              currency={globalCurrency}
              coloredPositive coloredNegative signed />}
          </div>
          <CategoriesChart categories={categories} selectedCategory={selectedCategory} />
        </div>
        {categories.length > 0
          ? <Table className={styles['bnk-table-category']}>
            <thead>
              <tr>
                <td className={styles['bnk-table-category-category']}>{t('Categories.headers.categories')}</td>
                <td className={styles['bnk-table-percentage']}>%</td>
                <td className={styles['bnk-table-operation']}>{t('Categories.headers.operations')}</td>
                <td className={styles['bnk-table-total']}>{t('Categories.headers.total')}</td>
                <td className={styles['bnk-table-amount']}>{t('Categories.headers.credit')}</td>
                <td className={styles['bnk-table-amount']}>{t('Categories.headers.debit')}</td>
                <td className={styles['bnk-table-chevron']} />
              </tr>
            </thead>
            {categories.map(category => {
              const isCollapsed = selectedCategory !== category.name
              if (selectedCategory !== undefined && isCollapsed) return
              return (
                <tbody>
                  <tr className={isCollapsed ? styles['bnk-table-row'] : styles['bnk-table-row--uncollapsed']} onClick={() => this.toggle(category.name)}>
                    <TdWithIcon className={classNames(styles['bnk-table-category-category'], styles[`bnk-table-category--${category.name}`])}>
                      {t(`Data.categories.${category.name}`)}
                    </TdWithIcon>
                    <td className={styles['bnk-table-percentage']}>
                      {selectedCategory ? '100 %' : `${category.percentage} %`}
                    </td>
                    <td className={styles['bnk-table-operation']}>{category.operationsNumber}</td>
                    <td className={styles['bnk-table-total']}>
                      <Figure total={category.credit + category.debit} currency={category.currency} coloredPositive signed />
                    </td>
                    <td className={styles['bnk-table-amount']}>
                      {category.credit ? <Figure total={category.credit} currency={category.currency} signed /> : '－'}
                    </td>
                    <td className={styles['bnk-table-amount']}>
                      {category.debit ? <Figure total={category.debit} currency={category.currency} signed /> : '－'}
                    </td>
                    <td className={styles['bnk-table-chevron']} />
                  </tr>
                  {!isCollapsed && category.subcategories.map(subcategory => (
                    <tr className={styles['bnk-table-row-subcategory']} onClick={() => this.toggle(category.name)}>
                      <td className={styles['bnk-table-category-category']}>
                        {t(`Data.subcategories.${subcategory.name}`)}
                      </td>
                      <td className={styles['bnk-table-percentage']}>{`${subcategory.percentage} %`}</td>
                      <td className={styles['bnk-table-operation']}>{subcategory.operationsNumber}</td>
                      <td className={styles['bnk-table-total']}>
                        <Figure total={subcategory.credit + subcategory.debit} currency={subcategory.currency} signed />
                      </td>
                      <td className={styles['bnk-table-amount']}>
                        {subcategory.credit ? <Figure total={subcategory.credit} currency={subcategory.currency} signed /> : '－'}
                      </td>
                      <td className={styles['bnk-table-amount']}>
                        {subcategory.debit ? <Figure total={subcategory.debit} currency={subcategory.currency} signed /> : '－'}
                      </td>
                      <td className={styles['bnk-table-chevron']} />
                    </tr>
                  ))}
                </tbody>
              )
            })}
          </Table>
          : <p>{t('Categories.title.empty_text')}</p>
        }
      </div>
    )
  }
}

export default translate()(Categories)
