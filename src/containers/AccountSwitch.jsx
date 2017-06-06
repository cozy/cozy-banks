import styles from 'styles/accountSwitch'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from 'lib/I18n'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  indexAccounts,
  fetchAccounts,
  indexAccountGroups,
  fetchAccountGroups,
  filterAccounts,
  filterGroups
}
from 'actions'

// Note that everything is set up to be abble to combine filters (even the redux store). It's only limited to one filter in a few places, because the UI can only accomodate one right now.
class AccountSwitch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetching: true,
      open: false
    }

    props.fetchAccounts()
      .then(() => {
        return this.props.fetchGroups()
      })
      .then(() => {
        this.setState({
          isFetching: false
        })
      })

    document.addEventListener('click', this.onClickOutside.bind(this))
    this.lastOpenEvent = null
  }
  switchAccount (accountOrGroup, isGroup) {
    if (accountOrGroup === null) {
      this.props.filterGroups([])
      this.props.filterAccounts([])
    } else {
      if (isGroup) this.props.filterGroups([accountOrGroup._id])
      else this.props.filterAccounts([accountOrGroup._id])
    }
  }
  onClickOutside (e) {
    // the event that trigered the menu open propagates and eventually ends up here, but in that case we don't wnt to close the menu. So if it's the same event, we just ignore it.
    if (e === this.lastOpenEvent) return

    this.setState({
      open: false
    })
  }
  toggle (e) {
    let newState = !this.state.open

    if (newState) this.lastOpenEvent = e

    this.setState({
      open: newState
    })
  }
  render () {
    const { t, accounts, groups } = this.props
    let { selectedAccount } = this.props
    const { isFetching, open } = this.state

    if (selectedAccount !== null) {
      // convert the selected account id into an account / group for the display
      let idWithoutDoctype = selectedAccount.substring(selectedAccount.indexOf(':') + 1)
      selectedAccount = accounts.find(account => (account._id) === idWithoutDoctype) || groups.find(group => (group._id) === idWithoutDoctype)
    }

    return (
      <div className={styles['account-switch']}>
        <button className={classNames(styles['account-switch-button'], {[styles['active']]: open})} onClick={this.toggle.bind(this)}>
          { isFetching
            ? `${t('Loading.loading')}...`
            : selectedAccount !== null
            ? <div>
              <div className={styles['account-name']}>
                { selectedAccount.label }
              </div>
              <div className={styles['account-num']}>
                { selectedAccount.number && 'n°' + selectedAccount.number }
                { selectedAccount.accounts && t('AccountSwitch.account_counter', selectedAccount.accounts.length) }
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
        { open &&
          <div className={styles['account-switch-menu']}>
            <h4>
              {t('AccountSwitch.groups')}
            </h4>
            <ul>
              <li>
                <button onClick={() => { this.switchAccount(null, true) }} className={classNames({[styles['active']]: selectedAccount === null})}>
                  {t('AccountSwitch.all_accounts')}
                  <span className={styles['account-count']}>
                    ({t('AccountSwitch.account_counter', accounts.length)})
                  </span>
                </button>
              </li>
              { groups.map(group => (
                <li>
                  <button onClick={() => { this.switchAccount(group, true) }} className={classNames({[styles['active']]: selectedAccount && group._id === selectedAccount._id})}>
                    { group.label }
                    <span className={styles['account-count']}>
                      ({t('AccountSwitch.account_counter', group.accounts.length)})
                    </span>
                  </button>
                </li>
              )) }
            </ul>
            <Link to={'/settings/groups'}>
              {t('AccountSwitch.manage_groups')}
            </Link>

            <hr />

            <h4>
              {t('AccountSwitch.accounts')}
            </h4>
            <ul>
              { accounts.map(account => (
                <li>
                  <button onClick={() => { this.switchAccount(account, false) }} className={classNames({[styles['active']]: selectedAccount && account._id === selectedAccount._id})}>
                    { account.label + ' ' + account.institutionLabel }
                  </button>
                </li>
              )) }
            </ul>
            <Link to={'/settings/accounts'}>
              {t('AccountSwitch.manage_accounts')}
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accounts: state.accounts,
  groups: state.groups,
  selectedAccount: (state.accountFilters.length > 0) ? state.accountFilters[0] : null
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAccounts: async () => {
    const mangoIndex = await dispatch(indexAccounts())
    return dispatch(fetchAccounts(mangoIndex))
  },
  fetchGroups: async () => {
    const mangoIndex = await dispatch(indexAccountGroups())
    return dispatch(fetchAccountGroups(mangoIndex))
  },
  filterAccounts: (ids) => {
    dispatch(filterAccounts(ids))
  },
  filterGroups: (ids) => {
    dispatch(filterGroups(ids))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  translate()(AccountSwitch)
)
