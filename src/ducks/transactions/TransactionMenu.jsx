import React from 'react'
import { translate, Icon } from 'cozy-ui/react'

import Menu from 'cozy-ui/react/Menu'
import TransactionActions from './TransactionActions'

// TODO: check cozy-ui when it has removed color from its SVGs
import dotsIcon from 'assets/icons/icon-dots.svg'

// Must wrap Icon in a span else we can't attach onClick
const menuOpener = (
  <span>
    <Icon icon={dotsIcon} color='#95999d' />
  </span>
)

const TransactionMenu = ({t, transaction, urls, onSelect, onSelectDisabled}) => (
  <Menu
    position='right'
    component={menuOpener}
  >
    <TransactionActions
      onSelect={onSelect}
      onSelectDisabled={onSelectDisabled}
      transaction={transaction} urls={urls} withoutDefault />
  </Menu>
)

export default translate()(TransactionMenu)
