import React from 'react'
import styles from 'components/List/List.styl'
import ListItemText from 'cozy-ui/react/ListItemText'
import { Radio as UIRadio } from 'cozy-ui/react'
import cx from 'classnames'

export const Radio = props => {
  return <UIRadio {...props} className={styles.Radio} />
}

export const List = props => {
  const { className, bordered, ...rest } = props

  return (
    <div
      className={cx(
        {
          [styles['List--bordered']]: bordered
        },
        className
      )}
      {...rest}
    />
  )
}

export const Header = ({ children }) => (
  <div className={styles['c-list-header']}>{children}</div>
)

export const Row = ({ className, onRef, ...rest }) => (
  <div ref={onRef} className={cx(styles['c-list-row'], className)} {...rest} />
)

export const Content = ListItemText
