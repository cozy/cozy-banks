/**
 * Is used in Desktop mode when you click on the more button
 */

import React from 'react'
import { Icon, Menu } from 'cozy-ui/react'
import TransactionActions from './TransactionActions'

// TODO: check cozy-ui when it has removed color from its SVGs
import dotsIcon from 'assets/icons/icon-dots.svg'

// Must wrap Icon in a span else we can't attach onClick
const menuOpener = (
  <span>
    <Icon icon={dotsIcon} color="#95999d" />
  </span>
)

const TransactionMenu = ({
  transaction,
  onSelect,
  onSelectDisabled,
  ...props
}) => (
  <Menu position="right" component={menuOpener}>
    <TransactionActions
      onSelect={onSelect}
      onSelectDisabled={onSelectDisabled}
      transaction={transaction}
      {...props}
      withoutDefault
    />
  </Menu>
)

export default TransactionMenu
