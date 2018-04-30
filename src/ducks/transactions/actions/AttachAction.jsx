import React from 'react'
import { translate } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link.svg'
import { TransactionModalRow } from '../TransactionModal'

const name = 'attach'

const Component = ({ t }) => {
  return (
    <TransactionModalRow
      text={t('Transactions.actions.attach')}
      iconLeft={icon}
      disabled
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
