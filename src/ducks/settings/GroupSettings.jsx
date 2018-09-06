import React, { Component } from 'react'
import Loading from 'components/Loading'
import { withDispatch } from 'utils'
import { Query, withMutations } from 'cozy-client'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { withRouter } from 'react-router'

import Topbar from 'components/Topbar'
import BackButton from 'components/BackButton'
import Table from 'components/Table'
import PageTitle from 'components/PageTitle'

import { Button, translate, Toggle, Spinner } from 'cozy-ui/react'

import styles from './GroupsSettings.styl'
import btnStyles from 'styles/buttons.styl'
import { getAccountInstitutionLabel } from '../account/helpers'
import { sortBy, flowRight as compose } from 'lodash'
import { mkEmptyDocFromSchema } from 'utils/client'
import { schema } from 'doctypes'

const mkNewGroup = () => {
  const obj = mkEmptyDocFromSchema(schema.groups)
  obj.label = 'Nouveau groupe'
  return obj
}

class GroupSettings extends Component {
  state = { modifying: false, saving: false }
  rename = () => {
    const { group } = this.props
    const label = this.inputRef.value
    this.setState({ saving: true })
    this.updateOrCreate({ ...group, label }, () => {
      this.setState({ saving: false, modifying: false })
    })
  }

  async updateOrCreate(group, cb) {
    const { router, saveDocument } = this.props
    const isNew = !group.id
    try {
      const response = await saveDocument(group)
      if (response && response.data) {
        const doc = response.data
        if (isNew) {
          router.push(`/settings/groups/${doc.id}`)
        }
      }
    } finally {
      cb && cb()
    }
  }

  toggleAccount = async (accountId, group, enabled) => {
    const accounts = group.accounts
    if (enabled) {
      accounts.addById(accountId)
    } else {
      accounts.removeById(accountId)
    }
    if (!group.id) {
      this.updateOrCreate(dehydrateDoc(group))
    }
  }

  renderAccountLine = (account, group) => {
    return (
      <tr>
        <td className={styles.GrpStg__accntLabel}>
          {account.shortLabel || account.label}
        </td>
        <td className={styles.GrpStg__accntBank}>
          {getAccountInstitutionLabel(account)}
        </td>
        <td className={styles.GrpStg__accntNumber}>{account.number}</td>
        <td className={styles.GrpStg__accntToggle}>
          {group ? (
            <Toggle
              id={account._id}
              checked={group.accounts.exists(account)}
              onToggle={this.toggleAccount.bind(null, account._id, group)}
            />
          ) : (
            <Toggle id={account._id} disabled />
          )}
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

  saveInputRef = ref => {
    this.inputRef = ref
  }

  render() {
    const { t, group } = this.props
    const { modifying, saving } = this.state

    return (
      <div>
        <BackButton to="/settings/groups" arrow />
        <Topbar>
          <PageTitle>{group.label}</PageTitle>
        </Topbar>

        <h3>{t('Groups.label')}</h3>
        <form
          className={styles.GrpStg__form}
          onSubmit={e => e.preventDefault()}
        >
          <p>
            {!modifying ? (
              group.label
            ) : (
              <input
                ref={this.saveInputRef}
                autoFocus
                type="text"
                defaultValue={group.label}
              />
            )}
            {modifying ? (
              <Button
                className={styles['save-button']}
                disabled={saving}
                theme="regular"
                onClick={this.rename}
              >
                {t('Groups.save')} {saving && <Spinner />}
              </Button>
            ) : (
              <Button
                className={btnStyles['btn--no-outline']}
                onClick={this.modifyName}
              >
                &nbsp;&nbsp;{t('Groups.rename')}
              </Button>
            )}
          </p>
        </form>
        <h3>{t('Groups.accounts')}</h3>
        <Query query={client => client.all(ACCOUNT_DOCTYPE)}>
          {({ data: accounts, fetchStatus }) => {
            if (fetchStatus === 'loading') {
              return <Loading />
            }

            return (
              <Table className={styles.GrpStg__table}>
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
                  {accounts &&
                    sortBy(accounts, ['institutionLabel', 'label']).map(
                      account => this.renderAccountLine(account, group)
                    )}
                </tbody>
              </Table>
            )
          }}
        </Query>
        <p>
          <Button theme="danger-outline" onClick={this.onRemove}>
            {t('Groups.delete')}
          </Button>
        </p>
      </div>
    )
  }
}

const enhance = Component =>
  compose(translate(), withRouter, withDispatch)(Component)

const ExistingGroupSettings = enhance(props => (
  <Query query={client => client.get(GROUP_DOCTYPE, props.routeParams.groupId)}>
    {(
      { data: group, fetchStatus },
      { saveDocument, deleteDocument, getAssociation }
    ) =>
      fetchStatus === 'loading' || fetchStatus === 'pending' ? (
        <Loading />
      ) : (
        <GroupSettings
          group={group}
          saveDocument={saveDocument}
          deleteDocument={deleteDocument}
          getAssociation={getAssociation}
          {...props}
        />
      )
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
export const NewGroupSettings = withMutations()(
  enhance(props => <GroupSettings {...props} group={mkNewGroup()} />)
)
