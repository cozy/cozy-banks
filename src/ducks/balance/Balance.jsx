import React from 'react'
import { flowRight as compose } from 'lodash'
import { connect } from 'react-redux'
import cx from 'classnames'

import { translate, Button, Icon, withBreakpoints } from 'cozy-ui/react'

import Topbar from 'components/Topbar'
import { Table, TdSecondary } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'

import CollectLink from 'ducks/settings/CollectLink'
import { getAccountsFiltered, getFilteringDoc } from 'ducks/filters'
import { getSettings, fetchSettingsCollection } from 'ducks/settings'
import { getAccountInstitutionLabel } from 'ducks/account/helpers'

import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'

import styles from './Balance.styl'
import btnStyles from 'styles/buttons'
import plus from 'assets/icons/16/plus.svg'

const Balance = ({t, accounts, filteringDoc, settingsCollection, breakpoints: { isMobile }}) => {
  const label = filteringDoc ? (filteringDoc.shortLabel || filteringDoc.label) : ''
  let trad
  const type = filteringDoc ? filteringDoc._type : null
  switch (type) {
    case ACCOUNT_DOCTYPE:
      trad = 'Balance.subtitle.account'
      break
    case GROUP_DOCTYPE:
      trad = 'Balance.subtitle.group'
      break
    default:
      trad = 'Balance.subtitle.all'
  }
  let total = 0
  accounts.map(account => {
    if (account.balance) {
      total += parseInt(account.balance, 10)
    }
  })

  const balanceLower = getSettings(settingsCollection).notifications.balanceLower.value

  return (
    <div className={styles['balance']}>
      <Topbar>
        <h2>{t('Balance.title')}</h2>
      </Topbar>
      <div className={styles['kpi']}>
        <FigureBlock label={t(trad, {label: label})} total={total} currency='€' coloredPositive coloredNegative signed />
      </div>
      <Table className={styles['balance-table']}>
        <thead>
          <tr>
            <td className={styles['account_name']}>{t('Balance.account_name')}</td>
            <td className={styles['solde']}>{t('Balance.solde')}</td>
            {!isMobile && <td className={styles['bank_name']}>{t('Balance.bank_name')}</td>}
            {!isMobile && <td className={styles['account_number']}>{t('Balance.account_number')}</td>}
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => {
            const isWarning = account.balance ? account.balance < balanceLower : false
            const isAlert = account.balance ? account.balance < 0 : false
            return (
              <tr>
                <td className={cx(styles['account_name'], { [styles.alert]: isAlert, [styles.warning]: isWarning })}>
                  {account.shortLabel || account.label}
                </td>
                <TdSecondary className={cx(styles['solde'], { [styles.alert]: isAlert, [styles.warning]: isWarning })}>
                  {account.balance && <Figure total={account.balance} warningLimit={balanceLower} currency='€' coloredNegative coloredWarning signed />}
                </TdSecondary>
                {!isMobile && <TdSecondary className={styles['bank_name']}>{getAccountInstitutionLabel(account)}</TdSecondary>}
                {!isMobile && <TdSecondary className={styles['account_number']}>{account.number}</TdSecondary>}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CollectLink>
        <Button className={cx(btnStyles['btn--no-outline'], 'u-pv-1')}>
          <Icon icon={plus} className='u-mr-half' />
          {t('Accounts.add-account')}
        </Button>
      </CollectLink>
    </div>
  )
}

const mapStateToProps = state => ({
  filteringDoc: getFilteringDoc(state),
  accounts: getAccountsFiltered(state),
  settingsCollection: fetchSettingsCollection()
})

export default compose(
  withBreakpoints(),
  connect(mapStateToProps),
  translate()
)(Balance)
