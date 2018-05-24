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
import styles from './CategoriesHeader.styl'

const CategoriesHeader = ({
  breadcrumbItems,
  selectedCategory,
  withIncome,
  onWithIncomeToggle,
  chartSize = 182,
  categories,
  selectCategory,
  t,
  breakpoints: { isMobile },
  isFetching
}) => {
  const globalCurrency = getGlobalCurrency(categories)
  const transactionsTotal = getTransactionsTotal(categories)
  const [previousItem] = breadcrumbItems.slice(-2, 1)
  const hasData = categories.length > 0 && categories[0].transactionsNumber > 0
  const showIncomeToggle = hasData && selectedCategory === undefined

  return (
    <div className={styles.CategoriesHeader}>
      <div>
        <AccountSwitch small={selectedCategory !== undefined} />
        {selectedCategory && (
          <BackButton onClick={previousItem && previousItem.onClick} />
        )}
        <SelectDates showFullYear />
        {!isMobile && breadcrumbItems.length > 1 ? (
          <Breadcrumb
            items={breadcrumbItems}
            className={styles.CategoriesHeader__Breadcrumb}
          />
        ) : null}
        {showIncomeToggle && (
          <div className={styles.CategoriesHeader__Toggle}>
            <Toggle
              id="withIncome"
              checked={withIncome}
              onToggle={checked => onWithIncomeToggle(checked)}
            />
            <label htmlFor="withIncome">
              {t('Categories.filter.includeIncome')}
            </label>
          </div>
        )}
      </div>
      {!isFetching &&
        hasData && (
          <CategoriesChart
            width={chartSize}
            height={chartSize}
            categories={
              selectedCategory ? selectedCategory.subcategories : categories
            }
            selectedCategory={selectedCategory}
            selectCategory={selectCategory}
            total={
              selectedCategory ? selectedCategory.amount : transactionsTotal
            }
            currency={globalCurrency}
            label={t('Categories.title.total')}
          />
        )}
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
