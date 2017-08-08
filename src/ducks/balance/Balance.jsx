import React from 'react'
import Table from 'ducks/Table'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import styles from './Balance.styl'
import { getAccountsFiltered, getAccountOrGroupType, getAccountOrGroup } from 'ducks/filters'
import { BANK_ACCOUNTS_DOCTYPE, BANK_ACCOUNT_GROUPS_DOCTYPE } from 'actions'

const Balance = ({t, accounts, type, accountOrGroup}) => {
  const label = accountOrGroup ? accountOrGroup.label : ''
  let trad
  switch (type) {
    case BANK_ACCOUNTS_DOCTYPE:
      trad = 'Balance.subtitle.account'
      break
    case BANK_ACCOUNT_GROUPS_DOCTYPE:
      trad = 'Balance.subtitle.group'
      break
    default:
      trad = 'Balance.subtitle.all'
  }
  return (
    <div>
      <h2>{t('Balance.title')}</h2>
      <h3>{t(trad, {label: label})}</h3>
      <Table className={styles['bnk-table']}>
        <thead>
          <tr>
            <td className={styles['account_name']}>{t('Balance.account_name')}</td>
            <td className={styles['solde']}>{t('Balance.solde')}</td>
            <td className={styles['bank_name']}>{t('Balance.bank_name')}</td>
            <td className={styles['account_number']}>{t('Balance.account_number')}</td>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr>
              <td className={styles['account_name']}>{account.label}</td>
              <td className={styles['solde']}>{account.amount} <span>€</span></td>
              <td className={styles['bank_name']}>{account.institutionLabel}</td>
              <td className={styles['account_number']}>{account.number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  accountOrGroup: getAccountOrGroup(state),
  accounts: getAccountsFiltered(state),
  type: getAccountOrGroupType(state)
})

export default connect(mapStateToProps)(translate()(Balance))
