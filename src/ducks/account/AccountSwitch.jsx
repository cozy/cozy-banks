/* global cozy */

import { flowRight as compose, sortBy } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import { cozyConnect, fetchCollection } from 'cozy-client'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Overlay from 'cozy-ui/react/Overlay'
import { Media, Bd, Img } from 'cozy-ui/react/Media'

import AccountSharingStatus from 'components/AccountSharingStatus'
import { filterByDoc, getFilteringDoc, resetFilterByDoc } from 'ducks/filters'
import styles from './AccountSwitch.styl'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { getAccountInstitutionLabel } from './helpers.js'

const { BarRight } = cozy.bar

const isLoading = function (collection) {
  return collection.fetchStatus === 'pending' || collection.fetchStatus === 'loading'
}

const AccountSwitchDesktop = translate()(
  ({ isFetching, isOpen, filteringDoc, accounts, t, toggle, accountExists }) => (
    <button className={classNames(styles['account-switch-button'], {[styles['active']]: isOpen}, 'coz-desktop')} onClick={toggle}>
      {isFetching
        ? `${t('Loading.loading')}`
        : filteringDoc
          ? <div>
            <div className={styles['account-name']}>
              {filteringDoc.shortLabel || filteringDoc.label} {<AccountSharingStatus account={filteringDoc} />}
            </div>
            <div className={styles['account-num']}>
              {filteringDoc.number && 'n°' + filteringDoc.number}
              {filteringDoc.accounts && t('AccountSwitch.account_counter', filteringDoc.accounts.filter(accountExists).length)}
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

AccountSwitchDesktop.propTypes = {
  filteringDoc: PropTypes.object
}

const AccountSwitchMobile = ({filteringDoc, onClick}) => (
  <button
    className={classNames(
      styles['account-switch-button-mobile'],
      {[styles['active']]: filteringDoc}
    )}
    onClick={onClick} />
)

AccountSwitchMobile.propTypes = {
  filteringDoc: PropTypes.object
}

const AccountSwitchMenu = translate()(({ accounts, groups, filteringDoc, filterByDoc, resetFilterByDoc, t, accountExists }) => (
  <div className={styles['account-switch-menu-content']}>
    <div className={styles['account-switch-menu']}>
      <h4>
        {t('AccountSwitch.groups')}
      </h4>
      <ul>
        <li>
          <button onClick={() => { resetFilterByDoc() }} className={classNames({[styles['active']]: filteringDoc === undefined})}>
            {t('AccountSwitch.all_accounts')}
            <span className={styles['account-secondary-info']}>
              ({t('AccountSwitch.account_counter', accounts.length)})
            </span>
          </button>
        </li>
        {groups.map(group => (
          <li>
            <button
              onClick={() => { filterByDoc(group) }}
              className={classNames({[styles['active']]: filteringDoc && group._id === filteringDoc._id})}>
              {group.label}
              <span className={styles['account-secondary-info']}>
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
              onClick={() => { filterByDoc(account) }}
              className={classNames({[styles['active']]: filteringDoc && account._id === filteringDoc._id})}>
              <Media>
                <Bd>
                  {account.shortLabel || account.label}<span className={styles['account-secondary-info']}>- {getAccountInstitutionLabel(account)}</span>
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

AccountSwitchMenu.propTypes = {
  filterByDoc: PropTypes.func.isRequired,
  resetFilterByDoc: PropTypes.func.isRequired,
  filteringDoc: PropTypes.object
}

// Note that everything is set up to be able to combine filters (even the redux store).
// It's only limited to one filter in a few places, because the UI can only accomodate one right now.
class AccountSwitch extends Component {
  state = {
    open: false
  }
  close = () => {
    if (this.state.open) {
      this.setState({ open: false })
    }
  }

  toggle = () => {
    let newState = !this.state.open
    this.setState({
      open: newState
    })
  }

  accountExists = accountId => {
    const accounts = this.props.accounts.data
    return accounts.find(account => account.id === accountId)
  }

  render () {
    const { filteringDoc, filterByDoc, resetFilterByDoc, breakpoints: { isMobile, isTablet, isDesktop } } = this.props
    const { open } = this.state
    let { accounts, groups } = this.props
    const isFetching = isLoading(accounts) || isLoading(groups)
    accounts = accounts.data
    groups = groups.data

    if (!accounts || accounts.length === 0) {
      return
    }

    const closeAfterSelect = selection => param => {
      selection(param)
      this.close()
    }

    // It seems there is a bug in cozy-client when we delete a document
    // The document is removed in the store, but still referenced in the collection
    // So we may get an undefined group. We filter it before sorting
    const orderedGroups = sortBy(groups.filter(Boolean), x => x.label.toLowerCase())
    return (
      <div className={styles['account-switch']}>
        {isMobile && <BarRight>
          <AccountSwitchMobile filteringDoc={filteringDoc} onClick={this.toggle} />
        </BarRight>}
        {isTablet && <AccountSwitchMobile filteringDoc={filteringDoc} onClick={this.toggle} />}
        {isDesktop && <AccountSwitchDesktop
          isFetching={isFetching}
          isOpen={open}
          filteringDoc={filteringDoc}
          accounts={accounts}
          accountExists={this.accountExists}
          toggle={this.toggle} />}
        {open && <Overlay className='coz-tablet' onClick={this.close} />}
        {open &&
          <AccountSwitchMenu
            filteringDoc={filteringDoc}
            filterByDoc={closeAfterSelect(filterByDoc)}
            resetFilterByDoc={closeAfterSelect(resetFilterByDoc)}
            groups={orderedGroups}
            accounts={accounts}
            accountExists={this.accountExists}
          />}
      </div>
    )
  }
}

AccountSwitch.propTypes = {
  filterByDoc: PropTypes.func.isRequired,
  resetFilterByDoc: PropTypes.func.isRequired,
  filteringDoc: PropTypes.object
}

const mapStateToProps = state => ({
  filteringDoc: getFilteringDoc(state)
})

const mapDispatchToProps = dispatch => ({
  resetFilterByDoc: () => dispatch(resetFilterByDoc()),
  filterByDoc: doc => dispatch(filterByDoc(doc))
})

const mapDocumentsToProps = ownProps => ({
  accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
  groups: fetchCollection('groups', GROUP_DOCTYPE)
})

export default compose(
  cozyConnect(mapDocumentsToProps),
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  withBreakpoints()
)(AccountSwitch)
