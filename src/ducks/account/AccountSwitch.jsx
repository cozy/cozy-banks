/* global cozy */

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import AccountSharingStatus from 'components/AccountSharingStatus'
import { Media, Bd, Img } from 'components/Media'
import { filterByAccount, filterByGroup, getAccountOrGroup, resetAccountOrGroup } from 'ducks/filters'
import { Backdrop } from 'components/Menu'
import styles from './AccountSwitch.styl'
import { flowRight as compose } from 'lodash'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { cozyConnect, fetchCollection } from 'cozy-client'
import breakpointsAware from 'utils/breakpointsAware'

const { BarRight } = cozy.bar

const isLoading = function (collection) {
  return collection.fetchStatus === 'pending' || collection.fetchStatus === 'loading'
}

const AccountSwitchDesktop = translate()(
  ({ isFetching, isOpen, accountOrGroup, accounts, t, toggle, accountExists }) => (
    <button className={classNames(styles['account-switch-button'], {[styles['active']]: isOpen}, 'coz-desktop')} onClick={toggle}>
      {isFetching
        ? `${t('Loading.loading')}`
        : accountOrGroup
          ? <div>
            <div className={styles['account-name']}>
              {accountOrGroup.shortLabel || accountOrGroup.label} {<AccountSharingStatus account={accountOrGroup} />}
            </div>
            <div className={styles['account-num']}>
              {accountOrGroup.number && 'n°' + accountOrGroup.number}
              {accountOrGroup.accounts && t('AccountSwitch.account_counter', accountOrGroup.accounts.filter(accountExists).length)}
            </div>
          </div>
          : <div>
            <div className={styles['account-name']}>
              {t('AccountSwitch.all_accounts')}
              <div className={styles['account-num']}>
                {t('AccountSwitch.account_counter', accounts.length)}
              </div>
            </div>
          </div>
      }
    </button>
  )
)

const AccountSwitchMobile = ({accountOrGroup, onClick}) => (
  <button
    className={classNames(
      styles['account-switch-button-mobile'],
      {[styles['active']]: accountOrGroup}
    )}
    onClick={onClick} />
)

const AccountSwitchMenu = translate()(({ accounts, groups, accountOrGroup, resetAccountOrGroup, filterByGroup, filterByAccount, t, accountExists }) => (
  <div className={styles['account-switch-menu-content']}>
    <div className={styles['account-switch-menu']}>
      <h4>
        {t('AccountSwitch.groups')}
      </h4>
      <ul>
        <li>
          <button onClick={() => { resetAccountOrGroup() }} className={classNames({[styles['active']]: accountOrGroup === undefined})}>
            {t('AccountSwitch.all_accounts')}
            <span className={styles['account-count']}>
              ({t('AccountSwitch.account_counter', accounts.length)})
            </span>
          </button>
        </li>
        {groups.map(group => (
          <li>
            <button
              onClick={() => { filterByGroup(group) }}
              className={classNames({[styles['active']]: accountOrGroup && group._id === accountOrGroup._id})}>
              {group.label}
              <span className={styles['account-count']}>
                ({t('AccountSwitch.account_counter', group.accounts.filter(accountExists).length)})
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Link to={'/settings/groups'}>
        {t('AccountSwitch.manage_groups')}
      </Link>

      <hr />

      <h4>
        {t('AccountSwitch.accounts')}
      </h4>
      <ul>
        {accounts.map(account => (
          <li>
            <button
              onClick={() => { filterByAccount(account) }}
              className={classNames({[styles['active']]: accountOrGroup && account._id === accountOrGroup._id})}>
              <Media>
                <Bd>
                  {account.shortLabel || account.label} - {account.institutionLabel}
                </Bd>
                <Img>
                  <AccountSharingStatus tooltip account={account} />
                </Img>
              </Media>
            </button>
          </li>
        ))}
      </ul>
      <Link to={'/settings/accounts'}>
        {t('AccountSwitch.manage_accounts')}
      </Link>
    </div>
  </div>
))

// Note that everything is set up to be able to combine filters (even the redux store).
// It's only limited to one filter in a few places, because the UI can only accomodate one right now.
class AccountSwitch extends Component {
  state = {
    open: false
  }

  onClickOutside = e => {
    // the event that trigered the menu open propagates and eventually ends up here,
    // but in that case we don't wnt to close the menu. So if it's the same event,
    // we just ignore it.
    if (this.lastOpenEvent && (e === this.lastOpenEvent || e === this.lastOpenEvent.nativeEvent)) return
    this.close()
  }

  close = () => {
    if (this.state.open) {
      this.setState({ open: false })
    }
  }

  toggle = e => {
    let newState = !this.state.open

    if (newState) this.lastOpenEvent = e

    this.setState({
      open: newState
    })
  }

  async componentDidMount () {
    document.addEventListener('click', this.onClickOutside)
    this.lastOpenEvent = null
  }

  accountExists = accountId => {
    const accounts = this.props.accounts.data
    return accounts.find(account => account.id === accountId)
  }

  render () {
    const { accountOrGroup, resetAccountOrGroup, filterByAccount, filterByGroup, breakpoints } = this.props
    const { open } = this.state
    let { accounts, groups } = this.props
    const isFetching = isLoading(accounts) || isLoading(groups)
    accounts = accounts.data
    groups = groups.data

    if (!accounts || accounts.length === 0) {
      return
    }

    return (
      <div className={styles['account-switch']}>
        {breakpoints.isMobile
          ? <BarRight>
            <AccountSwitchMobile accountOrGroup={accountOrGroup} onClick={this.toggle} />
          </BarRight>
          : <AccountSwitchDesktop
            isFetching={isFetching}
            isOpen={open}
            accountOrGroup={accountOrGroup}
            accounts={accounts}
            accountExists={this.accountExists}
            toggle={this.toggle} />}
        {open && <Backdrop className='coz-mobile' onClose={this.close} />}
        {open &&
          <AccountSwitchMenu
            resetAccountOrGroup={resetAccountOrGroup}
            filterByAccount={filterByAccount}
            filterByGroup={filterByGroup}
            groups={groups}
            accounts={accounts}
            accountExists={this.accountExists}
            accountOrGroup={accountOrGroup} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accountOrGroup: getAccountOrGroup(state)
})

const mapDispatchToProps = dispatch => ({
  resetAccountOrGroup: () => dispatch(resetAccountOrGroup()),
  filterByAccount: account => dispatch(filterByAccount(account)),
  filterByGroup: group => dispatch(filterByGroup(group))
})

const mapDocumentsToProps = ownProps => ({
  accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
  groups: fetchCollection('groups', GROUP_DOCTYPE)
})

export default compose(
  cozyConnect(mapDocumentsToProps),
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  breakpointsAware()
)(AccountSwitch)
