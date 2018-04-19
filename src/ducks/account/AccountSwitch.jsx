/* global cozy */

import { flowRight as compose, sortBy } from 'lodash'
import sumBy from 'lodash/sumBy'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import { cozyConnect, fetchCollection } from 'cozy-client'
import { translate, withBreakpoints, Icon } from 'cozy-ui/react'
import Overlay from 'cozy-ui/react/Overlay'
import { Media, Bd, Img } from 'cozy-ui/react/Media'
import { Figure } from 'components/Figure'
import AccountSharingStatus from 'components/AccountSharingStatus'
import {
  filterByDoc,
  getFilteringDoc,
  resetFilterByDoc,
  getFilteredAccounts
} from 'ducks/filters'
import styles from './AccountSwitch.styl'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { getAccountInstitutionLabel } from './helpers.js'
import { getAllGroups } from 'selectors'

const { BarCenter } = cozy.bar

const isLoading = function(collection) {
  return (
    collection.fetchStatus === 'pending' || collection.fetchStatus === 'loading'
  )
}

const AccountSwitchDesktop = translate()(
  ({
    isFetching,
    isOpen,
    filteringDoc,
    accounts,
    t,
    toggle,
    accountExists
  }) => (
    <button
      className={classNames(
        styles['account-switch-button'],
        { [styles['active']]: isOpen },
        'coz-desktop'
      )}
      onClick={toggle}
    >
      {isFetching ? (
        `${t('Loading.loading')}`
      ) : filteringDoc ? (
        <div>
          <div className={styles['account-name']}>
            {filteringDoc.shortLabel || filteringDoc.label}{' '}
            {<AccountSharingStatus account={filteringDoc} />}
          </div>
          <div className={styles['account-num']}>
            {filteringDoc.number && 'n°' + filteringDoc.number}
            {filteringDoc.accounts &&
              t(
                'AccountSwitch.account_counter',
                filteringDoc.accounts.filter(accountExists).length
              )}
          </div>
        </div>
      ) : (
        <div>
          <div className={styles['account-name']}>
            {t('AccountSwitch.all_accounts')}
            <div className={styles['account-num']}>
              {t('AccountSwitch.account_counter', accounts.length)}
            </div>
          </div>
        </div>
      )}
    </button>
  )
)

AccountSwitchDesktop.propTypes = {
  filteringDoc: PropTypes.object
}

const DownArrow = () => <Icon icon="bottom" />

const AccountSwitchMobile = (
  { filteredAccounts, filteringDoc, onClick },
  { t }
) => (
  <Media style={{ width: '100%' }}>
    <Bd>
      <h3 onClick={onClick}>
        {filteringDoc
          ? filteringDoc.shortLabel || filteringDoc.label
          : t('AccountSwitch.all_accounts')}&nbsp;
        <DownArrow />
      </h3>
    </Bd>
    <Img>
      <Figure
        size="big"
        currency="€"
        decimalNumbers={0}
        coloredPositive={true}
        coloredNegative={true}
        total={sumBy(filteredAccounts, 'balance')}
      />
    </Img>
  </Media>
)

AccountSwitchMobile.propTypes = {
  filteringDoc: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired
}

const AccountSwitchTablet = ({ filteringDoc, onClick }) => (
  <button
    className={classNames(styles['account-switch-button-mobile'], {
      [styles['active']]: filteringDoc
    })}
    onClick={onClick}
  />
)

