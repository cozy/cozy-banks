import React, { Component } from 'react'
import Loading from 'components/Loading'
import { withDispatch } from 'utils'
import {
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocument,
  cozyConnect,
  fetchCollection
} from 'cozy-client'
import Topbar from 'ducks/commons/Topbar'
import BackButton from 'components/BackButton'
import { Button, translate, Toggle } from 'cozy-ui/react'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { withRouter } from 'react-router'
import Table from 'components/Table'
import Spinner from 'cozy-ui/react/Spinner'
import styles from './GroupsSettings.styl'

const accountInGroup = (account, group) =>
  group.accounts.indexOf(account._id) > -1

class GroupSettings extends Component {
  state = { modifying: false, saving: false }
  rename = e => {
    const { group } = this.props
    const label = this.inputRef.value
    this.setState({saving: true})
    this.updateOrCreate({...group, label}, () => {
      this.setState({saving: false, modifying: false})
    })
  }

  async updateOrCreate (group, cb) {
    const { dispatch, router } = this.props
    try {
      const response = group.id
        ? await dispatch(updateDocument(group))
        : await dispatch(createDocument(GROUP_DOCTYPE, group))
      if (response && response.data) {
        const doc = response.data[0]
        if (group.id !== doc.id) {
          router.push(`/settings/groups/${doc.id}`)
        }
      }
    } finally {
      cb && cb()
    }
  }

  toggleAccount = (accountId, enabled) => {
    const { group } = this.props
    let selectedAccounts = group.accounts
    let indexInSelectedAccounts = selectedAccounts.indexOf(accountId)

    if (enabled && indexInSelectedAccounts < 0) selectedAccounts.push(accountId)
    else if (!enabled && indexInSelectedAccounts >= 0) selectedAccounts.splice(indexInSelectedAccounts, 1)

    group.accounts = selectedAccounts
    this.updateOrCreate(group)
  }

  renderAccountLine = (account) => {
    const { group } = this.props
    return (
      <tr>
        <td className={styles.GrpStg__accntLabel}>
          {account.label}
        </td>
        <td className={styles.GrpStg__accntNumber}>
          {account.number}
        </td>
        <td className={styles.GrpStg__accntToggle}>
          <Toggle id={account._id} checked={accountInGroup(account, group)} onToggle={this.toggleAccount.bind(null, account._id)} />
        </td>
      </tr>
    )
  }

  onRemove = () => {
    const { group, dispatch, router } = this.props
    dispatch(deleteDocument(group)).then(() => {
      router.push('/settings/groups')
    })
  }

  modifyName = () => {
    this.setState({ modifying: true })
  }

  saveInputRef = ref => { this.inputRef = ref }

  render ({ t, group, accounts, isNewGroup }, { modifying, saving }) {
    if (!group) {
      return <Loading />
    }

    return (
      <div>
        <BackButton to='/settings/groups' />
        <Topbar>
          <h2>{group.label}</h2>
        </Topbar>
        <p className='coz-desktop'>
          <a href='#/settings/groups'>
            {t('Groups.back-to-groups')}
          </a>
        </p>
        <form className={styles.GrpStg__form} onSubmit={e => e.preventDefault()}>
          <label className={styles['coz-form-label']}>
            {t('Groups.label')}
          </label>
          {!modifying && <p>{group.label}</p>}
          {modifying && <p>
            <input ref={this.saveInputRef} autofocus type='text' defaultValue={group.label} />
          </p>}
          {modifying ? <Button disabled={saving} theme='regular' onClick={this.rename}>
            {t('Groups.save')} {saving && <Spinner />}
          </Button> : <Button theme='regular' onClick={this.modifyName}>
            {t('Groups.rename')}
          </Button>}

          <label className={styles['coz-form-label']}>
            {t('Groups.accounts')}
          </label>
          {accounts.fetchStatus === 'pending' ? <Loading /> : <Table className={styles.GrpStg__table}>
            <tbody>
              {accounts.data && accounts.data.map(this.renderAccountLine)}
            </tbody>
          </Table>}
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

const mkNewGroup = () => ({
  label: 'Nouveau groupe',
  accounts: []
})

const mapDocumentsToProps = props => {
  const groupId = props.routeParams.groupId
  return {
    group: (groupId === 'new' || !groupId) ? mkNewGroup() : fetchDocument(GROUP_DOCTYPE, groupId),
    accounts: fetchCollection('accounts', ACCOUNT_DOCTYPE)
  }
}

const enhance = Component =>
  cozyConnect(mapDocumentsToProps)(
    translate()(
      withRouter(
        withDispatch(Component))))

const EnhancedGroupSettings = enhance(GroupSettings)
export default EnhancedGroupSettings

/**
 * We create NewGroupSettings else react-router will reuse
 * the existing <GroupSettings /> when a new account is created and we navigate
 * to the new group settings. We could do something in componentDidUpdate
 * to refetch the group but it seems easier to do that to force the usage
 * of a brand new component
 */
export const NewGroupSettings = enhance(class extends GroupSettings {
  state = {...this.state, modifying: true}
})
