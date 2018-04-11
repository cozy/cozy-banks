import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-bell-16.svg'
import ActionLink from './ActionLink'

const name = 'alert'

const Component = ({ t, color }) => {
  return <ActionLink text={t('Transactions.actions.alert')} color={color} />
}

const action = {
  name,
  icon,
  disabled: true,
  match: () => true,
  Component: translate()(Component)
}

export default action
