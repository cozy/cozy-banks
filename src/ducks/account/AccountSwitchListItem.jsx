import React from 'react'

import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Radio from 'cozy-ui/transpiled/react/Radios'

const AccountSwitchListItem = props => {
  return (
    <ListItem {...props}>
      {props.children}
      <ListItemSecondaryAction className="u-pr-1">
        <Radio onClick={props.onClick} checked={props.selected} readOnly />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default AccountSwitchListItem
