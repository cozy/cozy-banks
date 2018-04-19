import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { ButtonAction } from 'cozy-ui/react'

const name = 'url'

const Component = ({ transaction, compact }) => {
  const action = transaction.action
  return (
    <ButtonAction
      onClick={() => open(action.url, action.target)}
      label={action.trad}
      rightIcon="openwith"
      compact={compact}
    />
  )
}

const action = {
  name,
  icon,
  match: transaction => {
    return (
      transaction.action &&
      transaction.action.type &&
      transaction.action.type === name
    )
  },
  Component
}

export default action
