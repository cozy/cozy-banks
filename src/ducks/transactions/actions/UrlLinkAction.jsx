import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import ActionLink from './ActionLink'

const name = 'url'

const Component = ({transaction}) => {
  const action = transaction.action
  return (
    <ActionLink
      target={action.target}
      href={action.url}
      text={action.trad}
    />
  )
}

const action = {
  name,
  icon,
  match: (transaction) => {
    return transaction.action &&
      transaction.action.type &&
      transaction.action.type === name
  },
  Component
}

export default action
