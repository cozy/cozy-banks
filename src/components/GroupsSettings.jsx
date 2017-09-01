import React, { Component } from 'react'
import classNames from 'classnames'
import { translate, Button, Icon } from 'cozy-ui/react'
import styles from 'styles/groupes'
import Table from 'components/Table'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { cozyConnect, fetchCollection } from 'redux-cozy-client'
import Loading from 'components/Loading'
import plus from 'assets/icons/16/plus.svg'

const isPending = (reduxObj) => {
  return reduxObj.fetchStatus === 'pending'
}

const goTo = url => () => {
  window.location = url
}

class Groups extends Component {
  render ({ t, groups, accounts }, { editingGroup }) {
    if (isPending(groups) || isPending(accounts)) {
      return <Loading />
    }

    const validGroups = groups.data.filter(x => x)
    return (
      <div>
        <h4>
          {t('Groups.groups')}
        </h4>

        { validGroups.length ? <Table className={styles.Groups__table}>
          <thead>
            <tr>
              <th className={styles['bnk-table-libelle']}>
                {t('Groups.label')}
              </th>
              <th className={styles['bnk-table-comptes']}>
                {t('Groups.accounts')}
              </th>
            </tr>
          </thead>

          <tbody className={styles['coz-table-body']}>
            {validGroups.map(group => (
              <tr>
                <td className={styles['bnk-table-libelle']}>
                  <a href={`#/settings/groups/${group._id}`}>
                    {group.label}
                  </a>
                </td>
                <td className={styles['bnk-table-comptes']}>
                  {group.accounts.map((accountId, index) => {
                    const account = accounts.data.find(account => (account._id === accountId))
                    let text = account ? account.label : ''
                    if (index < group.accounts.length - 1) text += ' ; '
                    return text
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table> : <p>
          {t('Groups.no-groups')}
        </p>}

        <Button theme='regular' onClick={goTo('#/settings/groups/new')}>
          <Icon icon={plus} /> {t('Groups.create')}
        </Button>
      </div>
    )
  }
}

export default cozyConnect(ownProps => {
  return {
    accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE),
    groups: fetchCollection('groups', GROUP_DOCTYPE)
  }
})(translate()(Groups))
