import React, { memo } from 'react'
import useBreakpoints from 'cozy-ui/react/hooks/useBreakpoints'
import ListItemIcon from 'cozy-ui/react/MuiCozyTheme/ListItemIcon'
import ListItem from 'cozy-ui/react/MuiCozyTheme/ListItem'
import { Radio } from 'cozy-ui/react/NestedSelect/NestedSelect'
import { withStyles } from '@material-ui/core/styles'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { getParentCategory } from '../categoriesMap'
import { useI18n } from 'cozy-ui/transpiled/react'

const NestedSelectListItemText = withStyles({
  root: {
    padding: '0rem 0.5rem'
  }
})(ListItemText)

const NestedSelectListRightIcon = withStyles(theme => ({
  root: {
    marginRight: 0,
    color: theme.palette.text.secondary
  }
}))(ListItemIcon)

const primaryTypographyProps = { className: 'u-ellipsis', variant: 'body1' }

export const SearchCategoryRow = ({ isSelected, onClick, item }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const parentName = getParentCategory(item.id)

  return (
    <ListItem dense button divider onClick={() => onClick(item)}>
      {item.icon && (
        <ListItemIcon className={`${isMobile ? 'u-ml-half' : 'u-ml-1'} u-mr-1`}>
          {item.icon}
        </ListItemIcon>
      )}
      <NestedSelectListItemText
        primary={item.title}
        ellipsis
        primaryTypographyProps={primaryTypographyProps}
        secondary={t(`Data.categories.${parentName}`)}
        secondaryTypographyProps={{
          variant: 'caption',
          className: 'u-ellipsis'
        }}
      />

      <NestedSelectListRightIcon>
        <Radio
          readOnly
          name={item.title}
          value={item.title}
          checked={!!isSelected}
        />
      </NestedSelectListRightIcon>
    </ListItem>
  )
}

SearchCategoryRow.defaultProps = {}

export default memo(SearchCategoryRow)
