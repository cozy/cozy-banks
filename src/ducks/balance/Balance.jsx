import React from 'react'
import { flowRight as compose, sumBy, uniq, sortBy } from 'lodash'
import { connect } from 'react-redux'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { or } from 'airbnb-prop-types'

import { withRouter } from 'react-router'
import { translate, Button, Icon, withBreakpoints } from 'cozy-ui/react'
import { cozyConnect, fetchCollection, getDocument } from 'cozy-client'

import Topbar from 'components/Topbar'
import Loading from 'components/Loading'
import { Table, TdSecondary } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'

import CollectLink from 'ducks/settings/CollectLink'
import { getSettings, fetchSettingsCollection } from 'ducks/settings'
import { filterByDoc, getFilteringDoc } from 'ducks/filters'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'

import styles from './Balance.styl'
import btnStyles from 'styles/buttons'
import plus from 'assets/icons/16/plus.svg'

const getGroupBalance = (group, getAccount) => {
  return sumBy(
    group.accounts,
    accountId => (getAccount(accountId) || {}).balance || 0
  )
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
    const balance = account
      ? account.balance
      : getGroupBalance(group, this.props.getAccount)
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
            uniq(
              group.accounts
                .map(this.props.getAccount)
                .filter(account => account)
                .map(getAccountLabel)
            ).join(', ')}
        </TdSecondary>
        {!isMobile && (
          <TdSecondary className={styles['Balance__bank']}>
            {account && getAccountInstitutionLabel(account)}
            {group &&
              uniq(
                group.accounts
                  .map(this.props.getAccount)
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
  filteringDoc: getFilteringDoc(state),
  getAccount: id => getDocument(state, ACCOUNT_DOCTYPE, id)
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
  ({ groups, balanceLower, isMobile, onRowClick, t, router }) => {
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
            {accounts.map(account => (
              <BalanceRow
                account={account}
                warningLimit={balanceLower}
                isMobile={isMobile}
                onClick={onRowClick.bind(null, account)}
              />
            ))}
          </tbody>
        </Table>
        <p>
          <CollectLink>
            <Button className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}>
              <Icon icon={plus} className="u-mr-half" />
              {t('Accounts.add-account')}
            </Button>
          </CollectLink>
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

  render() {
    const { t, settingsCollection, breakpoints: { isMobile } } = this.props
    let { accounts, groups } = this.props
    accounts = sortBy(accounts.data, ['institutionLabel', 'label'])
    groups = sortBy(groups.data, 'label')

    if (accounts === null || groups === null) {
      return <Loading />
    }

    const trad = 'Balance.subtitle.all'
    const label = 'all'
    let total = 0
    accounts.map(account => {
      if (account.balance) {
        total += parseInt(account.balance, 10)
      }
    })

    const balanceLower = getSettings(settingsCollection).notifications
      .balanceLower.value

    const groupsC = (
      <BalanceGroups
        groups={groups}
        balanceLower={balanceLower}
        isMobile={isMobile}
        onRowClick={this.goToTransactionsFilteredBy}
      />
    )
    return (
      <div className={styles['Balance']}>
        <Topbar>
          <h2>{t('Balance.title')}</h2>
        </Topbar>
        <div className={styles['Balance__kpi']}>
          <FigureBlock
            label={t(trad, { label: label })}
            total={total}
            currency="€"
            coloredPositive
            coloredNegative
            signed
          />
        </div>

        {groups.length > 0 && groupsC}
        <BalanceAccounts
          accounts={accounts}
          balanceLower={balanceLower}
          isMobile={isMobile}
          onRowClick={this.goToTransactionsFilteredBy}
        />
        {groups.length === 0 && groupsC}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settingsCollection: fetchSettingsCollection()
})

const mapDocumentsToProps = ownProps => ({
  accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
  groups: fetchCollection('groups', GROUP_DOCTYPE)
})

const mapDispatchToProps = dispatch => ({
  filterByDoc: doc => dispatch(filterByDoc(doc))
})

export default compose(
  withBreakpoints(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  cozyConnect(mapDocumentsToProps),
  translate()
)(Balance)
