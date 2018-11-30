import React from 'react'
import {
  flowRight as compose,
  sumBy,
  uniq,
  sortBy,
  get,
  keyBy,
  groupBy
} from 'lodash'
import { connect } from 'react-redux'
import cx from 'classnames'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { withRouter } from 'react-router'
import { translate, Button, withBreakpoints } from 'cozy-ui/react'
import { queryConnect } from 'cozy-client'

import Topbar from 'components/Topbar'
import Loading from 'components/Loading'
import { Table, TdSecondary } from 'components/Table'
import { Padded } from 'components/Spacing'
import { Figure, FigureBlock } from 'components/Figure'
import PageTitle from 'components/PageTitle'
import flag from 'cozy-flags'

import AddAccountLink from 'ducks/settings/AddAccountLink'
import { getDefaultedSettingsFromCollection } from 'ducks/settings/helpers'
import { filterByDoc, getFilteringDoc } from 'ducks/filters'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'
import {
  ACCOUNT_DOCTYPE,
  GROUP_DOCTYPE,
  SETTINGS_DOCTYPE,
  TRANSACTION_DOCTYPE
} from 'doctypes'
import History from './History'
import {
  getBalanceHistories,
  sumBalanceHistories,
  balanceHistoryToChartData
} from './helpers'
import { buildVirtualGroups } from 'ducks/groups/helpers'
import { format as formatDate, subYears } from 'date-fns'

import styles from './Balance.styl'
import btnStyles from 'styles/buttons.styl'
import { isCollectionLoading } from 'ducks/client/utils'

const getGroupBalance = group => {
  return sumBy(group.accounts.data, account => get(account, 'balance') || 0)
}

const sameId = (filteringDoc, accountOrGroup) => {
  return filteringDoc && filteringDoc._id === accountOrGroup._id
}

const isAccountPartOf = (filteringDoc, account) => {
  const accounts = get(filteringDoc, 'accounts.accounts')
  return accounts && account && accounts.indexOf(account._id) > -1
}

// TODO should be using this everywhere, where to put it ?
const getAccountLabel = account => account.shortLabel || account.label

class _BalanceRow extends React.Component {
  render() {
    const {
      account,
      group,
      warningLimit,
      onClick,
      filteringDoc,
      isMobile
    } = this.props
    const balance = account ? account.balance : getGroupBalance(group)
    const isWarning = balance ? balance < warningLimit : false
    const isAlert = balance ? balance < 0 : false
    const label = account ? getAccountLabel(account) : group.label
    return (
      <tr
        className={cx(styles['Balance__row'], {
          [styles['Balance__row--selected']]: sameId(
            filteringDoc,
            account || group
          ),
          [styles[
            'Balance__row--selected-account-from-group'
          ]]: isAccountPartOf(filteringDoc, account)
        })}
        onClick={onClick.bind(null, account || group)}
      >
        <td
          className={cx(styles['Balance__account_name'], {
            [styles.alert]: isAlert,
            [styles.warning]: isWarning
          })}
        >
          {label}
        </td>
        <TdSecondary
          className={cx(styles['Balance__solde'], {
            [styles.alert]: isAlert,
            [styles.warning]: isWarning
          })}
        >
          {balance !== undefined && (
            <Figure
              total={balance}
              warningLimit={warningLimit}
              currency="€"
              coloredNegative
              coloredWarning
              signed
            />
          )}
        </TdSecondary>
        <TdSecondary className={styles['Balance__account_number']}>
          {account && account.number}
          {group &&
            group.accounts.data
              .filter(account => account)
              .map(getAccountLabel)
              .join(', ')}
        </TdSecondary>
        {!isMobile && (
          <TdSecondary className={styles['Balance__bank']}>
            {account && getAccountInstitutionLabel(account)}
            {group &&
              uniq(
                group.accounts.data
                  .filter(account => account)
                  .map(getAccountInstitutionLabel)
              ).join(', ')}
          </TdSecondary>
        )}
      </tr>
    )
  }
}

