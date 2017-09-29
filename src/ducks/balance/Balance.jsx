import React from 'react'
import { Table, TdSecondary } from 'components/Table'
import { Figure, FigureBlock } from 'components/Figure'
import { Topbar } from 'ducks/commons'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import styles from './Balance.styl'
import { getAccountsFiltered, getAccountOrGroupType, getAccountOrGroup } from 'ducks/filters'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import breakpointsAware from 'utils/breakpointsAware'
import { flowRight as compose } from 'lodash'

const Balance = ({t, accounts, type, accountOrGroup, breakpoints: { isMobile }}) => {
  const label = accountOrGroup ? accountOrGroup.label : ''
  let trad
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
    total += parseInt(account.balance, 10)
  })
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
            const isAlert = account.balance ? account.balance < 0 : false
            return (
              <tr>
                <td className={classNames(styles['account_name'], { [styles.alert]: isAlert })}>
                  {account.label}
                  {isAlert && <span className='coz-error coz-error--warning' />}
                </td>
                <TdSecondary className={classNames(styles['solde'], { [styles.alert]: isAlert })}>
                  <Figure total={account.balance} currency='€' coloredNegative signed />
                </TdSecondary>
                {!isMobile && <TdSecondary className={styles['bank_name']}>{account.institutionLabel}</TdSecondary>}
                {!isMobile && <TdSecondary className={styles['account_number']}>{account.number}</TdSecondary>}
              </tr>
            )
          })}
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

export default compose(
  breakpointsAware(),
  connect(mapStateToProps),
  translate()
)(Balance)
