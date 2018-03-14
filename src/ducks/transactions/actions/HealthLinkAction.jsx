import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { isHealth } from 'ducks/categories/helpers'
import ActionLink from './ActionLink'

const name = 'refund'

const Component = ({t, actionProps: { urls }}) => {
  const url = `${urls['HEALTH']}#/remboursements`
  return (
    <ActionLink
      href={url}
      text={t(`Transactions.actions.${name}`)}
    />
  )
}

const action = {
  name,
  icon,
  match: (transaction, {urls}) => {
    return isHealth(transaction) && urls['HEALTH']
  },
  Component: translate()(Component)
}

export default action
