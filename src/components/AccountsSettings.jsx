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

const renderAccount = account => <AccountLine account={account} />

const AccountLine = ({ account }) =>
  <tr>
    <td className={styles['bnk-table-libelle']}>
      {account.label}
    </td>
    <td className={styles['bnk-table-bank']}>
      {account.institutionLabel}
    </td>
    <td className={styles['bnk-table-account']}>
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

const AccountsTable = ({ accounts, t }) => {
  return accounts ? <Table className={styles['bnk-table-account']}>
    <thead>
      <tr className={styles['coz-table-row']}>
        <td className={styles['bnk-table-libelle']}>
          {t('Accounts.label')}
        </td>
        <td className={styles['bnk-table-bank']}>
          {t('Accounts.bank')}
        </td>
        <td className={styles['bnk-table-account']}>
          {t('Accounts.account')}
        </td>
        <td className={styles['bnk-table-type']}>
          {t('Accounts.type')}
        </td>
        <td className={styles['bnk-table-shared']}>
          {t('Accounts.shared')}
        </td>
        <td className={styles['bnk-table-actions']} />
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

  render ({ t, accounts, getSharingInfo }) {
    const accountBySharingDirection = groupBy(accounts, account => {
      const sharingInfo = getSharingInfo(ACCOUNT_DOCTYPE, account._id)
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

const mapStateToProps = state => ({
  getSharingInfo: (doctype, id) => {
    return getSharingInfo(state, doctype, id)
  }
})

const fetchAccountsSharingInfo = props => {
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
