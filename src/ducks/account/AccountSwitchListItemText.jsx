import React from 'react'

import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const accountSwitchListItemTextTypo2Props = {
  variant: 'caption',
  color: 'textSecondary'
}

const AccountSwitchListItemText = ({ primary, secondary }) => {
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      secondaryTypographyProps={accountSwitchListItemTextTypo2Props}
    />
  )
}

export default AccountSwitchListItemText
