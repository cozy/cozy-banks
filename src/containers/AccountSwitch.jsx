import styles from '../styles/accountSwitch'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from '../lib/I18n'
import { connect } from 'react-redux'

import {
  indexAccounts,
  fetchAccounts,
  selectAccounts
}
from '../actions'

class AccountSwitch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetching: true,
      open: false
    }

    props.fetchAccounts()
      .then(() => {
        this.setState({
          isFetching: false
        })
      })
  }
  switchAccount (account) {
    // We only ever want one account to be selected
    (this.props.selectedAccount && this.props.selectedAccount._id === account._id) ? this.props.selectAccounts([]) : this.props.selectAccounts([account._id])
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
    const { accounts, selectedAccount } = this.props
    const { isFetching, open } = this.state

    return (
      <div className={styles['account-switch']}>
        <button className={classNames(styles['account-switch-button'], {[styles['active']]: open})} onFocus={this.toggle.bind(this, true)} onBlur={this.toggle.bind(this, false)}>
          { isFetching
            ? 'Chargement...'
            : selectedAccount !== null
            ? <div>
              <div className={styles['account-name']}>
                { selectedAccount.account + ' ' + selectedAccount.bank }
              </div>
              <div className={styles['account-num']}>
                n° { selectedAccount.number }
              </div>
            </div>
            : <div>
              <div className={styles['account-name']}>
                Tous les comptes
              </div>
            </div>
          }
        </button>
        { open &&
          <div className={styles['account-switch-menu']}>
            <h4>
              Comptes
            </h4>
            <ul>
              { accounts.map(account => (
                <li onClick={() => { this.switchAccount(account) }} className={classNames({[styles['active']]: selectedAccount && account._id === selectedAccount._id})}>
                  { account.account + ' ' + account.bank }
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
  selectedAccount: state.selectedAccounts.length > 0 ? state.accounts.find(account => (account._id === state.selectedAccounts[0])) : null
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAccounts: async () => {
    const mangoIndex = await dispatch(indexAccounts())
    return dispatch(fetchAccounts(mangoIndex))
  },
  selectAccounts: (ids) => {
    dispatch(selectAccounts(ids))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  translate()(AccountSwitch)
)
