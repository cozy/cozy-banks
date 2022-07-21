import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Icon from 'cozy-ui/transpiled/react/Icon'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Button from 'cozy-ui/transpiled/react/Buttons'
import SettingIcon from 'cozy-ui/transpiled/react/Icons/Setting'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'

const AdvancedFilter = ({ onClick, className }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()

  if (isMobile) {
    return (
      <List>
        <ListItem button onClick={onClick}>
          <ListItemIcon>
            <Icon icon={SettingIcon} />
          </ListItemIcon>
          <ListItemText
            primary={t('Categories.filter.advancedFilters.title')}
          />
          <ListItemSecondaryAction className="u-mr-1">
            <Icon icon={RightIcon} color="var(--secondaryTextColor)" />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
  }

  return (
    <Button
      label={t('Categories.filter.advancedFilters.title')}
      variant="text"
      onClick={onClick}
      startIcon={<Icon icon={SettingIcon} />}
      className={className}
    />
  )
}

AdvancedFilter.prototype = {
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default AdvancedFilter
