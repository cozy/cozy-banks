import React from 'react'
import { findKey } from 'lodash'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import ActionLink from './ActionLink'

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
    <ActionLink
      href={urls[appName]}
      text={t(`Transactions.actions.${name}`, { appName })}
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
