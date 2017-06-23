import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

import AccountSharingStatus from 'components/AccountSharingStatus'
import { Media, Bd, Img } from 'components/Media'
import { indexAccounts, fetchAccounts, indexAccountGroups, fetchAccountGroups } from 'actions'
import { getGroups, getAccounts } from 'selectors'
import { filterByAccount, filterByGroup, getAccountOrGroup, resetAccountOrGroup } from 'ducks/filteredOperations'
import styles from 'styles/accountSwitch'

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
    const { t, accounts, groups, accountOrGroup, resetAccountOrGroup, filterByAccount, filterByGroup } = this.props
    const { isFetching, open } = this.state

    return (
      <div className={styles['account-switch']}>
        <button className={classNames(styles['account-switch-button'], {[styles['active']]: open})} onClick={this.toggle.bind(this)}>
          { isFetching
            ? `${t('Loading.loading')}...`
            : accountOrGroup
            ? <div>
              <div className={styles['account-name']}>
                { accountOrGroup.label } { <AccountSharingStatus account={accountOrGroup} /> }
              </div>
              <div className={styles['account-num']}>
                { accountOrGroup.number && 'n°' + accountOrGroup.number }
                { accountOrGroup.accounts && t('AccountSwitch.account_counter', accountOrGroup.accounts.length) }
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
                <button onClick={() => { resetAccountOrGroup() }} className={classNames({[styles['active']]: accountOrGroup === undefined})}>
                  {t('AccountSwitch.all_accounts')}
                  <span className={styles['account-count']}>
                    ({t('AccountSwitch.account_counter', accounts.length)})
                  </span>
                </button>
              </li>
              { groups.map(group => (
                <li>
                  <button
                    onClick={() => { filterByGroup(group) }}
                    className={classNames({[styles['active']]: accountOrGroup && group._id === accountOrGroup._id})}>
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
                  <button
                    onClick={() => { filterByAccount(account) }}
                    className={classNames({[styles['active']]: accountOrGroup && account._id === accountOrGroup._id})}>
                    <Media>
                      <Bd>
                        { account.label } - { account.institutionLabel }
                      </Bd>
                      <Img>
                        <AccountSharingStatus tooltip account={account} />
                      </Img>
                    </Media>
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
  accounts: getAccounts(state),
  groups: getGroups(state),
  accountOrGroup: getAccountOrGroup(state)
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
  resetAccountOrGroup: () => dispatch(resetAccountOrGroup()),
  filterByAccount: account => dispatch(filterByAccount(account)),
  filterByGroup: group => dispatch(filterByGroup(group))
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AccountSwitch))
