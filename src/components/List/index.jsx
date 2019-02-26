import React from 'react'
import styles from './List.styl'
import { ListItemText } from 'cozy-ui/react'
import cx from 'classnames'

export const List = props => <div>{props.children}</div>

export const Header = ({ children }) => (
  <div className={styles['c-list-header']}>{children}</div>
)

export const Row = ({ className, onRef, ...rest }) => (
  <div ref={onRef} className={cx(styles['c-list-row'], className)} {...rest} />
)

export const Content = ListItemText
