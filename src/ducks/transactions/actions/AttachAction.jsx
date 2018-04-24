import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link.svg'
import ActionLink from './ActionLink'

const name = 'attach'

const Component = ({ t, color }) => {
  return (
    <ActionLink
      text={t('Transactions.actions.attach')}
      color={color}
      icon={icon}
    />
  )
}

const action = {
  name,
  icon,
  disabled: true,
  match: () => true,
  Component: translate()(Component)
}

export default action