const BalanceRow = connect(state => ({
  filteringDoc: getFilteringDoc(state)
}))(_BalanceRow)

BalanceRow.propTypes = {
  accountOrGroup: props => {
    if (props.group === undefined && props.account === undefined) {
      return new Error('Missing value for account or group. Validation failed.')
    }
  }
}

/**
 * `SectionTitle` needs to be have a slight top margin.
 * TODO check with Claire how to have default margins
 * in components that work well together.
 *
 * @param  {React.Element} options.children
 */
const SectionTitle = ({ children }) => {
  return <h3 className={styles['Balance__section-title']}>{children}</h3>
}

const enhanceGroups = compose(
  withRouter,
  translate()
)

const BalanceGroups = enhanceGroups(
  ({ groups, accountsById, balanceLower, isMobile, onRowClick, t, router }) => {
    return (
      <div>
        <SectionTitle>{t('AccountSwitch.groups')}</SectionTitle>
        {groups.length !== 0 && (
          <Table className={styles['Balance__table']}>
            <thead>
              <tr>
                <td className={styles['Balance__account_name']}>
                  {t('Groups.label')}
                </td>
                <td className={styles['Balance__solde']}>
                  {t('Groups.total-balance')}
                </td>
                <td className={styles['Balance__group-accounts']}>
                  {t('Groups.accounts')}
                </td>
                <td className={styles['Balance__bank']}>{t('Groups.banks')}</td>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => (
                <BalanceRow
                  getAccount={id => accountsById[id]}
                  key={group.label}
                  group={group}
                  warningLimit={balanceLower}
                  isMobile={isMobile}
                  onClick={onRowClick.bind(null, group)}
                />
              ))}
            </tbody>
          </Table>
        )}
        {groups.length === 0 ? (
          <p>
            {t('Groups.no-groups')}
            <br />
            <Button
              onClick={() => router.push('/settings/groups/new')}
              className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}
              label={t('Groups.create')}
              icon="plus"
            />
          </p>
        ) : (
          <p>
            <Button
              onClick={() => router.push('/settings/groups')}
              className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}
              label={t('Groups.manage-groups')}
            />
          </p>
        )}
      </div>
    )
  }
)

const BalanceAccounts = translate()(
  ({ accounts, balanceLower, isMobile, onRowClick, t }) => {
    return (
      <div>
        <SectionTitle>{t('AccountSwitch.accounts')}</SectionTitle>
        <Table className={styles['Balance__table']}>
          <thead>
            <tr>
              <td className={styles['Balance__account_name']}>
                {t('Accounts.label')}
              </td>
              <td className={styles['Balance__solde']}>{t('Balance.solde')}</td>
              {!isMobile && (
                <td className={styles['Balance__account_number']}>
                  {t('Balance.account_number')}
                </td>
              )}
              {!isMobile && (
                <td className={styles['Balance__bank']}>
                  {t('Balance.bank_name')}
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <BalanceRow
                key={index}
                account={account}
                warningLimit={balanceLower}
                isMobile={isMobile}
                onClick={onRowClick.bind(null, account)}
              />
            ))}
          </tbody>
        </Table>
        <p>
          <AddAccountLink>
            <Button
              className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}
              icon="plus"
              label={t('Accounts.add-account')}
            />
          </AddAccountLink>
        </p>
      </div>
    )
  }
)

BalanceAccounts.propTypes = {
  balanceLower: PropTypes.number.isRequired,
  accounts: PropTypes.array.isRequired
}

class Balance extends React.Component {
  goToTransactionsFilteredBy = doc => {
    this.props.filterByDoc(doc)
    this.props.router.push('/transactions')
  }

  getBalanceHistory(accounts, transactions) {
    const balanceHistories = getBalanceHistories(
      accounts,
      transactions,
      new Date()
    )
    const balanceHistory = sumBalanceHistories(Object.values(balanceHistories))

    return balanceHistory
  }

  getChartData(accounts, transactions) {
    const history = this.getBalanceHistory(accounts, transactions)
    const data = balanceHistoryToChartData(history)

    return data
  }

