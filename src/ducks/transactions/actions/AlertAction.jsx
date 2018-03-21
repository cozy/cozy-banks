import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-bell-16.svg'
import ActionLink from './ActionLink'

const name = 'alert'

const Component = ({ t, actionProps: { color } }) => {
  return (
    <ActionLink
      text={t('Transactions.actions.alert')}
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
