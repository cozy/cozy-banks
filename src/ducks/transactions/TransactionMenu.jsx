import React from 'react'
import { Menu } from 'ducks/menu'
import { translate } from 'cozy-ui/react/I18n'
import TransactionActions from './TransactionActions'

import styles from './TransactionMenu.styl'

const TransactionMenu = ({t, transaction, urls}) => (
  <Menu
    title={t('Movements.actions.more')}
    disabled={false}
    className={styles['fil-toolbar-menu']}
    buttonClassName={styles['fil-toolbar-more-btn']}
  >
    <TransactionActions transaction={transaction} urls={urls} withoutDefault />
  </Menu>
)

export default translate()(TransactionMenu)
