import styles from 'styles/groupes'
import classNames from 'classnames'

import React, { Component } from 'react'
import Toggle from 'cozy-ui/react/Toggle'
import Modal from 'cozy-ui/react/Modal'
import { translate } from 'cozy-ui/react/I18n'

class GroupsModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // since we're going to change `group`, we need to deep copy it to avoid mutating the state
      group: JSON.parse(JSON.stringify(props.group))
    }
  }
  rename (e) {
    let group = this.state.group
    group.label = e.target.value

    this.setState({
      group
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
      group
    })
  }
  save () {
    if (this.state.group.label.trim() === '') return
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
    let primaryAction, primaryText, primaryType, secondaryAction, title

    if (isExistingGroup) {
      title = t('Groups.edit_group')
      primaryAction = this.delete.bind(this)
      primaryText = t('Groups.delete')
      primaryType = 'danger-outline'
      secondaryAction = this.save.bind(this)
    } else {
      title = 'Créer un groupe'
      primaryAction = this.save.bind(this)
      primaryText = t('Groups.create')
      primaryType = 'regular'
      secondaryAction = this.cancel.bind(this)
    }

    return (
      <Modal
        title={title}
        primaryText={primaryText}
        primaryType={primaryType}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      >
        <form className={styles['bnk-form']}>
          <label className={styles['coz-form-label']}>
            {t('Groups.label')}
          </label>
          <input type='text' value={group.label} onInput={this.rename.bind(this)} />

          <label className={styles['coz-form-label']}>
            {t('Groups.accounts')}
          </label>
          <table className={styles['coz-table-modal']}>
            <tbody className={styles['coz-table-body']}>
              {accounts.map(account => (
                <tr className={styles['coz-table-row']}>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
                    {account.label}
                  </td>
                  <td className={classNames(styles['coz-table-cell'], styles['bnk-table-acct-number'])}>
                    {account.number}
                  </td>
                  <td className={classNames(styles['coz-table-cell'])}>
                    <Toggle id={account._id} checked={group.accounts.indexOf(account._id) >= 0} onToggle={this.toggleAccount.bind(this, account._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </Modal>
    )
  }
}

export default translate()(GroupsModal)
