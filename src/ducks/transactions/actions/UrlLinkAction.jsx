import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import ButtonAction from 'cozy-ui/react/ButtonAction'

const name = 'url'

const Component = ({ transaction }) => {
  const action = transaction.action
  return (
    <a href={action.url} target={action.target}>
      <ButtonAction label={action.trad} rightIcon="openwith" />
    </a>
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
