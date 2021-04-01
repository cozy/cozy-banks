import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Fade from '@material-ui/core/Fade'
import Breadcrumb from 'cozy-ui/transpiled/react/Breadcrumbs'
import { useCozyTheme } from 'cozy-ui/transpiled/react/CozyTheme'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'
import Stack from 'cozy-ui/transpiled/react/Stack'

import { AccountSwitch } from 'ducks/account'
import BackButton from 'components/BackButton'
import Header from 'components/Header'
import Padded from 'components/Padded'
import { ConnectedSelectDates as SelectDates } from 'components/SelectDates'

import CategoriesChart from 'ducks/categories/CategoriesChart'
import {
  getTransactionsTotal,
  getGlobalCurrency
} from 'ducks/categories/helpers'
import styles from 'ducks/categories/CategoriesHeader.styl'
import AddAccountButton from 'ducks/categories/AddAccountButton'
import { onSubcategory } from 'ducks/categories/utils'
import catStyles from 'ducks/categories/styles.styl'

import Table from 'components/Table'
import { useParams } from 'components/RouterContext'
import LegalMention from 'ducks/legal/LegalMention'
import Empty from 'cozy-ui/transpiled/react/Empty'

const stAmount = catStyles['bnk-table-amount']
const stCategory = catStyles['bnk-table-category-category']
const stPercentage = catStyles['bnk-table-percentage']
const stTotal = catStyles['bnk-table-total']
const stTableCategory = catStyles['bnk-table-category']

const IncomeToggle = ({ withIncome, onToggle }) => {
  const theme = useCozyTheme()
  const { t } = useI18n()

  const handleChange = useCallback(
    ev => {
      onToggle(ev.target.checked)
    },
    [onToggle]
  )

  return (
    <div className={cx(styles.CategoriesHeader__Toggle, styles[theme])}>
      <Switch
        id="withIncome"
        disableRipple
        checked={withIncome}
        color="secondary"
        onChange={handleChange}
      />
      <label htmlFor="withIncome">{t('Categories.filter.includeIncome')}</label>
    </div>
  )
}

const CategoryAccountSwitch = ({ selectedCategory, breadcrumbItems }) => {
  const [previousItem] = breadcrumbItems.slice(-2, 1)
  return (
    <Fragment>
      <AccountSwitch small={selectedCategory !== undefined} />
      {selectedCategory && (
        <BackButton
          onClick={
            previousItem && previousItem.onClick
              ? previousItem.onClick
              : undefined
          }
          theme="primary"
        />
      )}
    </Fragment>
  )
}

const CategoriesTableHead = props => {
  const { selectedCategory } = props
  const { isDesktop, isTablet } = useBreakpoints()
  const { t } = useI18n()
  return (
    <thead>
      <tr>
        <td className={stCategory}>
          {selectedCategory
            ? t('Categories.headers.subcategories')
            : t('Categories.headers.categories')}
        </td>
        {(isDesktop || isTablet) && (
          <td className={catStyles['bnk-table-operation']}>
            {t('Categories.headers.transactions.plural')}
          </td>
        )}
        {isDesktop && (
          <td className={stAmount}>{t('Categories.headers.credit')}</td>
        )}
        {isDesktop && (
          <td className={stAmount}>{t('Categories.headers.debit')}</td>
        )}
        <td className={stTotal}>{t('Categories.headers.total')}</td>
        <td className={stPercentage}>%</td>
      </tr>
    </thead>
  )
}

const CategoriesHeader = props => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const {
    breadcrumbItems,
    emptyIcon,
    hasAccount,
    selectedCategory,
    withIncome,
    onWithIncomeToggle,
    categories,
    chartSize,
    isFetching
  } = props

  const hasData = categories.length > 0 && categories[0].transactionsNumber > 0
  const showIncomeToggle = hasData && selectedCategory === undefined
  const globalCurrency = getGlobalCurrency(categories)
  const transactionsTotal = getTransactionsTotal(categories)
  const params = useParams()
  const isSubcategory = onSubcategory(params)
  const accountSwitch = (
    <CategoryAccountSwitch
      selectedCategory={selectedCategory}
      breadcrumbItems={breadcrumbItems}
    />
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

  const dateSelector = <SelectDates showFullYear />

  if (isMobile) {
    return (
      <Fragment>
        <Header theme="inverted" fixed className={styles.CategoriesHeader}>
          {dateSelector}
        </Header>

        <div style={{ height: '3rem' }} />
        {accountSwitch}
        {hasAccount ? (
          <Header
            className={cx(styles.CategoriesHeader, {
              [styles.NoAccount]: !hasAccount
            })}
            theme={isMobile ? 'normal' : 'inverted'}
          >
            <LegalMention className="u-mt-2 u-pt-1 u-mr-1" />

            {!hasData && (
              <div className={styles.NoAccount_empty}>
                <Empty
                  icon={emptyIcon}
                  title=""
                  text={t('Categories.title.empty-text')}
                />
              </div>
            )}
            {incomeToggle || chart ? (
              <Padded className="u-pt-0">
                {incomeToggle}
                {chart}
              </Padded>
            ) : null}
          </Header>
        ) : (
          <div className={cx(styles.NoAccount_container)}>
            <LegalMention className="u-mt-3 u-pt-1 u-mr-1" />

            <Padded className={styles.NoAccount_box}>
              {chart}
              <AddAccountButton absolute label={t('Accounts.add-bank')} />
            </Padded>
          </div>
        )}
      </Fragment>
    )
  }

  return (
    <Header theme="inverted" fixed>
      <Padded
        className={cx(styles.CategoriesHeader, {
          [styles.NoAccount]: !hasAccount
        })}
      >
        {hasAccount ? (
          <>
            <div>
              <Stack spacing="m">
                {accountSwitch}
                {dateSelector}
              </Stack>
              {breadcrumbItems.length > 1 && (
                <Fade in>
                  <Breadcrumb className="u-mt-1" items={breadcrumbItems} />
                </Fade>
              )}
              {incomeToggle}
            </div>
            {chart}
          </>
        ) : (
          <AddAccountButton label={t('Accounts.add-bank')} />
        )}
      </Padded>
      {hasAccount ? (
        <Table className={stTableCategory}>
          <CategoriesTableHead selectedCategory={selectedCategory} />
        </Table>
      ) : null}
    </Header>
  )
}

CategoriesHeader.defaultProps = {
  chartSize: 182,
  emptyIcon: 'cozy'
}

CategoriesHeader.propTypes = {
  breadcrumbItems: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  withIncome: PropTypes.bool.isRequired,
  onWithIncomeToggle: PropTypes.func.isRequired,
  chartSize: PropTypes.number,
  hasAccount: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired
}

export default CategoriesHeader
