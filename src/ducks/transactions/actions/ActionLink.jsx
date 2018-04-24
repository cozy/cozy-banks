import React from 'react'
import styles from '../TransactionActions.styl'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { Icon } from 'cozy-ui/react'

const ActionLink = ({
  href,
  text,
  target,
  onClick,
  icon,
  color = palette.dodgerBlue
}) => (
  <a
    href={href}
    target={target}
    onClick={onClick}
    style={{ color }}
    className={styles.TransactionAction}
  >
    {icon && <Icon icon={icon} style={{ marginRight: '10px' }} />}
    {text}
  </a>
)

export default ActionLink
