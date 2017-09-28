import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import Toggle from 'cozy-ui/react/Toggle'
import { Table, TdWithIcon, TdSecondary } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'
import { SelectDates } from 'ducks/filters'
import styles from './styles'
import CategoriesChart from './CategoriesChart'
import breakpointsAware from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'

const stAmount = styles['bnk-table-amount']
const stCategory = styles['bnk-table-category-category']
const stChevron = styles['bnk-table-chevron']
const stFigure = styles['bnk-cat-figure']
const stFilter = styles['bnk-cat-filter']
const stForm = styles['bnk-cat-form']
const stPercentage = styles['bnk-table-percentage']
const stRow = styles['bnk-table-row']
const stRowSub = styles['bnk-table-row-subcategory']
const stTableCategory = styles['bnk-table-category']
const stTop = styles['bnk-cat-top']
const stTotal = styles['bnk-table-total']
const stTransaction = styles['bnk-table-transaction']
const stUncollapsed = styles['bnk-table-row--uncollapsed']

class Categories extends Component {
  toggle = categoryName => {
    const { selectedCategory, selectCategory } = this.props
    selectedCategory ? selectCategory(undefined) : selectCategory(categoryName)
  }

  render ({t, categories, selectedCategory, selectCategory, withIncome, filterWithInCome, breakpoints}) {
    if (categories === undefined) categories = []
    const selectedCat = categories.find(category => category.name === selectedCategory)
    if (selectedCategory) {
      if (selectedCat) {
        categories = [selectedCat]
      } else {
        categories = []
      }
    }
    let transactionsTotal = 0
    const globalCurrency = categories.length > 0 ? categories[0].currency : '€'

    if (categories.length !== 0) {
      // compute some global data
      const absoluteTransactionsTotal = categories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
      for (let category of categories) {
        category.percentage = Math.round(Math.abs(category.amount) / absoluteTransactionsTotal * 100)
        const absoluteSubcategoriesTotal = category.subcategories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
        for (let subcategory of category.subcategories) {
          if (absoluteSubcategoriesTotal === 0) {
            subcategory.percentage = 100
          } else {
            subcategory.percentage = Math.round(Math.abs(subcategory.amount) / absoluteSubcategoriesTotal * 100)
          }
        }
        category.subcategories = category.subcategories.sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage
          } else {
            return a.amount - b.amount
          }
        })
        transactionsTotal += category.amount
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

    let titleLabel = withIncome ? t('Categories.title.total') : t('Categories.title.debit')
    if (selectedCat) {
      const catName = t(`Data.categories.${selectedCat.name}`)
      titleLabel = `${titleLabel} (${catName})`
    }

    const isDesktop = breakpoints.desktop
    const isTablet = breakpoints.tablet

    return (
      <div>
        <SelectDates />
        <div className={stTop}>
          <div className={stForm}>
            {selectedCategory === undefined && <div className={stFilter}>
              <Toggle id='withIncome' checked={withIncome} onToggle={checked => filterWithInCome(checked)} />
              <label htmlFor='withIncome'>
                Inclure les revenus
              </label>
            </div>}
            {categories.length > 0 && <FigureBlock
              className={stFigure}
              label={titleLabel}
              total={selectedCat ? selectedCat.amount : transactionsTotal}
              currency={globalCurrency}
              coloredPositive coloredNegative signed />}
          </div>
          <CategoriesChart categories={categories} selectedCategory={selectedCategory} selectCategory={selectCategory} />
        </div>
        {categories.length === 0
          ? <p>{t('Categories.title.empty_text')}</p>
          : <Table className={stTableCategory}>
            <thead>
              <tr>
                <td className={stCategory}>{t('Categories.headers.categories')}</td>
                <td className={stPercentage}>%</td>
                {(isDesktop || isTablet) && <td className={stTransaction}>{t('Categories.headers.transactions')}</td>}
                <td className={stTotal}>{t('Categories.headers.total')}</td>
                {isDesktop && <td className={stAmount}>{t('Categories.headers.credit')}</td>}
                {isDesktop && <td className={stAmount}>{t('Categories.headers.debit')}</td>}
                {isDesktop && <td className={stChevron} />}
              </tr>
            </thead>
            {categories.map(category => this.renderCategory(category, selectedCategory))}
          </Table>
        }
      </div>
    )
  }

  renderCategory (category, selectedCategory) {
    const { t, breakpoints: { isDesktop, isTablet } } = this.props

    const isCollapsed = selectedCategory !== category.name
    if (selectedCategory !== undefined && isCollapsed) return

    const { name, subcategories, credit, debit, percentage, currency, transactionsNumber } = category
    return (
      <tbody>
        <tr className={isCollapsed ? stRow : stUncollapsed} onClick={() => this.toggle(category.name)}>
          <TdWithIcon className={classNames(stCategory, styles[`bnk-table-category--${name}`])}>
            {t(`Data.categories.${name}`)}
          </TdWithIcon>
          <TdSecondary className={stPercentage}>
            {selectedCategory ? '100 %' : `${percentage} %`}
          </TdSecondary>
          {(isDesktop || isTablet) && <TdSecondary className={stTransaction}>
            {transactionsNumber}
          </TdSecondary>}
          <TdSecondary className={stTotal}>
            <Figure total={credit + debit} currency={currency} coloredPositive signed />
          </TdSecondary>
          {isDesktop && <TdSecondary className={stAmount}>
            {credit ? <Figure total={credit} currency={currency} signed default='-' /> : '－'}
          </TdSecondary>}
          {isDesktop && <TdSecondary className={stAmount}>
            {debit ? <Figure total={debit} currency={currency} signed default='-' /> : '－'}
          </TdSecondary>}
          {isDesktop && <td className={stChevron} />}
        </tr>
        {!isCollapsed && subcategories.map(subcategory => this.renderSubcategory(category, subcategory))}
      </tbody>
    )
  }

  renderSubcategory (category, subcategory) {
    const { t, breakpoints: { isDesktop, isTablet } } = this.props
    const { name, currency, credit, debit, transactionsNumber, percentage } = subcategory
    return (
      <tr className={stRowSub} onClick={() => this.toggle(category.name)}>
        <TdWithIcon className={stCategory}>
          {t(`Data.subcategories.${name}`)}
        </TdWithIcon>
        <TdSecondary className={stPercentage}>{percentage} %</TdSecondary>
        {(isDesktop || isTablet) && <TdSecondary className={stTransaction}>{transactionsNumber}</TdSecondary>}
        <TdSecondary className={stTotal}>
          <Figure total={credit + debit} currency={currency} signed />
        </TdSecondary>
        {isDesktop && <TdSecondary className={stAmount}>
          {credit ? <Figure total={credit} currency={currency} signed /> : '－'}
        </TdSecondary>}
        {isDesktop && <TdSecondary className={stAmount}>
          {debit ? <Figure total={debit} currency={currency} signed /> : '－'}
        </TdSecondary>}
        {isDesktop && <td className={stChevron} />}
      </tr>
    )
  }
}

export default compose(
  breakpointsAware(),
  translate()
)(Categories)
