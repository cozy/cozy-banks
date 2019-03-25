import React, { memo } from 'react'
import Button from 'cozy-ui/react/Button'
import AddAccountLink from 'ducks/settings/AddAccountLink'
import styles from 'ducks/categories/AddAccountButton.styl'

const AddAccountButton = label => (
  <AddAccountLink>
    <Button
      theme="highlight"
      icon="plus"
      size="large"
      className={styles.AddAccountLink}
      label={label}
    />
  </AddAccountLink>
)

export default memo(AddAccountButton)
