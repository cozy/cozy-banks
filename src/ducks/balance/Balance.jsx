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
import { or } from 'airbnb-prop-types'

import { withRouter } from 'react-router'
import { translate, Button, Icon, withBreakpoints } from 'cozy-ui/react'

import Topbar from 'components/Topbar'
import Loading from 'components/Loading'
import { Table, TdSecondary } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'
import PageTitle from 'components/PageTitle'
import flag from 'cozy-flags'

import AddAccountLink from 'ducks/settings/AddAccountLink'
import { filterByDoc, getFilteringDoc } from 'ducks/filters'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE, SETTINGS_DOCTYPE } from 'doctypes'
import History from './History'
import historyData from './history_data.json'
import { getBalanceHistories } from './helpers'
import sma from 'sma'
import { parse as parseDate, format as formatDate } from 'date-fns'

import styles from './Balance.styl'
import btnStyles from 'styles/buttons.styl'
import plus from 'assets/icons/16/plus.svg'
import { isCollectionLoading, queryConnect } from 'utils/client'

const getGroupBalance = group => {
  return sumBy(group.accounts.data, account => account.balance || 0)
}

const sameId = (filteringDoc, accountOrGroup) => {
  return filteringDoc && filteringDoc._id === accountOrGroup._id
}

const isAccountPartOf = (filteringDoc, account) => {
  return (
    filteringDoc &&
    account &&
    filteringDoc.accounts &&
    filteringDoc.accounts.indexOf(account._id) > -1
  )
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
  accountOrGroup: or([
    {
      account: PropTypes.object.isRequired
    },
    {
      group: PropTypes.object.isRequired
    }
  ]).isRequired
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

const enhanceGroups = compose(withRouter, translate())

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
            >
              <Icon icon={plus} className="u-mr-half" />
              {t('Groups.create')}
            </Button>
          </p>
        ) : (
          <p>
            <Button
              onClick={() => router.push('/settings/groups')}
              className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}
            >
              {t('Groups.manage-groups')}
            </Button>
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
            <Button className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}>
              <Icon icon={plus} className="u-mr-half" />
              {t('Accounts.add-account')}
            </Button>
          </AddAccountLink>
        </p>
      </div>
    )
  }
)

class Balance extends React.Component {
  goToTransactionsFilteredBy = doc => {
    this.props.filterByDoc(doc)
    this.props.router.push('/transactions')
  }

  sortBalanceHistoryByDate(history) {
    const balanceHistory = sortBy(Object.entries(history), ([date]) => date)
      .reverse()
      .map(([date, balance]) => ({
        x: parseDate(date),
        y: balance
      }))

    return balanceHistory
  }

  getBalanceHistory() {
    const balanceHistories = getBalanceHistories(
      historyData['io.cozy.bank.accounts'],
      historyData['io.cozy.bank.operations']
    )
    const balanceHistory = this.sortBalanceHistoryByDate(balanceHistories.all)

    return balanceHistory
  }

  getChartData() {
    const history = this.getBalanceHistory()
    const WINDOW_SIZE = 15

    const balancesSma = sma(history.map(h => h.y), WINDOW_SIZE, n => n)
    const data = balancesSma.map((balance, i) => ({
      ...history[i],
      y: balance
    }))

    return data
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
        <div className={styles['Balance']}>
          <Topbar>
            <PageTitle>{t('Balance.title')}</PageTitle>
          </Topbar>
          <Loading />
        </div>
      )
    }

    const accounts = accountsCollection.data
    const groups = groupsCollection.data
    const settings = settingsCollection.data

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

    const chartData = this.getChartData()
    const chartNbTicks = uniq(
      Object.keys(groupBy(chartData, i => formatDate(i.x, 'YYYY-MM')))
    ).length
    const chartIntervalBetweenPoints = 57

    return (
      <div className={styles['Balance']}>
        <Topbar>
          <PageTitle>{t('Balance.title')}</PageTitle>
        </Topbar>
        {flag('balance-history') ? (
          <History
            accounts={historyData['io.cozy.bank.accounts']}
            transactions={historyData['io.cozy.bank.operations']}
            chartProps={{
              data: chartData,
              width: chartNbTicks * chartIntervalBetweenPoints
            }}
          />
        ) : (
          <div className={styles['Balance__kpi']}>
            <FigureBlock
              label={t('Balance.subtitle.all')}
              accounts={historyData['io.cozy.bank.accounts']}
              total={total}
              transactions={historyData['io.cozy.bank.operations']}
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
      </div>
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
  connect(null, mapDispatchToProps),
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' },
    settings: { query: client => client.all(SETTINGS_DOCTYPE), as: 'settings' }
  })
)(Balance)
