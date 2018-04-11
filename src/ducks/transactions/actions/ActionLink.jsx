import React from 'react'
import styles from '../TransactionActions.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'

const ActionLink = ({
  href,
  text,
  target,
  onClick,
  color = palette.dodgerBlue
}) => (
  <a
    href={href}
    target={target}
    onClick={onClick}
    style={{ color }}
    className={styles.TransactionAction}
  >
    {text}
  </a>
)

export default ActionLink
