import React from 'react'
import PropTypes from 'prop-types'

import DropdownText from 'cozy-ui/transpiled/react/DropdownText'

import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { getGroupLabel } from 'ducks/groups/helpers'

import { getAccountLabel } from 'ducks/account/helpers.js'
import styles from 'ducks/account/AccountSwitch.styl'

const getFilteringDocLabel = (filteringDoc, t) => {
  if (filteringDoc._type === ACCOUNT_DOCTYPE) {
    return getAccountLabel(filteringDoc, t)
  } else if (filteringDoc._type === GROUP_DOCTYPE) {
    return getGroupLabel(filteringDoc, t)
  }
}

const getFilteredAccountsLabel = (filteredAccounts, accounts, t) => {
  return t('AccountSwitch.some-accounts', {
    count: filteredAccounts.length,
    smart_count: accounts.length
  })
}

const getFilterLabel = (filteredAccounts, filteringDoc, accounts, t) => {
  if (accounts == null || accounts.length === 0) {
    return t('Categories.noAccount')
  }
  if (filteringDoc == null) {
    return t('AccountSwitch.all-accounts')
  }
  if (!Array.isArray(filteringDoc)) {
    return getFilteringDocLabel(filteringDoc, t)
  }
  return getFilteredAccountsLabel(filteredAccounts, accounts, t)
}

// t is passed from above and not through useI18n() since AccountSwitchSelect can be
// rendered in the Bar and in this case it has a different context
const AccountSwitchSelect = ({
  accounts,
  filteredAccounts,
  filteringDoc,
  onClick,
  t,
  typographyProps
}) => {
  return (
    <div className={styles.AccountSwitch__Select} onClick={onClick}>
      <DropdownText
        noWrap
        innerTextProps={{ variant: 'h1', ...typographyProps }}
      >
        {getFilterLabel(filteredAccounts, filteringDoc, accounts, t)}
      </DropdownText>
    </div>
  )
}

AccountSwitchSelect.propTypes = {
  t: PropTypes.func.isRequired
}

export default AccountSwitchSelect
