import React from 'react'
import KonnectorIcon from 'ducks/balance/components/KonnectorIcon'
import { getAccountInstitutionSlug } from 'ducks/account/helpers'
import styles from './styles.styl'
import cx from 'classnames'

/** Displays a konnector icon for an io.cozy.bank.accounts */
const _AccountIcon = ({ account, className }) => {
  const institutionSlug = getAccountInstitutionSlug(account)
  if (!institutionSlug) {
    return null
  }
  return (
    <KonnectorIcon
      slug={institutionSlug}
      className={cx(styles.AccountIcon, className)}
    />
  )
}

const AccountIcon = React.memo(_AccountIcon)

export default AccountIcon
