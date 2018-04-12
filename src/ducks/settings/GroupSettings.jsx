import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Query, withMutations } from 'cozy-client'
import compose from 'lodash/flowRight'
import sortBy from 'lodash/sortBy'

import { Button, translate, Toggle } from 'cozy-ui/react'
import Spinner from 'cozy-ui/react/Spinner'

import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'

import Loading from 'components/Loading'
import Topbar from 'components/Topbar'
import BackButton from 'components/BackButton'
import Table from 'components/Table'
import styles from './GroupsSettings.styl'
import btnStyles from 'styles/buttons'
import { getAccountInstitutionLabel } from '../account/helpers'

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
    const isNew = !group.id
    try {
      const response = await saveDocument({ _type: GROUP_DOCTYPE, ...group })
      if (isNew) {
        router.push(`/settings/groups/${response.data.id}`)
      }
    } finally {
      cb && cb()
    }
  }

  toggleAccount = (accountId, enabled) => {
    const { group, getAssociation } = this.props
    const accounts = getAssociation(group, 'accounts')
    enabled ? accounts.addById(accountId) : accounts.removeById(accountId)
  }

  renderAccountLine = (account) => {
    const { group, getAssociation } = this.props
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
          {group
            ? <Toggle
              id={account._id}
              checked={getAssociation(group, 'accounts').exists(account)}
              onToggle={this.toggleAccount.bind(null, account._id)} />
            : <Toggle disabled />}
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

  render ({ t, group = mkNewGroup() }, { modifying, saving }) {
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
        <Query query={client => client.all(ACCOUNT_DOCTYPE)} as='accounts'>
          {accounts => (
            <div>
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
            </div>
          )}
        </Query>
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
    translate(),
    withRouter
  )
)

const ExistingGroupSettings = enhance(props => (
  <Query query={client => client.get(GROUP_DOCTYPE, props.routeParams.groupId)}>
    {({ data, fetchStatus }, { saveDocument, deleteDocument, getAssociation }) =>
      fetchStatus === 'loading' || fetchStatus === 'pending'
        ? <Loading />
        : <GroupSettings
          group={data[0]}
          saveDocument={saveDocument}
          deleteDocument={deleteDocument}
          getAssociation={getAssociation}
          {...props} />
    }
  </Query>
))
export default ExistingGroupSettings

/**
 * We create NewGroupSettings else react-router will reuse
 * the existing <GroupSettings /> when a new account is created and we navigate
 * to the new group settings. We could do something in componentDidUpdate
 * to refetch the group but it seems easier to do that to force the usage
 * of a brand new component
 */
export const NewGroupSettings = enhance(withMutations()(class extends GroupSettings {
  state = {...this.state, modifying: true}
}))
