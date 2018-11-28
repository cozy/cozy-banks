import React from 'react'
import styles from './List.styl'
import { ListItemText } from 'cozy-ui/react'

export const List = props => <div>{props.children}</div>

export const Header = ({ children }) => (
  <div className={styles['c-list-header']}>{children}</div>
)

export const Row = props => (
  <div ref={props.onRef} className={styles['c-list-row']}>
    {props.children}
  </div>
)

export const Content = ListItemText
