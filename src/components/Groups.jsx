import styles from '../styles/groupes'
import classNames from 'classnames'

import React, { Component } from 'react'

import GroupsModal from './GroupsModal'

class Groups extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editingGroup: null
    }
  }
  addGroup () {
    this.setState({
      editingGroup: {
        label: '',
        accounts: []
      }
    })
  }
  editGroup (group) {
    this.setState({
      editingGroup: group
    })
  }
  saveGroupChanges (data) {
    if (data._id){
      this.props.updateGroup(data._id, data)
    }
    else {
      this.props.createGroup(data)
    }

    this.setState({
      editingGroup: null
    })
  }
  deleteGroup (group) {
    this.props.deleteGroup(group)

    this.setState({
      editingGroup: null
    })
  }
  render (props, state) {
    const { groups, accounts } = props
    const { editingGroup } = state

    return (
      <div>
        <h4>
          Groupes
        </h4>

        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-libelle'])}>
              Libellé
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-comptes'])}>
              Comptes
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])} />
          </tr>
          <tbody className={styles['coz-table-body']}>
            { groups.map(group => (
              <tr className={styles['coz-table-row']}>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
                  {group.label}
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-comptes'])}>
                  { group.accounts.map((accountId, index) => {
                    const account = accounts.find(account => (account._id === accountId))
                    let text = account ? account.label : ''
                    if (index < group.accounts.length - 1) text += ' ; '
                    return text
                  }) }
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])}>
                  <button className={styles['bnk-action-button']} onClick={this.editGroup.bind(this, group)}>
                    éditer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        { editingGroup !== null &&
          <div>
            <GroupsModal
              group={editingGroup}
              accounts={accounts}
              onSave={this.saveGroupChanges.bind(this)}
              onDelete={this.deleteGroup.bind(this)}
              onCancel={this.editGroup.bind(this, null)}
            />
          </div>
        }

        <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup.bind(this)}>
          Créer un groupe
        </button>
      </div>
    )
  }
}

export default Groups
