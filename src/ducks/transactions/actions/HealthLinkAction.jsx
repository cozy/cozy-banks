import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { isHealth } from 'ducks/categories/helpers'
import palette from 'cozy-ui/stylus/settings/palette.json'
import ButtonAction from 'cozy-ui/react/ButtonAction'

const name = 'refund'

const Component = ({ t, actionProps: { urls } }) => {
  const url = `${urls['HEALTH']}#/remboursements`
  return (
    <ButtonAction
      onClick={() => open(url)}
      label={t(`Transactions.actions.${name}`)}
      rightIcon="openwith"
    />
  )
}

const action = {
  name,
  icon,
  color: palette.dodgerBlue,
  match: (transaction, { urls }) => {
    return isHealth(transaction) && urls['HEALTH']
  },
  Component: translate()(Component)
}

export default action
