import React from 'react'
import { Menu } from 'ducks/menu'
import { translate } from 'cozy-ui/react/I18n'
import OperationActions from './OperationActions'

import styles from './OperationMenu.styl'

const OperationMenu = ({t, operation, urls}) => (
  <Menu
    title={t('Movements.actions.more')}
    disabled={false}
    className={styles['fil-toolbar-menu']}
    buttonClassName={styles['fil-toolbar-more-btn']}
  >
    <OperationActions operation={operation} urls={urls} withoutDefault />
  </Menu>
)

export default translate()(OperationMenu)
