import React from 'react'
import { connect } from 'react-redux'
import { translate, Button, Icon } from 'cozy-ui/react'
import { getSharingInfo } from 'reducers'
import { groupBy } from 'lodash'
import styles from 'styles/accounts'
import Table from 'components/Table'
import Loading from 'components/Loading'
import {
  cozyConnect,
  fetchCollection
} from 'redux-cozy-client'
import plus from 'assets/icons/16/plus.svg'

// See comment below about sharings
// import { ACCOUNT_DOCTYPE } from 'doctypes'
// import { fetchSharingInfo } from 'modules/SharingStatus'
// import fetchData from 'components/fetchData'

import AccountSharingStatus from 'components/AccountSharingStatus'

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

const AccountsSettings = ({ t, accounts }) => {
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
        <Button theme='regular'>
          <Icon icon={plus} />&nbsp;{t('Accounts.add-account')}
        </Button>
      </p>

      <h4>
        {t('Accounts.shared-accounts')}
      </h4>

      <AccountsTable accounts={accountBySharingDirection[false]} t={t} />
    </div>
  )
}

const mapDocumentsToProps = ownProps => ({
  accounts: fetchCollection('accounts', 'io.cozy.bank.accounts')
})

const mapStateToProps = state => ({
  getSharingInfo: (doctype, id) => {
    return getSharingInfo(state, doctype, id)
  }
})

// TODO reactivate when we understand how sharings work
// const fetchAccountsSharingInfo = props => {
//   return Promise.resolve([])
  // const { accounts } = props
  // with redux-cozy-client
  // return Promise.all(accounts.data.map(account => {
  //   return props.dispatch(fetchSharingInfo(ACCOUNT_DOCTYPE, account._id))
  // }))
// }

export default (
  cozyConnect(mapDocumentsToProps)(
  connect(mapStateToProps)(
  translate()(
  AccountsSettings))
))
