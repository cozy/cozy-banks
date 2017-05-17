import styles from '../styles/groupes'
import classNames from 'classnames'

import React, { Component } from 'react'
import Toggle from 'cozy-ui/react/Toggle'
import Modal from 'cozy-ui/react/Modal'
import { translate } from '../lib/I18n'

class GroupsModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // since we're going to change `group@, we need to deep copy it to avoid mutating the state
      group: JSON.parse(JSON.stringify(props.group))
    }
  }
  rename (e) {
    let group = this.state.group
    group.label = e.target.value

    this.setState({
      group: group
    })
  }
  toggleAccount (accountId, enabled) {
    let group = this.state.group
    let selectedAccounts = group.accounts
    let indexInSelectedAccounts = selectedAccounts.indexOf(accountId)

    if (enabled && indexInSelectedAccounts < 0) selectedAccounts.push(accountId)
    else if (!enabled && indexInSelectedAccounts >= 0) selectedAccounts.splice(indexInSelectedAccounts, 1)

    group.accounts = selectedAccounts

    this.setState({
      group: group
    })
  }
  save () {
    this.props.onSave(this.state.group)
  }
  delete () {
    this.props.onDelete(this.state.group)
  }
  cancel () {
    this.props.onCancel(this.state.group)
  }
  render () {
    const { t, accounts } = this.props
    const { group } = this.state
    const isExistingGroup = !!group._id
    let primaryAction, primaryText, primaryType, secondaryAction

    if (isExistingGroup){
      primaryAction = this.delete.bind(this)
      primaryText = 'delete'
      primaryType = 'danger-outline'
      secondaryAction = this.save.bind(this)
    }
    else{
      primaryAction = this.save.bind(this)
      primaryText = 'create'
      primaryType = 'regular'
      secondaryAction = this.cancel.bind(this)
    }

    return (
      <Modal
        title={'Editer le groupe'}
        primaryText={primaryText}
        primaryType={primaryType}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      >
        <form className={styles['bnk-form']}>
          <label className={styles['coz-form-label']}>
            Libellé
          </label>
          <input type="text" value={group.label} onInput={this.rename.bind(this)} />

          <label className={styles['coz-form-label']}>
            Comptes
          </label>
          <table className={styles['coz-table-modal']}>
            <tbody className={styles['coz-table-body']}>
              { accounts.map(account => (
                <tr className={styles['coz-table-row']}>
                  <td className={classNames(styles['coz-table-cell'])}>
                    {account.label}
                  </td>
                  <td className={classNames(styles['coz-table-cell'])}>
                    {account.number}
                  </td>
                  <td className={classNames(styles['coz-table-cell'])}>
                    <Toggle name={account._id} checked={group.accounts.indexOf(account._id) >= 0} onToggle={this.toggleAccount.bind(this, account._id)} />
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </form>
      </Modal>
    )
  }
}

export default translate()(GroupsModal)
