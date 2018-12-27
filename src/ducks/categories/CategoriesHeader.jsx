import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Toggle, translate, withBreakpoints } from 'cozy-ui/react'
import flag from 'cozy-flags'
import { Breadcrumb } from 'components/Breadcrumb'
import { AccountSwitch } from 'ducks/account'
import BackButton from 'components/BackButton'
import Header from 'components/Header'
import { Padded } from 'components/Spacing'
import { ConnectedSelectDates as SelectDates } from 'components/SelectDates'
import CategoriesChart from './CategoriesChart'
import { getTransactionsTotal, getGlobalCurrency } from './helpers'
import { flowRight as compose } from 'lodash'
import styles from './CategoriesHeader.styl'

class CategoriesHeader extends PureComponent {
  renderAccountSwitch = () => {
    const { selectedCategory, breadcrumbItems } = this.props
    const [previousItem] = breadcrumbItems.slice(-2, 1)
    const withChart = flag('transaction-history')
    const colorProps = { color: withChart ? 'primary' : 'default' }

    return (
      <Fragment>
        <AccountSwitch small={selectedCategory !== undefined} {...colorProps} />
        {selectedCategory && (
          <BackButton onClick={previousItem && previousItem.onClick} />
        )}
      </Fragment>
    )
  }

  renderIncomeToggle = () => {
    const {
      selectedCategory,
      withIncome,
      onWithIncomeToggle,
      categories,
      t
    } = this.props
    const hasData =
      categories.length > 0 && categories[0].transactionsNumber > 0
    const showIncomeToggle = hasData && selectedCategory === undefined

    if (!showIncomeToggle) {
      return null
    }

    return (
      <div className={styles.CategoriesHeader__Toggle}>
        <Toggle
          id="withIncome"
          checked={withIncome}
          onToggle={onWithIncomeToggle}
        />
        <label htmlFor="withIncome">
          {t('Categories.filter.includeIncome')}
        </label>
      </div>
    )
  }

  renderChart = () => {
    const {
      selectedCategory,
      chartSize = 182,
      categories,
      t,
      isFetching
    } = this.props
    const globalCurrency = getGlobalCurrency(categories)
    const transactionsTotal = getTransactionsTotal(categories)

    if (isFetching) {
      return null
    }

    return (
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
      />
    )
  }

  render() {
    const {
      breadcrumbItems,
      breakpoints: { isMobile }
    } = this.props

    const accountSwitch = this.renderAccountSwitch()
    const incomeToggle = this.renderIncomeToggle()
    const chart = this.renderChart()

    if (isMobile) {
      return (
        <Fragment>
          <Header fixed>
            <SelectDates showFullYear />
          </Header>
          {accountSwitch}
          <Padded>
            {incomeToggle}
            {chart}
          </Padded>
        </Fragment>
      )
    }

    const withChart = flag('transaction-history')
    const colorProps = { color: withChart ? 'primary' : 'default' }

    return (
      <Header {...colorProps}>
        <Padded className={cx(styles.CategoriesHeader, 'u-pb-0')}>
          <div>
            {accountSwitch}
            <SelectDates showFullYear />
            {breadcrumbItems.length > 1 && (
              <Breadcrumb
                items={breadcrumbItems}
                className={styles.CategoriesHeader__Breadcrumb}
              />
            )}
            {incomeToggle}
          </div>
          {chart}
        </Padded>
      </Header>
    )
  }
}

CategoriesHeader.propTypes = {
  breadcrumbItems: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  withIncome: PropTypes.bool.isRequired,
  onWithIncomeToggle: PropTypes.func.isRequired,
  chartSize: PropTypes.number,
  categories: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  breakpoints: PropTypes.object.isRequired
}

export default compose(
  translate(),
  withBreakpoints()
)(CategoriesHeader)
