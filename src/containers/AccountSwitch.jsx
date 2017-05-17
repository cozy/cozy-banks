import styles from '../styles/accountSwitch'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from '../lib/I18n'
import { connect } from 'react-redux'

import {
  indexAccounts,
  fetchAccounts,
  indexAccountGroups,
  fetchAccountGroups,
  filterAccounts,
  filterGroups
}
from '../actions'

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
  }
  switchAccount (accountOrGroup, isGroup) {
    let fn = isGroup ? this.props.filterGroups : this.props.filterAccounts

    if (this.props.selectedAccount && this.props.selectedAccount.indexOf(accountOrGroup._id) >= 0) fn([])
    else fn([accountOrGroup._id])
  }
  toggle (state) {
    // You would think that opening and closing the menu is easy, but it's fucking not. It needs to be closed when the user does pretty much anything except clicking inside the menu.
    // The react-nclickoutside lib doesn't work with preact. Listening for events at the document level doesn't really work either because it's impossible to predict in what order the handlers are going to be called.
    // So here we are with a method that is called on focus / on blur. The problem is, even a click *inside* the menu is going to trigger the blur event, and close it -- and somehow the click event gets lost in translation. So we have to introduce a small delay before actually removing the menu from the DOM.
    let delay = state ? 0 : 150
    setTimeout(() => {
      this.setState({open: state})
    }, delay)
  }
  render () {
    const { t, accounts, groups } = this.props
    let { selectedAccount } = this.props
    const { isFetching, open } = this.state

    if (selectedAccount !== null){
      // convert the selected account id into an account / group for the display
      let idWithoutDoctype = selectedAccount.substring(selectedAccount.indexOf(':') + 1)
      selectedAccount = accounts.find(account => (account._id) === idWithoutDoctype) || groups.find(group => (group._id) === idWithoutDoctype)
    }

    return (
      <div className={styles['account-switch']}>
        <button className={classNames(styles['account-switch-button'], {[styles['active']]: open})} onFocus={this.toggle.bind(this, true)} onBlur={this.toggle.bind(this, false)}>
          { isFetching
            ? `${t('Loading.loading')}...`
            : selectedAccount !== null
            ? <div>
              <div className={styles['account-name']}>
                { selectedAccount.label }
              </div>
              { selectedAccount.number && (<div className={styles['account-num']}>
                n° { selectedAccount.number }
              </div>)}
            </div>
            : <div>
              <div className={styles['account-name']}>
                {t('AccountSwitch.all_accounts')}
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
              { groups.map(group => (
                <li onClick={() => { this.switchAccount(group, true) }} className={classNames({[styles['active']]: selectedAccount && group._id === selectedAccount._id})}>
                  { group.label }
                  <span className={styles['account-count']}>
                    ({ group.accounts.length } comptes)
                  </span>
                </li>
              )) }
            </ul>

            <hr />

            <h4>
              {t('AccountSwitch.accounts')}
            </h4>
            <ul>
              { accounts.map(account => (
                <li onClick={() => { this.switchAccount(account, false) }} className={classNames({[styles['active']]: selectedAccount && account._id === selectedAccount._id})}>
                  { account.label + ' ' + account.institutionLabel }
                </li>
              )) }
            </ul>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accounts: state.accounts,
  groups: state.groups,
  selectedAccount: (state.accountFilters.length > 0) ? state.accountFilters[0]  : null,
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
