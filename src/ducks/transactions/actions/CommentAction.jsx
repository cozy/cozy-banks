import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-comment.svg'
import ActionLink from './ActionLink'

const name = 'comment'

const Component = ({ t, color }) => {
  return (
    <ActionLink
      text={t('Transactions.actions.comment')}
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
