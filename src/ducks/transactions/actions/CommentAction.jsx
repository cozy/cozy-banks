import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-comment.svg'
import { TransactionModalRow } from '../TransactionModal'

const name = 'comment'

const Component = ({ t }) => {
  return (
    <TransactionModalRow
      text={t('Transactions.actions.comment')}
      iconLeft={icon}
      disabled
    />
  )
}

const action = {
  name,
  icon,
  disabled: true,
  match: () => false,
  Component: translate()(Component)
}

export default action
