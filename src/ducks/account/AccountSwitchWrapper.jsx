import React from 'react'
import cx from 'classnames'

import styles from 'ducks/account/AccountSwitch.styl'

const AccountSwitchWrapper = ({ children }) => {
  return <div className={cx(styles['account-switch'])}>{children}</div>
}

export default AccountSwitchWrapper
