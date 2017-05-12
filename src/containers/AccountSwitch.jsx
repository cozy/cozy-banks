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
      isFetching: true
    }

    props.fetchAccounts()
      .then(() => {
        if (this.props.accounts.length > 0) this.switchAccount(this.props.accounts[0])
        this.setState({
          isFetching: false,
        })
      })
  }
  switchAccount (account) {
    this.props.selectAccounts([account._id]);
  }
  render () {

    const { accounts, selectedAccount } = this.props
    const { isFetching } = this.state

    if (isFetching) return ''

    return (
      <div className={styles['account-switch']}>
        <div className={styles['account-switch-button']}>
          { selectedAccount !== null
            ?
            <div>
              <h3>
                { selectedAccount.bank + ' ' + selectedAccount.account }
              </h3>
              <span>
                n° { selectedAccount.number }
              </span>
            </div>
            :
            '-'
          }
        </div>
        <div className={styles['account-switch-menu']}>
          <h4>
            Comptes
          </h4>
          <ul>
            { accounts.map(account => (
            <li onClick={() => {this.switchAccount(account)}} className={classNames({[styles['active']]: selectedAccount && account._id === selectedAccount._id})}>
              { account.bank + ' ' + account.account }
            </li>
            )) }
          </ul>
        </div>
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
