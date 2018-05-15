import React from 'react'
import PropTypes from 'prop-types'
import { translate, withBreakpoints } from 'cozy-ui/react'
import { Breadcrumb } from 'components/Breadcrumb'
import { AccountSwitch } from 'ducks/account'
import BackButton from 'components/BackButton'
import { ConnectedSelectDates as SelectDates } from 'components/SelectDates'
import Toggle from 'cozy-ui/react/Toggle'
import CategoriesChart from './CategoriesChart'
import { getTransactionsTotal, getGlobalCurrency } from './helpers'
import { flowRight as compose } from 'lodash'
import styles from './styles'

const stTop = styles['bnk-cat-top']
const stForm = styles['bnk-cat-form']
const stFilter = styles['bnk-cat-filter']

const CategoriesHeader = ({
  breadcrumbItems,
  selectedCategory,
  withIncome,
  onWithIncomeToggle,
  chartSize = 182,
  categories,
  selectCategory,
  t,
  breakpoints: { isMobile }
}) => {
  const globalCurrency = getGlobalCurrency(categories)
  const transactionsTotal = getTransactionsTotal(categories)

  return (
    <div>
      <div>
        {!isMobile && breadcrumbItems.length > 1 ? (
          <Breadcrumb items={breadcrumbItems} />
        ) : null}
        <AccountSwitch />
        {selectedCategory && (
          <BackButton onClick={() => this.selectCategory(undefined)} />
        )}
      </div>
      <div>
        <SelectDates showFullYear />
        <div className={stTop}>
          <div className={stForm}>
            {selectedCategory === undefined && (
              <div className={stFilter}>
                <Toggle
                  id="withIncome"
                  checked={withIncome}
                  onToggle={checked => onWithIncomeToggle(checked)}
                />
                <label htmlFor="withIncome">Inclure les revenus</label>
              </div>
            )}
          </div>
          <CategoriesChart
            width={chartSize}
            height={chartSize}
            categories={categories}
            selectedCategoryName={selectedCategory && selectedCategory.name}
            selectCategory={selectCategory}
            total={
              selectedCategory ? selectedCategory.amount : transactionsTotal
            }
            currency={globalCurrency}
            label={t('Categories.title.total')}
          />
        </div>
      </div>
    </div>
  )
}

CategoriesHeader.propTypes = {
  breadcrumbItems: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  withIncome: PropTypes.bool.isRequired,
  onWithIncomeToggle: PropTypes.func.isRequired,
  chartSize: PropTypes.number,
  categories: PropTypes.array.isRequired,
  selectCategory: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  breakpoints: PropTypes.object.isRequired
}

export default compose(translate(), withBreakpoints())(CategoriesHeader)
