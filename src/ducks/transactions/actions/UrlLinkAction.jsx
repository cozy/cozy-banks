import React from 'react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { ButtonAction } from 'cozy-ui/react'
import styles from '../TransactionActions.styl'
import { TransactionModalRow } from '../TransactionModal'

const name = 'url'

const Component = ({ transaction, compact, isModalItem }) => {
  const action = transaction.action

  if (isModalItem) {
    return (
      <TransactionModalRow
        onClick={() => open(action.url, action.target)}
        iconLeft="openwith"
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
