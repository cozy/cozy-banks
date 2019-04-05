/* global cozy */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { flowRight as compose, sortBy } from 'lodash'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import { Media, Bd, Img } from 'cozy-ui/react/Media'
import Overlay from 'cozy-ui/react/Overlay'
import Portal from 'cozy-ui/react/Portal'

import AccountSharingStatus from 'components/AccountSharingStatus'
import BarItem from 'components/BarItem'
import Title from 'components/Title'

import {
  filterByDoc,
  getFilteringDoc,
  resetFilterByDoc,
  getFilteredAccounts
} from 'ducks/filters'
import styles from 'ducks/account/AccountSwitch.styl'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { getAccountInstitutionLabel } from 'ducks/account/helpers.js'
import { queryConnect } from 'cozy-client'

import { buildVirtualGroups } from 'ducks/groups/helpers'

const { BarCenter } = cozy.bar

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
      className={cx(
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
                filteringDoc.accounts.raw.filter(accountExists).length
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

const DownArrow = ({ color }) => (
  <Icon
    width={12}
    height={12}
    icon="small-arrow"
    className={cx(styles.DownArrow, styles[`DownArrowColor_${color}`])}
  />
)

DownArrow.propTypes = {
  color: PropTypes.oneOf(['default', 'primary'])
}

const AccountSwitchSelect = ({ accounts, filteringDoc, onClick, t, color }) => (
  <div
    className={cx(
      styles.AccountSwitch__Select,
      styles[`AccountSwitchColor_${color}`]
    )}
    onClick={onClick}
  >
    <Title className={styles.AccountSwitch__SelectText} color={color}>
      {filteringDoc
        ? filteringDoc.length
          ? t('AccountSwitch.some_accounts', {
              count: filteringDoc.length,
              smart_count: accounts.length
            })
          : filteringDoc.shortLabel || filteringDoc.label
        : t('AccountSwitch.all_accounts')}
    </Title>
    <DownArrow color={color} />
  </div>
)

AccountSwitchSelect.propTypes = {
  color: PropTypes.oneOf(['default', 'primary'])
}

AccountSwitchSelect.defaultProps = {
  color: 'default'
}

const AccountSwitchMobile = ({
  filteredAccounts,
  filteringDoc,
  onClick,
  t,
  color
}) => (
  <AccountSwitchSelect
    filteringDoc={filteringDoc}
    onClick={onClick}
    filteringAccounts={filteredAccounts}
    t={t}
    color={color}
  />
)

AccountSwitchMobile.propTypes = {
  filteringDoc: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  filteredAccounts: PropTypes.array.isRequired
}

const AccountSwitchTablet = ({ filteringDoc, onClick }) => (
  <button
    className={cx(styles['account-switch-button-mobile'], {
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
              className={cx({
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
                className={cx({
                  [styles['active']]:
                    filteringDoc && group._id === filteringDoc._id
                })}
              >
                {group.label}
                <span className={styles['account-secondary-info']}>
                  (
                  {t(
                    'AccountSwitch.account_counter',
                    group.accounts.data.filter(
                      account => account && accountExists(account.id)
                    ).length
                  )}
                  )
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
                  className={cx({
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

const barItemStyle = { overflow: 'hidden', paddingRight: '1rem' }

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
      breakpoints: { isMobile },
      small,
      color,
      accounts: accountsCollection,
      groups: groupsCollection
    } = this.props
    const { open } = this.state

    const accounts = accountsCollection.data
    const groups = [
      ...groupsCollection.data,
      ...buildVirtualGroups(accounts)
    ].map(group => ({
      ...group,
      label: group.virtual ? t(`Data.accountTypes.${group.label}`) : group.label
    }))

    if (!accounts || accounts.length === 0) {
      return isMobile ? (
        <BarCenter>
          <BarItem style={barItemStyle}>
            <Title
              className={cx(styles.AccountSwitch__SelectText, styles.disable)}
              color={color}
            >
              {t('Categories.noAccount')}
            </Title>
          </BarItem>
        </BarCenter>
      ) : (
        <Title
          className={cx(styles.AccountSwitch__SelectText, styles.disable)}
          color={color}
        >
          {t('Categories.noAccount')}
        </Title>
      )
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
      <div
        className={cx(
          styles['account-switch'],
          styles[`account-switch_${color}`],
          {
            [styles['AccountSwitch--small']]: small
          }
        )}
      >
        {isMobile ? (
          <BarCenter>
            <BarItem style={barItemStyle}>
              <AccountSwitchSelect
                accounts={accounts}
                filteredAccounts={filteredAccounts}
                filteringDoc={filteringDoc}
                onClick={this.toggle}
                t={t}
                color={color}
              />
            </BarItem>
          </BarCenter>
        ) : (
          <AccountSwitchSelect
            accounts={accounts}
            filteredAccounts={filteredAccounts}
            filteringDoc={filteringDoc}
            onClick={this.toggle}
            color={color}
            t={t}
          />
        )}
        {open && (
          <Portal into="body">
            <Overlay onClick={this.close}>
              <AccountSwitchMenu
                filteringDoc={filteringDoc}
                filterByDoc={closeAfterSelect(filterByDoc)}
                resetFilterByDoc={closeAfterSelect(resetFilterByDoc)}
                close={this.close}
                groups={orderedGroups}
                accounts={accounts}
                accountExists={this.accountExists}
              />
            </Overlay>
          </Portal>
        )}
      </div>
    )
  }
}

AccountSwitch.propTypes = {
  filterByDoc: PropTypes.func.isRequired,
  resetFilterByDoc: PropTypes.func.isRequired,
  filteringDoc: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary'])
}

AccountSwitch.defaultProps = {
  small: false,
  color: 'default'
}

const mapStateToProps = (state, ownProps) => {
  const enhancedState = {
    ...state,
    accounts: ownProps.accounts,
    groups: ownProps.groups
  }
  return {
    filteringDoc: getFilteringDoc(state),
    filteredAccounts: getFilteredAccounts(enhancedState)
  }
}

const mapDispatchToProps = dispatch => ({
  resetFilterByDoc: () => dispatch(resetFilterByDoc()),
  filterByDoc: doc => dispatch(filterByDoc(doc))
})

export default compose(
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' },
    groups: { query: client => client.all(GROUP_DOCTYPE), as: 'groups' }
  }),
  translate(),
  withBreakpoints(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountSwitch)
