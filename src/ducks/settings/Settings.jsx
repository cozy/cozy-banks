/* global __TARGET__ */
import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Topbar from 'components/Topbar'
import { Tabs, TabPanels, TabPanel, TabList, Tab } from 'cozy-ui/react'
import styles from './Settings.styl'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'

const tabNames = ['notifications', 'accounts', 'groups']

const Settings = ({ t, children, router }) => {
  let defaultTab = router.location.pathname.replace('/settings/', '')
  if (tabNames.indexOf(defaultTab) === -1) defaultTab = 'notifications'

  const goTo = url => () => {
    router.push(url)
  }

  const tabs = [
    (<Tab name={tabNames[0]} onClick={goTo('/settings/notifications')}>
      {t('Settings.notifications')}
    </Tab>),
    (<Tab name={tabNames[1]} onClick={goTo('/settings/accounts')}>
      {t('Settings.accounts')}
    </Tab>),
    (<Tab name={tabNames[2]} onClick={goTo('/settings/groups')}>
      {t('Settings.groups')}
    </Tab>)
  ]

  return (
    <div>
      <Topbar>
        <h2 className={styles.settings__title}>{t('Settings.title')}</h2>
      </Topbar>
      <Tabs className={styles['bnk-tabs']} initialActiveTab={defaultTab}>
        <TabList className={styles['bnk-coz-tab-list']}>
          {tabs}
        </TabList>
        <TabPanels>
          <TabPanel active>
            {children}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default compose(
  withRouter,
  translate()
)(Settings)
