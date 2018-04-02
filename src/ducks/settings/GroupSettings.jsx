import React, { Component } from 'react'
import { withRouter } from 'react-router'
import compose from 'lodash/flowRight'
import sortBy from 'lodash/sortBy'

import { Button, translate, Toggle } from 'cozy-ui/react'
import Spinner from 'cozy-ui/react/Spinner'

import { queryConnect } from 'utils/client-compat'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'

import Loading from 'components/Loading'
import Topbar from 'components/Topbar'
import BackButton from 'components/BackButton'
import Table from 'components/Table'
import styles from './GroupsSettings.styl'
import btnStyles from 'styles/buttons'
import { getAccountInstitutionLabel } from '../account/helpers'

const accountInGroup = (account, group) => {
  return group.accounts.indexOf(account._id) > -1
}

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
    const { router, saveDocument } = this.props
    try {
      const response = await saveDocument({ _type: GROUP_DOCTYPE, ...group })
      if (response && response.data) {
        const doc = response.data
        if (group.id !== doc.id) {
          router.push(`/settings/groups/${doc.id}`)
        }
      }
    } finally {
      cb && cb()
    }
  }

  toggleAccount = (accountId, enabled) => {
    let { group } = this.props
    group = group.data[0]
    let selectedAccounts = group.accounts
    let indexInSelectedAccounts = selectedAccounts.indexOf(accountId)

    if (enabled && indexInSelectedAccounts < 0) selectedAccounts.push(accountId)
    else if (!enabled && indexInSelectedAccounts >= 0) selectedAccounts.splice(indexInSelectedAccounts, 1)

    group.accounts = selectedAccounts
    this.updateOrCreate(group)
  }

  renderAccountLine = (account) => {
    let { group } = this.props
    group = group.data[0]
    return (
      <tr>
        <td className={styles.GrpStg__accntLabel}>
          {account.shortLabel || account.label}
        </td>
        <td className={styles.GrpStg__accntBank}>
          {getAccountInstitutionLabel(account)}
        </td>
        <td className={styles.GrpStg__accntNumber}>
          {account.number}
        </td>
        <td className={styles.GrpStg__accntToggle}>
          <Toggle
            id={account._id}
            checked={accountInGroup(account, group)}
            onToggle={this.toggleAccount.bind(null, account._id)} />
        </td>
      </tr>
    )
  }

  onRemove = async () => {
    const { group, router, deleteDocument } = this.props
    await deleteDocument(group)
    router.push('/settings/groups')
  }

  modifyName = () => {
    this.setState({ modifying: true })
  }

  saveInputRef = ref => { this.inputRef = ref }

  render ({ t, group, accounts, isNewGroup }, { modifying, saving }) {
    if (group.fetchStatus === 'loading' || group.fetchStatus === 'pending') {
      return <Loading />
    }

    return (
      <div>
        <BackButton to='/settings/groups' arrow />
        <Topbar>
          <h2>{group.label}</h2>
        </Topbar>

        <h3>{t('Groups.label')}</h3>
        <form className={styles.GrpStg__form} onSubmit={e => e.preventDefault()}>
          <p>
            { !modifying
              ? group.label
              : <input ref={this.saveInputRef} autofocus type='text' defaultValue={group.label} />
            }
            {modifying ? <Button className={styles['save-button']} disabled={saving} theme='regular' onClick={this.rename}>
              {t('Groups.save')} {saving && <Spinner />}
            </Button> : <Button className={btnStyles['btn--no-outline']} onClick={this.modifyName}>
              &nbsp;&nbsp;{t('Groups.rename')}
            </Button>}
          </p>
        </form>
        <h3>
          {t('Groups.accounts')}
        </h3>
        {accounts.fetchStatus === 'pending'
          ? <Loading />
          : <Table className={styles.GrpStg__table}>
            <thead>
              <tr>
                <th className={styles.GrpStg__accntLabel}>
                  {t('Groups.label')}
                </th>
                <th className={styles.GrpStg__accntBank}>
                  {t('Groups.bank')}
                </th>
                <th className={styles.GrpStg__accntNumber}>
                  {t('Groups.account-number')}
                </th>
                <th className={styles.GrpStg__accntToggle}>
                  {t('Groups.included')}
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.data && sortBy(accounts.data, ['institutionLabel', 'label']).map(this.renderAccountLine)}
            </tbody>
          </Table>}
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

const enhance = (
  compose(
    queryConnect({
      group: props => {
        const groupId = props.routeParams.groupId

        return (groupId === 'new' || !groupId)
          ? { doc: mkNewGroup() }
          : { query: client => client.get(GROUP_DOCTYPE, groupId) }
      },
      accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'accounts' }
    }),
    translate(),
    withRouter
  )
)

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
