import React from 'react'
import { Menu } from 'components/Menu'
import { translate, Icon } from 'cozy-ui/react'
import TransactionActions from './TransactionActions'

// check cozy-ui when it has removed color from its SVGs
import dotsIcon from 'assets/icons/icon-dots.svg'

const TransactionMenu = ({t, transaction, urls}) => (
  <Menu
    title={<Icon icon={dotsIcon} color='#95999d' />}
    disabled={false}
  >
    <TransactionActions transaction={transaction} urls={urls} withoutDefault />
  </Menu>
)

export default translate()(TransactionMenu)
