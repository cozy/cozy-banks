import React from 'react'
import PropTypes from 'prop-types'
import styles from 'components/List/List.styl'
import ListItemText from 'cozy-ui/react/ListItemText'
import { Radio as UIRadio } from 'cozy-ui/react'
import cx from 'classnames'

export const Radio = props => {
  return <UIRadio {...props} className={styles.Radio} />
}

export const List = props => {
  const { className, border, paper, ...rest } = props

  return (
    <div
      className={cx(
        {
          [styles['List--bordered']]: border === true,
          [styles['List--papered']]: paper === true,
          [styles['List--bordered-h']]: border === 'horizontal',
          [styles['List--bordered-v']]: border === 'vertical'
        },
        className
      )}
      {...rest}
    />
  )
}

List.propTypes = {
  border: PropTypes.oneOf([true, 'horizontal', 'vertical']),
  paper: PropTypes.bool
}

export const Header = ({ children }) => (
  <div className={styles['c-list-header']}>{children}</div>
)

export const Row = ({ className, onRef, ...rest }) => (
  <div ref={onRef} className={cx(styles['c-list-row'], className)} {...rest} />
)

export const Content = ListItemText
