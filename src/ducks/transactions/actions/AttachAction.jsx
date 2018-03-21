import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link.svg'
import ActionLink from './ActionLink'

const name = 'attach'

const Component = ({ t, actionProps: { color } }) => {
  return (
    <ActionLink
      text={t('Transactions.actions.attach')}
      color={color}
    />
  )
}

const action = {
  name,
  icon,
  match: () => false,
  Component: translate()(Component)
}

export default action
