import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Menu, Item } from 'ducks/menu'

import styles from './OperationMenu.styl'
import { getLinkType, FILE_LINK, OperationFileAction } from './OperationAction'

const OperationMenu = ({t, operation, urls}) => (
  <Menu
    title={t('toolbar.item_more')}
    disabled={false}
    className={styles['fil-toolbar-menu']}
    buttonClassName={styles['fil-toolbar-more-btn']}
  >
    {getLinkType(operation, urls) !== FILE_LINK && operation.action && operation.action.payload &&
      <Item>
        <OperationFileAction t={t} operation={operation}>
          <a className={styles['action-bill']}>
            {t('Movements.actions.bill')}
          </a>
        </OperationFileAction>
      </Item>}
    <Item>
      <a className={styles['action-attach']} onClick={e => {}}>
        {t('Movements.actions.attach')}
      </a>
    </Item>
    <Item>
      <a className={styles['action-comment']} onClick={e => {}}>
        {t('Movements.actions.comment')}
      </a>
    </Item>
  </Menu>
)

export default translate()(OperationMenu)
