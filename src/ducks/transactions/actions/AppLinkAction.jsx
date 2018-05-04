import React from 'react'
import { findKey } from 'lodash'
import { translate, ButtonAction } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import capitalize from 'lodash/capitalize'
import styles from '../TransactionActions.styl'
import { TransactionModalRow } from '../TransactionModal'
import palette from 'cozy-ui/stylus/settings/palette.json'

const name = 'app'

const getAppName = (urls, transaction) => {
  const label = transaction.label.toLowerCase()
  return findKey(
    urls,
    (url, appName) => url && label.indexOf(appName.toLowerCase()) !== -1
  )
}

const beautify = appName => {
  return appName.toLowerCase() === 'edf' ? 'EDF' : capitalize(appName)
}

const Component = ({
  t,
  transaction,
  actionProps: { urls },
  compact,
  isModalItem
}) => {
  const appName = getAppName(urls, transaction)
  const label = t(`Transactions.actions.${name}`, {
    appName: beautify(appName)
  })
  const url = urls[appName]

  if (isModalItem) {
    return (
      <TransactionModalRow
        onClick={() => open(url)}
        iconLeft="openwith"
        style={{ color: palette.dodgerBlue }}
      >
        {label}
      </TransactionModalRow>
    )
  }

  return (
    <ButtonAction
      onClick={() => open(url)}
      label={label}
      rightIcon="openwith"
      compact={compact}
      className={styles.TransactionActionButton}
    />
  )
}

const action = {
  name,
  icon,
  match: (transaction, { urls }) => {
    return getAppName(urls, transaction)
  },
  Component: translate()(Component)
}

export default action
