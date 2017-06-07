import React from 'react'
import SharingIcon from 'components/SharingIcon'
import { isShared } from 'reducers/accounts'
import styles from 'styles/tooltip'

export default function ({ account, withText, tooltip }) {
  const rhProps = tooltip ? {
    'data-rh-cls': styles['account-sharing-tooltip'],
    'data-rh-at': 'top',
    'data-rh': 'Patrick Browne'
  } : {}
  return isShared(account) && <span { ...rhProps }>
    <SharingIcon to='Patrick Browne' />
    { withText && <span>&nbsp;Patrick Browne</span>}
  </span>
}
