import React, { memo } from 'react'
import Button from 'cozy-ui/react/Button'
import AddAccountLink from 'ducks/settings/AddAccountLink'
import styles from 'ducks/categories/AddAccountButton.styl'
import cx from 'classnames'

const AddAccountButton = ({ label, className, ...buttonProps }) => (
  <AddAccountLink>
    <Button
      theme="highlight"
      icon="plus"
      size="large"
      className={cx(styles.AddAccountLink, className)}
      label={label}
      {...buttonProps}
    />
  </AddAccountLink>
)

export default memo(AddAccountButton)
