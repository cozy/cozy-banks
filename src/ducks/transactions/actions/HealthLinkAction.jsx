import React from 'react'
import { translate, ButtonAction } from 'cozy-ui/react'
import icon from 'assets/icons/actions/icon-link-out.svg'
import { isHealth } from 'ducks/categories/helpers'
import palette from 'cozy-ui/stylus/settings/palette.json'
import ActionLink from './ActionLink'
import styles from '../TransactionActions.styl'

const name = 'refund'

const Component = ({ t, actionProps: { urls }, compact, onlyItems }) => {
  const url = `${urls['HEALTH']}#/remboursements`
  const label = t(`Transactions.actions.${name}`)

  if (onlyItems) {
    return (
      <ActionLink text={label} href={url} target="_blank" icon="openwith" />
    )
  }

  return (
    <ButtonAction
      onClick={() => open(url)}
      label={t(`Transactions.actions.${name}`)}
      rightIcon="openwith"
      compact={compact}
      className={styles.TransactionActionButton}
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
