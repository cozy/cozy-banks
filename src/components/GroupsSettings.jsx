import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import GroupsModal from 'components/GroupsModal'
import styles from 'styles/groupes'
import Table from 'components/Table'

class Groups extends Component {
  state = {
    editingGroup: null
  }

  addGroup = () => {
    this.setState({
      editingGroup: {
        label: '',
        accounts: []
      }
    })
  }

  editGroup = group => {
    this.setState({
      editingGroup: group
    })
  }

  saveGroupChanges = data => {
    if (data._id) {
      this.props.updateGroup(data._id, data)
    } else {
      this.props.createGroup(data)
    }

    this.setState({
      editingGroup: null
    })
  }

  deleteGroup = group => {
    this.props.deleteGroup(group)

    this.setState({
      editingGroup: null
    })
  }

  render ({ t, groups, accounts }, { editingGroup }) {
    return (
      <div>
        <h4>
          {t('Groups.groups')}
        </h4>

        <Table className={styles.Groups__table}>
          <thead>
            <tr>
              <th className={styles['bnk-table-libelle']}>
                {t('Groups.label')}
              </th>
              <th className={styles['bnk-table-comptes']}>
                {t('Groups.accounts')}
              </th>
              <th className={styles['bnk-table-actions']} />
            </tr>
          </thead>

          <tbody className={styles['coz-table-body']}>
            {groups.map(group => (
              <tr>
                <td className={styles['bnk-table-libelle']}>
                  {group.label}
                </td>
                <td className={styles['bnk-table-comptes']}>
                  {group.accounts.map((accountId, index) => {
                    const account = accounts.find(account => (account._id === accountId))
                    let text = account ? account.label : ''
                    if (index < group.accounts.length - 1) text += ' ; '
                    return text
                  })}
                </td>
                <td className={styles['bnk-table-actions']}>
                  <button className={styles['bnk-action-button']} onClick={this.editGroup.bind(this, group)}>
                    {t('Groups.edit')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {editingGroup !== null &&
          <div>
            <GroupsModal
              group={editingGroup}
              accounts={accounts}
              onSave={this.saveGroupChanges}
              onDelete={this.deleteGroup}
              onCancel={this.editGroup}
            />
          </div>
        }

        <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup}>
          {t('Groups.create')}
        </button>
      </div>
    )
  }
}

export default translate()(Groups)
