import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { ButtonAction } from 'cozy-ui/react'
import styles from '../TransactionActions.styl'
import { TransactionModalRow } from '../TransactionModal'
import palette from 'cozy-ui/react/palette'

const name = 'url'

const transactionModalRowStyle = { color: palette.dodgerBlue }
const Component = ({ transaction, compact, isModalItem }) => {
  const action = transaction.action

  if (isModalItem) {
    return (
      <TransactionModalRow
        onClick={() => open(action.url, action.target)}
        iconLeft="openwith"
        style={transactionModalRowStyle}
      >
        {action.trad}
      </TransactionModalRow>
    )
  }

  return (
    <ButtonAction
      onClick={() => open(action.url, action.target)}
      label={action.trad}
      rightIcon="openwith"
      compact={compact}
      className={styles.TransactionActionButton}
    />
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
