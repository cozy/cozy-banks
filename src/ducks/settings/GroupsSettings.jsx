import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { translate, Button, Icon } from 'cozy-ui/react'
import Table from 'components/Table'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { cozyConnect, fetchCollection } from 'cozy-client'
import Loading from 'components/Loading'
import plus from 'assets/icons/16/plus.svg'
import styles from './GroupsSettings.styl'

const isPending = (reduxObj) => {
  return reduxObj.fetchStatus === 'pending'
}

const GroupList = withRouter(translate()(({groups, accounts, t, router}) => {
  return groups.length ? <Table className={styles.GrpsStg__table}>
    <thead>
      <tr>
        <th className={styles.GrpsStg__label}>
          {t('Groups.label')}
        </th>
        <th className={styles.GrpsStg__accounts}>
          {t('Groups.accounts')}
        </th>
      </tr>
    </thead>

    <tbody>
      {groups.map(group => (
        <tr onClick={() => router.push(`/settings/groups/${group._id}`)} className={styles.GrpsStg__row}>
          <td className={styles.GrpsStg__label}>
            {group.label}
          </td>
          <td className={styles.GrpsStg__accounts}>
            {group.accounts
              .map(accountId =>
                accounts.data.find(account => (account._id === accountId))
              ).filter(account => account)
              .map(account => account.label)
              .join(', ')}
          </td>
        </tr>
      ))}
    </tbody>
  </Table> : <p>
    {t('Groups.no-groups')}
  </p>
}))

const Groups = withRouter(class extends Component {
  render ({ t, groups, accounts, router }, { editingGroup }) {
    if (isPending(groups) || isPending(accounts)) {
      return <Loading />
    }
    return (
      <div>
        {groups.fetchStatus === 'loading'
          ? <Loading />
          : <GroupList accounts={accounts} groups={groups.data.filter(x => x)} />}

        <p>
          <Button theme='regular' onClick={() => router.push('/settings/groups/new')}>
            <Icon icon={plus} /> {t('Groups.create')}
          </Button>
        </p>
      </div>
    )
  }
})

export default cozyConnect(ownProps => {
  return {
    accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
    groups: fetchCollection('groups', GROUP_DOCTYPE)
  }
})(translate()(Groups))
