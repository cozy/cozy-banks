import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import Toggle from 'cozy-ui/react/Toggle'
import { Table } from 'components/Table'
import { FigureBlock } from 'components/Figure'
import Loading from 'components/Loading'
import PieChart from 'components/PieChart'
import { Topbar } from 'ducks/commons'
import { SelectDates, getFilteredOperations } from 'ducks/filters'
import { fetchOperations, indexOperationsByDate } from 'actions'
import { operationsByCategory, computeCategorieData } from './helpers'
import styles from './Categories.styl'
import Category from './Category'

class Categories extends Component {
  state = {
    isFetching: true,
    withIncome: true,
    selectedCategory: undefined
  }

  selectCategory = category => {
    this.setState({selectedCategory: category})
  }

  applyFilter = e => {
    this.setState({withIncome: e.target.checked})
  }

  async componentDidMount () {
    await this.props.fetchOperations()
    this.setState({isFetching: false})
  }

  render ({t, categories}, {isFetching, withIncome, selectedCategory}) {
    if (isFetching) {
      return (
        <div>
          <Topbar>
            <h2>{t(`Categories.title.${categories ? 'general' : 'empty'}`)}</h2>
          </Topbar>
          <Loading loadingType='categories' />
        </div>
      )
    }

    const pieDataObject = {labels: [], data: [], colors: []}
    let operationsTotal = 0
    const globalCurrency = categories.length > 0 ? categories[0].currency : '€'

    // compute the filter to use
    if (!withIncome) {
      categories = categories.filter(category => (category.name !== 'income'))
    }

    if (categories.length !== 0) {
      // compute some global data
      const absoluteOperationsTotal = categories.reduce((total, category) => (total + Math.abs(category.amount)), 0)
      for (let category of categories) {
        category.percentage = Math.round(Math.abs(category.amount) / absoluteOperationsTotal * 100)
        for (let subcategory of category.subcategories) {
          subcategory.percentage = Math.round(Math.abs(subcategory.amount) / absoluteOperationsTotal * 100)
        }
        operationsTotal += category.amount
      }

      // sort the categories for display
      categories = categories.sort((a, b) => (b.percentage - a.percentage))

      // configure the pie chart
      for (const category of categories) {
        pieDataObject.labels.push(t(`Data.categories.${category.name}`))
        pieDataObject.data.push(Math.abs(category.amount).toFixed(2)) // use positive values
        pieDataObject.colors.push(category.color)
      }
    }

    return (
      <div>

        <Topbar>
          <h2>{t(`Categories.title.${categories.length > 0 ? 'general' : 'empty'}`)}</h2>
        </Topbar>

        <div className={styles['bnk-cat-top']}>
          <div className={styles['bnk-cat-form']}>
            <SelectDates />
            <div className={styles['bnk-cat-filter']}>
              <Toggle id='withIncome' checked={withIncome} onToggle={checked => this.setState({withIncome: checked})} />
              <label htmlFor='withIncome'>
                Inclure les revenus
              </label>
            </div>
            {categories.length > 0 && <FigureBlock
              label={withIncome ? t('Categories.title.total') : t('Categories.title.debit')}
              total={operationsTotal}
              currency={globalCurrency}
              coloredPositive coloredNegative signed />}
          </div>

          {categories.length > 0 && <div className={styles['bnk-cat-figure']}>
            <PieChart
              labels={pieDataObject.labels}
              data={pieDataObject.data}
              colors={pieDataObject.colors}
            />
          </div>}
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
            {categories.map(category =>
              <Category selectedCategory={selectedCategory} selectCategory={this.selectCategory} category={category} />
            )}
          </Table>
          : <p>{t('Categories.title.empty_text')}</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: computeCategorieData(operationsByCategory(getFilteredOperations(state)))
})

const mapDispatchToProps = dispatch => ({
  fetchOperations: async () => {
    const mangoIndex = await dispatch(indexOperationsByDate())
    return dispatch(fetchOperations(mangoIndex))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Categories))