  renderHistory() {
    const {
      transactions: transactionsCollection,
      accounts: accountsCollection
    } = this.props

    let accounts

    if (!isCollectionLoading(accountsCollection)) {
      accounts = accountsCollection.data
    }

    let chartProps

    if (
      !isCollectionLoading(transactionsCollection) &&
      !transactionsCollection.hasMore
    ) {
      const data = this.getChartData(
        accountsCollection.data,
        transactionsCollection.data
      )
      const nbTicks = uniq(
        Object.keys(groupBy(data, i => formatDate(i.x, 'YYYY-MM')))
      ).length
      const intervalBetweenPoints = 57
      const TICK_FORMAT = d3.timeFormat('%b')

      chartProps = {
        data,
        nbTicks,
        width: nbTicks * intervalBetweenPoints,
        height: 103,
        margin: {
          top: 20,
          bottom: 35,
          left: 16,
          right: 16
        },
        showAxis: true,
        axisMargin: 10,
        tickFormat: TICK_FORMAT
      }
    }

    if (transactionsCollection.hasMore) {
      transactionsCollection.fetchMore()
    }

    return <History accounts={accounts} chartProps={chartProps} />
  }

  render() {
    const {
      t,
      breakpoints: { isMobile },
      accounts: accountsCollection,
      groups: groupsCollection,
      settings: settingsCollection
    } = this.props
    if (
      isCollectionLoading(accountsCollection) ||
      isCollectionLoading(groupsCollection) ||
      isCollectionLoading(settingsCollection)
    ) {
      return (
        <Padded>
          <Topbar>
            <PageTitle>{t('Balance.title')}</PageTitle>
          </Topbar>
          <Loading />
        </Padded>
      )
    }

    const accounts = accountsCollection.data
    const groups = [...groupsCollection.data, ...buildVirtualGroups(accounts)]
    const settings = getDefaultedSettingsFromCollection(settingsCollection)

    const accountsSorted = sortBy(accounts, ['institutionLabel', 'label'])
    const groupsSorted = sortBy(
      groups.map(group => ({
        ...group,
        label: group.virtual
          ? t(`Data.accountTypes.${group.label}`)
          : group.label
      })),
      group => group.label
    )

    let total = 0
    accounts.map(account => {
      if (account.balance) {
        total += parseInt(account.balance, 10)
      }
    })

    const balanceLower = get(settings, 'notifications.balanceLower.value')

    const groupsC = (
      <BalanceGroups
        accountsById={keyBy(accounts, x => x._id)}
        groups={groupsSorted}
        balanceLower={balanceLower}
        isMobile={isMobile}
        onRowClick={this.goToTransactionsFilteredBy}
      />
    )

    return (
      <Padded>
        <Topbar>
          <PageTitle>{t('Balance.title')}</PageTitle>
        </Topbar>
        {flag('balance-history') ? (
          this.renderHistory()
        ) : (
          <div className={styles['Balance__kpi']}>
            <FigureBlock
              label={t('Balance.subtitle.all')}
              total={total}
              currency="€"
              coloredPositive
              coloredNegative
              signed
            />
          </div>
        )}
        {groupsSorted.length > 0 && groupsC}
        <BalanceAccounts
          accounts={accountsSorted}
          balanceLower={balanceLower}
          isMobile={isMobile}
          onRowClick={this.goToTransactionsFilteredBy}
        />
        {groupsSorted.length === 0 && groupsC}
      </Padded>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  filterByDoc: doc => dispatch(filterByDoc(doc))
})

export default compose(
  withRouter,
  withBreakpoints(),
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    settings: { query: client => client.all(SETTINGS_DOCTYPE), as: 'settings' },
    transactions: {
      query: client => {
        const today = new Date()
        const oneYearBefore = subYears(today, 1)
        const minDate = formatDate(oneYearBefore, 'YYYY-MM-DD')

        return client.all(TRANSACTION_DOCTYPE).where({ date: { $gt: minDate } })
      }
    }
  })
)(Balance)
