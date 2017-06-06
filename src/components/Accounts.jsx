import styles from 'styles/accounts'
import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import AccountSharingStatus from 'components/AccountSharingStatus'

class Accounts extends Component {
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
    if (data._id) {
      this.props.updateGroup(data._id, data)
    } else {
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
    const { t, groups, accounts, sharedAccounts } = props
    const { editingGroup } = state

    return (
      <div>
        <h4>
          {t('Accounts.accounts')}
        </h4>

        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-libelle'])}>
              {t('Accounts.label')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-bank'])}>
              {t('Accounts.bank')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-account'])}>
              {t('Accounts.account')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-type'])}>
              {t('Accounts.type')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-shared'])}>
              {t('Accounts.shared')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])} />
          </tr>
          <tbody className={styles['coz-table-body']}>
            { accounts.map(account => (
              <tr className={styles['coz-table-row']}>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
                  {account.label}
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-bank'])}>
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-account'])}>
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-type'])}>
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-shared'])}>
                  { <AccountSharingStatus withText account={ account } /> }
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])}>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup.bind(this)}>
          {t('Accounts.create')}
        </button>

        <h4>
          {t('Accounts.shared-accounts')}
        </h4>

        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-libelle'])}>
              {t('Accounts.label')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-bank'])}>
              {t('Accounts.bank')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-account'])}>
              {t('Accounts.account')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-type'])}>
              {t('Accounts.type')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-shared'])}>
              {t('Accounts.shared')}
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])} />
          </tr>
          <tbody className={styles['coz-table-body']}>
            { accounts.map(account => (
              <tr className={styles['coz-table-row']}>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
                  {account.label}
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-bank'])}>

                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-account'])}>

                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-type'])}>
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-shared'])}>
                  { <AccountSharingStatus withText account={ account } /> }
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])}>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default translate()(Accounts)