AccountSwitchTablet.propTypes = {
  filteringDoc: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

const AccountSwitchMenu = translate()(
  ({
    accounts,
    groups,
    filteringDoc,
    filterByDoc,
    resetFilterByDoc,
    t,
    accountExists,
    close
  }) => (
    <div className={styles['account-switch-menu-content']}>
      <div className={styles['account-switch-menu']}>
        <h4>{t('AccountSwitch.groups')}</h4>
        <ul>
          <li>
            <button
              onClick={() => {
                resetFilterByDoc()
              }}
              className={classNames({
                [styles['active']]: filteringDoc === undefined
              })}
            >
              {t('AccountSwitch.all_accounts')}
              <span className={styles['account-secondary-info']}>
                ({t('AccountSwitch.account_counter', accounts.length)})
              </span>
            </button>
          </li>
          {sortBy(groups, 'label').map(group => (
            <li key={group._id}>
              <button
                onClick={() => {
                  filterByDoc(group)
                }}
                className={classNames({
                  [styles['active']]:
                    filteringDoc && group._id === filteringDoc._id
                })}
              >
                {group.label}
                <span className={styles['account-secondary-info']}>
                  ({t(
                    'AccountSwitch.account_counter',
                    group.accounts.filter(accountExists).length
                  )})
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Link to={'/settings/groups'} onClick={close}>
          {t('Groups.manage-groups')}
        </Link>

        <hr />

        <h4>{t('AccountSwitch.accounts')}</h4>
        <ul>
          {sortBy(accounts, ['institutionLabel', 'label']).map(
            (account, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    filterByDoc(account)
                  }}
                  className={classNames({
                    [styles['active']]:
                      filteringDoc && account._id === filteringDoc._id
                  })}
                >
                  <Media>
                    <Bd>
                      {account.shortLabel || account.label}
                      <span className={styles['account-secondary-info']}>
                        - {getAccountInstitutionLabel(account)}
                      </span>
                    </Bd>
                    <Img>
                      <AccountSharingStatus tooltip account={account} />
                    </Img>
                  </Media>
                </button>
              </li>
            )
          )}
        </ul>
        <Link to={'/settings/accounts'} onClick={close}>
          {t('Accounts.manage-accounts')}
        </Link>
      </div>
    </div>
  )
)

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

  render() {
    const {
      t,
      filteringDoc,
      filterByDoc,
      filteredAccounts,
      resetFilterByDoc,
      breakpoints: { isMobile, isTablet, isDesktop }
    } = this.props
    const { open } = this.state
    let { accounts, groups, groupsDocs } = this.props
    const isFetching = isLoading(accounts) || isLoading(groupsDocs)

    accounts = accounts.data
    groups = groups.map(group => ({
      ...group,
      label: group.virtual ? t(`Data.accountTypes.${group.label}`) : group.label
    }))

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
    const orderedGroups = sortBy(groups.filter(Boolean), x =>
      x.label.toLowerCase()
    )
    return (
      <div className={styles['account-switch']}>
        {isMobile && (
          <BarCenter>
            <AccountSwitchMobile
              filteredAccounts={filteredAccounts}
              filteringDoc={filteringDoc}
              onClick={this.toggle}
            />
          </BarCenter>
        )}
        {isTablet && (
          <AccountSwitchTablet
            filteringDoc={filteringDoc}
            onClick={this.toggle}
          />
        )}
        {isDesktop && (
          <AccountSwitchDesktop
            isFetching={isFetching}
            isOpen={open}
            filteringDoc={filteringDoc}
            accounts={accounts}
            accountExists={this.accountExists}
            toggle={this.toggle}
          />
        )}
        {open && <Overlay className="coz-tablet" onClick={this.close} />}
        {open && (
          <AccountSwitchMenu
            filteringDoc={filteringDoc}
            filterByDoc={closeAfterSelect(filterByDoc)}
            resetFilterByDoc={closeAfterSelect(resetFilterByDoc)}
            close={this.close}
            groups={orderedGroups}
            accounts={accounts}
            accountExists={this.accountExists}
          />
        )}
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
  filteringDoc: getFilteringDoc(state),
  groups: getAllGroups(state),
  filteredAccounts: getFilteredAccounts(state)
})

const mapDispatchToProps = dispatch => ({
  resetFilterByDoc: () => dispatch(resetFilterByDoc()),
  filterByDoc: doc => dispatch(filterByDoc(doc))
})

const mapDocumentsToProps = () => ({
  accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
  groupsDocs: fetchCollection('groups', GROUP_DOCTYPE)
})

export default compose(
  cozyConnect(mapDocumentsToProps),
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  withBreakpoints()
)(AccountSwitch)
