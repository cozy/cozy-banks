import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import SadCozyIcon from 'cozy-ui/transpiled/react/Icons/SadCozy'

import { useSelector, useDispatch } from 'react-redux'

import { useRouter, useParams } from 'components/RouterContext'
import TransactionSelectDates from 'ducks/transactions/TransactionSelectDates'
import { getPeriod, addFilterByPeriod } from 'ducks/filters'

import CategoriesChart from 'ducks/categories/CategoriesChart'
import {
  getGlobalCurrency,
  getTransactionsTotal
} from 'ducks/categories/helpers'
import styles from 'ducks/categories/CategoriesHeader/CategoriesHeader.styl'
import { onSubcategory } from 'ducks/categories/utils'

import IncomeToggle from 'ducks/categories/IncomeToggle'
import DesktopFragment from './DesktopFragment'
import MobileFragment from './MobileFragment'
import { makeBreadcrumbs } from './utils'

const CategoriesHeader = props => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const {
    emptyIcon,
    hasAccount,
    selectedCategory,
    withIncome,
    onWithIncomeToggle,
    categories,
    chartSize,
    isFetching,
    isFetchingNewData,
    categoryName,
    subcategoryName,
    classes
  } = props

  const hasData =
    categories.length > 0 &&
    (selectedCategory
      ? selectedCategory.transactionsNumber > 0
      : categories[0].transactionsNumber > 0)
  const showIncomeToggle = hasData && selectedCategory === undefined
  const globalCurrency = getGlobalCurrency(categories)
  const transactionsTotal = getTransactionsTotal(categories)
  const params = useParams()
  const isSubcategory = onSubcategory(params)

  const router = useRouter()
  const breadcrumbItems = useMemo(() => {
    return makeBreadcrumbs(router, categoryName, subcategoryName, t)
  }, [router, categoryName, subcategoryName, t])

  const dispatch = useDispatch()
  const period = useSelector(getPeriod)
  const onChangePeriod = useCallback(
    newPeriod => {
      dispatch(addFilterByPeriod(newPeriod))
    },
    [dispatch]
  )

  const incomeToggle = showIncomeToggle ? (
    <IncomeToggle withIncome={withIncome} onToggle={onWithIncomeToggle} />
  ) : null

  const chart =
    isFetching || isSubcategory ? null : (
      <CategoriesChart
        width={chartSize}
        height={chartSize}
        categories={
          selectedCategory ? selectedCategory.subcategories : categories
        }
        selectedCategory={selectedCategory}
        total={selectedCategory ? selectedCategory.amount : transactionsTotal}
        currency={globalCurrency}
        label={t('Categories.title.total')}
        hasAccount={hasAccount}
        className={cx(
          hasAccount ? null : styles.NoAccount_chart,
          selectedCategory ? styles.SubcategoryChart : null
        )}
      />
    )

  const dateSelector = (
    <TransactionSelectDates
      onChange={onChangePeriod}
      value={period}
      showFullYear
      className={classes.selectDates}
    />
  )

  const Fragment = isMobile ? MobileFragment : DesktopFragment

  return (
    <Fragment
      breadcrumbItems={breadcrumbItems}
      chart={chart}
      classes={classes}
      dateSelector={dateSelector}
      emptyIcon={emptyIcon}
      hasAccount={hasAccount}
      hasData={hasData}
      selectedCategory={selectedCategory}
      incomeToggle={incomeToggle}
      isFetching={isFetching}
      isFetchingNewData={isFetchingNewData}
    />
  )
}

CategoriesHeader.defaultProps = {
  chartSize: 182,
  emptyIcon: SadCozyIcon,
  classes: {
    header: '',
    legalMention: 'u-mt-2 u-pt-1',
    selectDates: 'u-pt-half'
  }
}

CategoriesHeader.propTypes = {
  categoryName: PropTypes.string,
  subcategoryName: PropTypes.string,
  selectedCategory: PropTypes.object,
  withIncome: PropTypes.bool.isRequired,
  onWithIncomeToggle: PropTypes.func.isRequired,
  chartSize: PropTypes.number,
  hasAccount: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired
}

export default React.memo(CategoriesHeader)
