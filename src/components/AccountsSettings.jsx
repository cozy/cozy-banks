import classNames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import { getSharingInfo } from 'reducers'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import { groupBy } from 'lodash'
import styles from 'styles/accounts'
import { fetchSharingInfo } from 'modules/SharingStatus'

import AccountSharingStatus from 'components/AccountSharingStatus'
import Spinner from 'components/Spinner'
import fetchData from 'components/fetchData'

const AccountsTable = function ({ accounts, t }) {
  return accounts ? <table className={styles['coz-table']}>
    <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-libelle'])}>
        {t('Accounts.label')}
      </th>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-bank'])}>
        {t('Accounts.bank')}
      </th>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-account'])}>
        {t('Accounts.account')}
      </th>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-type'])}>
        {t('Accounts.type')}
      </th>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-shared'])}>
        {t('Accounts.shared')}
      </th>
      <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])} />
    </tr>
    <tbody className={styles['coz-table-body']}>
      { accounts.map(account => (
        <tr className={styles['coz-table-row']}>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
            {account.label}
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-bank'])}>
            {account.institutionLabel}
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-account'])}>
            { account.number }
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-type'])}>
            { account.type }
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-shared'])}>
            { <AccountSharingStatus withText account={account} /> }
          </td>
          <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])} />
        </tr>
      ))}
    </tbody>
  </table> : <p>
    { t("Accounts.no-accounts") }
  </p>
}

class AccountsSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editingGroup: null
    }
  }

  addGroup () {
    this.setState({
      editingGroup: {
        label: '',
        accounts: []
      }
    })
  }

  editGroup (group) {
    this.setState({
      editingGroup: group
    })
  }

  saveGroupChanges (data) {
    if (data._id) {
      this.props.updateGroup(data._id, data)
    } else {
      this.props.createGroup(data)
    }

    this.setState({
      editingGroup: null
    })
  }

  deleteGroup (group) {
    this.props.deleteGroup(group)

    this.setState({
      editingGroup: null
    })
  }

  render (props, state) {
    const { t, accounts } = props

    const accountBySharingDirection = groupBy(accounts, account => {
      const sharingInfo = this.props.getSharingInfo(ACCOUNT_DOCTYPE, account._id)
      const infos = (sharingInfo && sharingInfo.info) || {}
      return !!(!infos.recipients || infos.recipients.length === 0 || infos.owner)
    })

    return (
      <div>
        <h4>
          {t('Accounts.my-accounts')}
        </h4>

        <AccountsTable accounts={accountBySharingDirection[true]} t={t} />

        <p>
          <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup.bind(this)}>
            {t('Accounts.add-account')}
          </button>
        </p>

        <h4>
          {t('Accounts.shared-accounts')}
        </h4>

        <AccountsTable accounts={accountBySharingDirection[false]} t={t} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getSharingInfo: (doctype, id) => {
      return getSharingInfo(state, doctype, id)
    }
  }
}

const fetchAccountsSharingInfo = function (props) {
  const { accounts } = props
  return Promise.all(accounts.map(account => {
    return props.dispatch(fetchSharingInfo(ACCOUNT_DOCTYPE, account._id))
  }))
}

export default (
  connect(mapStateToProps)(
  translate()(
  fetchData(fetchAccountsSharingInfo)(
  AccountsSettings))
))
