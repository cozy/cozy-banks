import React from 'react'
import { findKey } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import ButtonAction from 'cozy-ui/react/ButtonAction'
import capitalize from 'lodash/capitalize'

const name = 'app'

const getAppName = (urls, transaction) => {
  const label = transaction.label.toLowerCase()
  return findKey(
    urls,
    (url, appName) => url && label.indexOf(appName.toLowerCase()) !== -1
  )
}

const Component = ({ t, transaction, actionProps: { urls } }) => {
  const appName = getAppName(urls, transaction)
  return (
    <ButtonAction
      onClick={() => open(urls[appName])}
      label={t(`Transactions.actions.${name}`, {
        appName: capitalize(appName)
      })}
      rightIcon="openwith"
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
