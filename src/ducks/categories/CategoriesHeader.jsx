import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Toggle, translate, withBreakpoints } from 'cozy-ui/react'
import flag from 'cozy-flags'
import Breadcrumb from 'components/Breadcrumb'
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
    const withPrimary = flag('categories-header-primary')
    const theme = withPrimary ? 'primary' : 'default'
    const colorProps = { color: theme }

    return (
      <Fragment>
        <AccountSwitch small={selectedCategory !== undefined} {...colorProps} />
        {selectedCategory && (
          <BackButton
            onClick={
              previousItem && previousItem.onClick
                ? previousItem.onClick
                : undefined
            }
            theme={theme}
          />
        )}
      </Fragment>
    )
  }

  renderIncomeToggle = () => {
    const {
      selectedCategory,
      withIncome,
      onWithIncomeToggle,
      breakpoints: { isMobile },
      categories,
      t
    } = this.props
    const hasData =
      categories.length > 0 && categories[0].transactionsNumber > 0
    const showIncomeToggle = hasData && selectedCategory === undefined

    if (!showIncomeToggle) {
      return null
    }
    const withPrimary = flag('categories-header-primary')
    const color = withPrimary && !isMobile ? 'primary' : 'default'

    return (
      <div className={cx(styles.CategoriesHeader__Toggle, styles[color])}>
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
      breakpoints: { isMobile },
      t,
      isFetching
    } = this.props
    const globalCurrency = getGlobalCurrency(categories)
    const transactionsTotal = getTransactionsTotal(categories)

    if (isFetching) {
      return null
    }

    const withPrimary = flag('categories-header-primary')
    const color = { color: withPrimary && !isMobile ? 'primary' : 'default' }

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
        {...color}
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

    const withPrimary = flag('categories-header-primary')
    const colorProps = { color: withPrimary ? 'primary' : 'default' }

    if (isMobile) {
      return (
        <Fragment>
          <Header fixed {...colorProps}>
            <SelectDates showFullYear {...colorProps} />
          </Header>
          {accountSwitch}
          <Header color="default">
            <Padded>
              {incomeToggle}
              {chart}
            </Padded>
          </Header>
        </Fragment>
      )
    }

    return (
      <Header {...colorProps}>
        <Padded className={styles.CategoriesHeader}>
          <div>
            <Padded className="u-ph-0 u-pt-0 u-pb-half">{accountSwitch}</Padded>
            <Padded className="u-pv-1 u-ph-0">
              <SelectDates showFullYear {...colorProps} />
            </Padded>
            {breadcrumbItems.length > 1 && (
              <Breadcrumb
                items={breadcrumbItems}
                className={cx(
                  styles.CategoriesHeader__Breadcrumb,
                  styles[colorProps.color]
                )}
                {...colorProps}
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
