import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { ButtonAction } from 'cozy-ui/react'
import ActionLink from './ActionLink'

const name = 'url'

const Component = ({ transaction, compact, onlyItems }) => {
  const action = transaction.action

  if (onlyItems) {
    return (
      <ActionLink
        label={action.trad}
        href={action.url}
        target={action.target}
        icon="openwith"
      />
    )
  }

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
