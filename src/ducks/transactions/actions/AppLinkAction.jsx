import React from 'react'
import { findKey } from 'lodash'
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

const Component = ({ transaction, actionProps: { urls } }) => {
  const appName = getAppName(urls, transaction)
  return (
    <a href={urls[appName]}>
      <ButtonAction label={capitalize(appName)} rightIcon="openwith" />
    </a>
  )
}

const action = {
  name,
  icon,
  match: (transaction, { urls }) => {
    return getAppName(urls, transaction)
  },
  Component: Component
}

export default action
