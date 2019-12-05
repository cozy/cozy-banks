import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { translate } from 'cozy-ui/react'
import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { withBreakpoints } from 'cozy-ui/react'
import { groupBy, flowRight as compose, sortBy } from 'lodash'
import Table from 'components/Table'
import Loading from 'components/Loading'
import { queryConnect } from 'cozy-client'
import plus from 'assets/icons/16/plus.svg'
import styles from 'ducks/settings/AccountsSettings.styl'
import btnStyles from 'styles/buttons.styl'
import AddAccountLink from 'ducks/settings/AddAccountLink'
import cx from 'classnames'
import {
  getAccountInstitutionLabel,
  getAccountType,
  getAccountOwners
} from 'ducks/account/helpers'
import { isCollectionLoading, hasBeenLoaded } from 'ducks/client/utils'
import { Contact } from 'cozy-doctypes'
import flag from 'cozy-flags'

import { accountsConn, APP_DOCTYPE } from 'doctypes'

// See comment below about sharings
// import { ACCOUNT_DOCTYPE } from 'doctypes'
// import { fetchSharingInfo } from 'modules/SharingStatus'
// import fetchData from 'components/fetchData'

import AccountSharingStatus from 'components/AccountSharingStatus'

// TODO react-router v4
const _AccountLine = ({ account, router, t, breakpoints: { isMobile } }) => (
  <tr
    key={account.id}
    onClick={() => router.push(`/settings/accounts/${account.id}`)}
    className={styles.AcnsStg__accountRow}
  >
    <td className={styles.AcnsStg__libelle}>
      <div className={styles.AcnsStg__libelleInner}>
        <div>{account.shortLabel || account.label}</div>
        {isMobile ? (
          <>
            <div className="u-ph-half">-</div>
            <div>
              {getAccountOwners(account)
                .map(Contact.getDisplayName)
                .join(' - ')}
            </div>
          </>
        ) : null}
      </div>
    </td>
    <td className={styles.AcnsStg__bank}>
      {getAccountInstitutionLabel(account)}
    </td>
    <td className={styles.AcnsStg__number}>{account.number}</td>
    <td className={styles.AcnsStg__type}>
      {t(`Data.accountTypes.${getAccountType(account)}`, {
        _: t('Data.accountTypes.Other')
      })}
    </td>
    {flag('settings.show-accounts-owners') ? (
      <td className={styles.AcnsStg__owner}>
        {getAccountOwners(account)
          .map(Contact.getDisplayName)
          .join(' - ')}
      </td>
    ) : (
      <td className={styles.AcnsStg__shared}>
        <AccountSharingStatus withText account={account} />
      </td>
    )}
    <td className={styles.AcnsStg__actions} />
  </tr>
)

const AccountLine = compose(
  translate(),
  withRouter,
  withBreakpoints()
)(_AccountLine)

const renderAccount = account => (
  <AccountLine account={account} key={account._id} />
)

const AccountsTable = ({ accounts, t }) => {
  const showAccountsOwners = flag('settings.show-accounts-owners')

  return (
    <Table className={styles.AcnsStg__accounts}>
      <thead>
        <tr>
          <th className={styles.AcnsStg__libelle}>{t('Accounts.label')}</th>
          <th className={styles.AcnsStg__bank}>{t('Accounts.bank')}</th>
          <th className={styles.AcnsStg__number}>{t('Accounts.account')}</th>
          <th className={styles.AcnsStg__type}>{t('Accounts.type')}</th>
          <th
            className={
              showAccountsOwners
                ? styles.AcnsStg__owner
                : styles.AcnsStg__shared
            }
          >
            {showAccountsOwners ? t('Accounts.owner') : t('Accounts.shared')}
          </th>
          <th className={styles.AcnsStg__actions} />
        </tr>
      </thead>
      <tbody>{accounts.map(renderAccount)}</tbody>
    </Table>
  )
}

class AccountsSettings extends Component {
  render() {
    const { t, accountsCollection } = this.props

    if (
      isCollectionLoading(accountsCollection) &&
      !hasBeenLoaded(accountsCollection)
    ) {
      return <Loading />
    }

    const sortedAccounts = sortBy(accountsCollection.data, [
      'institutionLabel',
      'label'
    ])
    const accountBySharingDirection = groupBy(sortedAccounts, account => {
      return account.shared === undefined
    })

    const myAccounts = accountBySharingDirection[true]
    const sharedAccounts = accountBySharingDirection[false]

    return (
      <div>
        <AddAccountLink>
          <Button
            className={cx(btnStyles['btn--no-outline'], 'u-pb-1')}
            icon={<Icon icon={plus} className="u-mr-half" />}
            label={t('Accounts.add_bank')}
          />
        </AddAccountLink>
        {myAccounts ? (
          <AccountsTable accounts={myAccounts} t={t} />
        ) : (
          <p>{t('Accounts.no-accounts')}</p>
        )}

        <h4>{t('Accounts.shared-accounts')}</h4>

        {sharedAccounts ? (
          <AccountsTable accounts={sharedAccounts} t={t} />
        ) : (
          <p>{t('Accounts.no-shared-accounts')}</p>
        )}
      </div>
    )
  }
}

// TODO reactivate when we understand how sharings work
// const fetchAccountsSharingInfo = props => {
//   return Promise.resolve([])
// const { accounts } = props
// with cozy-client
// return Promise.all(accounts.data.map(account => {
//   return props.dispatch(fetchSharingInfo(ACCOUNT_DOCTYPE, account._id))
// }))
// }

export default compose(
  queryConnect({
    accountsCollection: accountsConn,
    apps: { query: client => client.all(APP_DOCTYPE), as: 'apps' }
  }),
  translate()
)(AccountsSettings)
