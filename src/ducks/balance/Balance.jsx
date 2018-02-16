import React from 'react'
import { flowRight as compose, sumBy } from 'lodash'
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
import { filterByDoc, resetFilterByDoc } from 'ducks/filters'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'
import flag from 'utils/flag'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'

import styles from './Balance.styl'
import btnStyles from 'styles/buttons'
import plus from 'assets/icons/16/plus.svg'

const getGroupBalance = (group, getAccount) => {
  return sumBy(group.accounts, accountId =>
    (getAccount(accountId) || {}).balance || 0)
}

// TODO should be using this everywhere, where to put it ?
const getAccountLabel = account => account.shortLabel || account.label

class _BalanceRow extends React.Component {
  render () {
    const {account, group, warningLimit, isMobile, onClick} = this.props
    const balance = account ? account.balance : getGroupBalance(group, this.props.getAccount)
    const isWarning = balance ? balance < warningLimit : false
    const isAlert = balance ? balance < 0 : false
    const label = account ? getAccountLabel(account) : group.label
    return (
      <tr className={styles['balance-row']} onClick={onClick.bind(null, account || group)}>
        <td className={cx(styles['account_name'], { [styles.alert]: isAlert, [styles.warning]: isWarning })}>
          {label}
        </td>
        <TdSecondary className={cx(styles['solde'], { [styles.alert]: isAlert, [styles.warning]: isWarning })}>
          {balance && <Figure total={balance} warningLimit={warningLimit} currency='€' coloredNegative coloredWarning signed />}
        </TdSecondary>
        {!isMobile && <TdSecondary className={styles['bank_name']}>
          {account && getAccountInstitutionLabel(account)}
          {group &&
            group.accounts
              .map(this.props.getAccount)
              .filter(account => account)
              .map(getAccountLabel).join(', ')
          }
        </TdSecondary>}
        {!isMobile && <TdSecondary className={styles['account_number']}>
          {account && account.number}
        </TdSecondary>}
      </tr>
    )
  }
}

const BalanceRow = connect(state => ({
  getAccount: id => getDocument(state, ACCOUNT_DOCTYPE, id)
}))(_BalanceRow)

BalanceRow.propTypes = {
  accountOrGroup: or([{
    account: PropTypes.object.isRequired
  }, {
    group: PropTypes.object.isRequired
  }]).isRequired
}

class Balance extends React.Component {
  goToTransactionsFilteredBy = doc => {
    this.props.filterByDoc(doc)
    this.props.router.push('/transactions')
  }

  componentDidMount () {
    if (flag('resetAccountFilterInBalance')) {
      this.props.dispatch(resetFilterByDoc())
    }
  }

  render () {
    const {t, settingsCollection, breakpoints: { isMobile }} = this.props
    let {accounts, groups} = this.props
    accounts = accounts.data
    groups = groups.data

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

    const balanceLower = getSettings(settingsCollection).notifications.balanceLower.value

    return (
      <div className={styles['balance']}>
        <Topbar>
          <h2>{t('Balance.title')}</h2>
        </Topbar>
        <div className={styles['kpi']}>
          <FigureBlock label={t(trad, {label: label})} total={total} currency='€' coloredPositive coloredNegative signed />
        </div>

        { groups.length !== 0 ? <h3>{t('AccountSwitch.groups')}</h3> : null }
        { groups.length !== 0 ? <Table className={styles['balance-table']}>
          <thead>
            <tr>
              <td className={styles['account_name']}>{t('Balance.account_name')}</td>
              <td className={styles['solde']}>{t('Balance.solde')}</td>
              <td className={styles['bank_name']}>{t('Groups.accounts')}</td>
              {/* extra col to have same alignment as table below */}
              <td className={styles['account_number']} />
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (<BalanceRow
              group={group}
              warningLimit={balanceLower}
              isMobile={isMobile}
              onClick={this.goToTransactionsFilteredBy.bind(null, group)} />))}
          </tbody>
        </Table> : null }

        <h3>{t('AccountSwitch.accounts')}</h3>
        <Table className={styles['balance-table']}>
          <thead>
            <tr>
              <td className={styles['account_name']}>{t('Balance.account_name')}</td>
              <td className={styles['solde']}>{t('Balance.solde')}</td>
              {!isMobile && <td className={styles['bank_name']}>{t('Balance.bank_name')}</td>}
              {!isMobile && <td className={styles['account_number']}>{t('Balance.account_number')}</td>}
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (<BalanceRow
              account={account}
              warningLimit={balanceLower}
              isMobile={isMobile}
              onClick={this.goToTransactionsFilteredBy.bind(null, account)} />))}
          </tbody>
        </Table>

        <CollectLink>
          <Button className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}>
            <Icon icon={plus} className='u-mr-half' />
            {t('Accounts.add-account')}
          </Button>
        </CollectLink>
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
