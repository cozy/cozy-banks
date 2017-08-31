import React, { Component } from 'react'
import classNames from 'classnames'
import Loading from 'components/Loading'
import styles from 'styles/groupes'
import { withDispatch } from 'utils'
import {
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocument,
  cozyConnect,
  fetchCollection
} from 'redux-cozy-client'
import Topbar from 'ducks/commons/Topbar'
import BackButton from 'components/BackButton'
import { Button, translate, Toggle } from 'cozy-ui/react'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { withRouter } from 'react-router'
import { omit } from 'lodash'

const accountInGroup = (account, group) =>
  group.accounts.indexOf(account._id) > -1

class GroupSettings extends Component {
  rename = e => {
    const { group } = this.props
    this.updateOrCreate({...group, label: e.target.value})
  }

  async updateOrCreate (group) {
    const { dispatch, router } = this.props
    const method = group.id ? updateDocument : createDocument
    const response = await dispatch(method.apply(this, arguments))
    if (response && response.data) {
      const doc = response.data[0]
      if (group.id !== doc.id) {
        router.push(`/settings/groups/${doc.id}`)
      }
    }
  }

  toggleAccount = (accountId, enabled) => {
    const { group } = this.props
    let selectedAccounts = group.accounts
    let indexInSelectedAccounts = selectedAccounts.indexOf(accountId)

    if (enabled && indexInSelectedAccounts < 0) selectedAccounts.push(accountId)
    else if (!enabled && indexInSelectedAccounts >= 0) selectedAccounts.splice(indexInSelectedAccounts, 1)

    group.accounts = selectedAccounts
    this.updateOrCreate(omit(group, '_rev'))
  }

  renderAccountLine = (account) => {
    const { group } = this.props
    return <tr className={styles['coz-table-row']}>
      <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
        {account.label}
      </td>
      <td className={classNames(styles['coz-table-cell'], styles['bnk-table-acct-number'])}>
        {account.number}
      </td>
      <td className={classNames(styles['coz-table-cell'])}>
        <Toggle id={account._id} checked={accountInGroup(account, group)} onToggle={this.toggleAccount.bind(null, account._id)} />
      </td>
    </tr>
  }

  onRemove = () => {
    const { group, dispatch, router } = this.props
    dispatch(deleteDocument(group)).then(() => {
      router.push(`/settings/groups`)
    })
  }

  render ({ t, group, accounts, isNewGroup }) {
    if (!group) {
      return <Loading />
    }

    return (
      <div>
        <BackButton>
          <a href='#/settings/groups' />
        </BackButton>
        <Topbar>
          <h2>{ group.label }</h2>
        </Topbar>
        <p className='coz-desktop'>
          <a href='#/settings/groups'>
            {t('Groups.back-to-groups')}
          </a>
        </p>
        <form className={styles['bnk-form']}>
          <label className={styles['coz-form-label']}>
            {t('Groups.label')}
          </label>
          <input type='text' defaultValue={group.label} onBlur={this.rename} />

          <label className={styles['coz-form-label']}>
            {t('Groups.accounts')}
          </label>
          { accounts.fetchStatus === 'pending' ? <Loading /> : <table className={styles['coz-table-modal']}>
            <tbody className={styles['coz-table-body']}>
              { accounts.data && accounts.data.map(this.renderAccountLine)}
            </tbody>
          </table> }
        </form>
        <p>
          <Button theme='danger-outline' onClick={this.onRemove}>
            {t('Groups.delete')}
          </Button>
        </p>
      </div>
    )
  }
}

const mkNewGroup = function () {
  return {
    label: 'Nouveau groupe',
    accounts: [],
    type: GROUP_DOCTYPE
  }
}

const mapDocumentsToProps = props => {
  const groupId = props.routeParams.groupId
  console.log('mapDocumentsToProps', groupId)
  return {
    group: (groupId === 'new' || !groupId) ? mkNewGroup() : fetchDocument(GROUP_DOCTYPE, groupId),
    accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE)
  }
}

const EnhancedGroupSettings = (
  cozyConnect(mapDocumentsToProps)(
  translate()(
  withRouter(
  withDispatch(GroupSettings)
))))

export default EnhancedGroupSettings

/**
 * We create NewGroupSettings else react-router will reuse
 * the existing <GroupSettings /> when a new account is created and we navigate
 * to the new group settings. We could do something in componentDidUpdate
 * to refetch the group but it seems easier to do that to force the usage
 * of a brand new component
 */
export class NewGroupSettings extends EnhancedGroupSettings {}
