/**
 * Should be moved inside cozy-ui, see
 * https://github.com/cozy/cozy-ui/issues/1290
 */

import React from 'react'
import PropTypes from 'prop-types'
import { DialogContent } from 'cozy-ui/transpiled/react/Dialog'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { useCozyDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Radio from 'cozy-ui/transpiled/react/Radio'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

export const ModalSection = ({ children, label }) => (
  <div>
    {label && (
      <DialogContent className="u-pv-0">
        <Typography variant="h6" className="u-mb-half">
          {label}
        </Typography>
      </DialogContent>
    )}
    {children}
  </div>
)

export const ModalSections = ({ children }) => {
  return <Stack spacing="m">{children}</Stack>
}

export const ModalRow = ({
  hasRadio,
  label,
  isSelected,
  onClick,
  icon,
  hasArrow,
  divider
}) => {
  const { listItemProps } = useCozyDialog({ size: 'm' })
  const { isMobile } = useBreakpoints()
  return (
    <ListItem
      {...listItemProps}
      button
      onClick={onClick}
      selected={isSelected}
      divider={divider}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={label} />
      <ListItemSecondaryAction className="u-flex u-flex-row">
        <div className={isMobile ? 'u-mr-1' : 'u-mr-2'}>
          {hasRadio ? (
            <Radio
              defaultChecked={isSelected}
              onClick={onClick}
              className="u-mr-half"
            />
          ) : null}
          {hasArrow ? <Icon icon={RightIcon} className="u-coolGrey" /> : null}
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

ModalRow.propTypes = {
  icon: PropTypes.node,
  divider: PropTypes.bool,
  hasRadio: PropTypes.bool,
  hasArrow: PropTypes.bool,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
