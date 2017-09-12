import React from 'react'
import { connect } from 'react-redux'
import { translate, Button, Icon } from 'cozy-ui/react'
import { getSharingInfo } from 'reducers'
import { groupBy } from 'lodash'
import styles from './accounts'
import Table from 'components/Table'
import Loading from 'components/Loading'
import {
  cozyConnect,
  fetchCollection
} from 'redux-cozy-client'
import plus from 'assets/icons/16/plus.svg'
import { withRouter } from 'react-router'

// See comment below about sharings
// import { ACCOUNT_DOCTYPE } from 'doctypes'
// import { fetchSharingInfo } from 'modules/SharingStatus'
// import fetchData from 'components/fetchData'

import AccountSharingStatus from 'components/AccountSharingStatus'

// TODO react-router v4
const _AccountLine = ({account, router}) => (
  <tr onClick={() => router.push(`/settings/accounts/${account.id}`)} className={styles.AcnsStg__accountRow}>
    <td className={styles.AcnsStg__libelle}>
      {account.label}
    </td>
    <td className={styles.AcnsStg__bank}>
      {account.institutionLabel}
    </td>
    <td className={styles.AcnsStg__number}>
      {account.number}
    </td>
    <td className={styles.AcnsStg__type}>
      {account.type}
    </td>
    <td className={styles.AcnsStg__shared}>
      {<AccountSharingStatus withText account={account} />}
    </td>
    <td className={styles.AcnsStg__actions} />
  </tr>
)

const AccountLine = withRouter(_AccountLine)

const renderAccount = account => <AccountLine account={account} />

const AccountsTable = ({ accounts, t }) => (
  <Table className={styles.AcnsStg__accounts}>
    <thead>
      <tr>
        <th className={styles.AcnsStg__libelle}>
          {t('Accounts.label')}
        </th>
        <th className={styles.AcnsStg__bank}>
          {t('Accounts.bank')}
        </th>
        <th className={styles.AcnsStg__number}>
          {t('Accounts.account')}
        </th>
        <th className={styles.AcnsStg__type}>
          {t('Accounts.type')}
        </th>
        <th className={styles.AcnsStg__shared}>
          {t('Accounts.shared')}
        </th>
        <th className={styles.AcnsStg__actions} />
      </tr>
    </thead>
    <tbody>
      {accounts.map(renderAccount)}
    </tbody>
  </Table>
)

const AccountsSettings = ({ t, accounts }) => {
  if (accounts.fetchStatus === 'loading') {
    return <Loading />
  }
  const accountBySharingDirection = groupBy(accounts.data, account => {
    const sharingInfo = false // getSharingInfo(ACCOUNT_DOCTYPE, account._id)
    const infos = (sharingInfo && sharingInfo.info) || {}
    return !!(!infos.recipients || infos.recipients.length === 0 || infos.owner)
  })

  const myAccounts = accountBySharingDirection[true]
  const sharedAccounts = accountBySharingDirection[false]

  return (
    <div>
      <h4>
        {t('Accounts.my-accounts')}
      </h4>

      {myAccounts
        ? <AccountsTable accounts={myAccounts} t={t} />
        : <p>{t('Accounts.no-accounts')}</p>}

      <p>
        <Button theme='regular'>
          <Icon icon={plus} />&nbsp;{t('Accounts.add-account')}
        </Button>
      </p>

      <h4>
        {t('Accounts.shared-accounts')}
      </h4>

      {sharedAccounts
        ? <AccountsTable accounts={sharedAccounts} t={t} />
        : <p>{t('Accounts.no-shared-accounts')}</p>}
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
