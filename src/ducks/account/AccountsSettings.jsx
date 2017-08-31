import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import { getSharingInfo } from 'reducers'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import { groupBy } from 'lodash'
import styles from 'styles/accounts'
import { fetchSharingInfo } from 'modules/SharingStatus'
import AccountSharingStatus from 'components/AccountSharingStatus'
import fetchData from 'components/fetchData'
import Table from 'components/Table'
import Loading from 'components/Loading'
import {
  cozyConnect,
  fetchCollection
} from 'redux-cozy-client'

const AccountLine = ({account}) =>
  <tr>
    <td className={styles['bnk-table-libelle']}>
      <a href={`#/settings/accounts/${account.id}`}>
        {account.label}
      </a>
    </td>
    <td className={styles['bnk-table-bank']}>
      {account.institutionLabel}
    </td>
    <td className={styles['bnk-table-number']}>
      {account.number}
    </td>
    <td className={styles['bnk-table-type']}>
      {account.type}
    </td>
    <td className={styles['bnk-table-shared']}>
      {<AccountSharingStatus withText account={account} />}
    </td>
    <td className={styles['bnk-table-actions']} />
  </tr>

const renderAccount = account => <AccountLine account={account} />

const AccountsTable = ({ accounts, t }) => {
  return accounts ? <Table className={styles['bnk-table-account']}>
    <thead>
      <tr className={styles['coz-table-row']}>
        <th className={styles['bnk-table-libelle']}>
          {t('Accounts.label')}
        </th>
        <th className={styles['bnk-table-bank']}>
          {t('Accounts.bank')}
        </th>
        <th className={styles['bnk-table-number']}>
          {t('Accounts.account')}
        </th>
        <th className={styles['bnk-table-type']}>
          {t('Accounts.type')}
        </th>
        <th className={styles['bnk-table-shared']}>
          {t('Accounts.shared')}
        </th>
        <th className={styles['bnk-table-actions']} />
      </tr>
    </thead>
    <tbody>
      {accounts.map(renderAccount)}
    </tbody>
  </Table> : <p>
    {t('Accounts.no-accounts')}
  </p>
}

class AccountsSettings extends Component {
  state = {
    editingGroup: null
  }

  addGroup = () => {
    this.setState({
      editingGroup: {
        label: '',
        accounts: []
      }
    })
  }

  editGroup = group => {
    this.setState({
      editingGroup: group
    })
  }

  saveGroupChanges = data => {
    if (data._id) {
      this.props.updateGroup(data._id, data)
    } else {
      this.props.createGroup(data)
    }

    this.setState({
      editingGroup: null
    })
  }

  deleteGroup = group => {
    this.props.deleteGroup(group)

    this.setState({
      editingGroup: null
    })
  }

  render ({ t, accounts }) {
    if (accounts.fetchStatus === 'loading') {
      return <Loading />
    }
    const accountBySharingDirection = groupBy(accounts.data, account => {
      const sharingInfo = false // getSharingInfo(ACCOUNT_DOCTYPE, account._id)
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
          <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup}>
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

const mapDocumentsToProps = ownProps => ({
  accounts: fetchCollection('accounts', 'io.cozy.bank.accounts')
})

const mapStateToProps = state => ({
  getSharingInfo: (doctype, id) => {
    return getSharingInfo(state, doctype, id)
  }
})

const fetchAccountsSharingInfo = props => {
  const { accounts } = props
  return Promise.resolve([])
  return Promise.all(accounts.data.map(account => {
    return props.dispatch(fetchSharingInfo(ACCOUNT_DOCTYPE, account._id))
  }))
}

export default (
  cozyConnect(mapDocumentsToProps)(
  connect(mapStateToProps)(
  translate()(
  fetchData(fetchAccountsSharingInfo)(
  AccountsSettings))
)))
