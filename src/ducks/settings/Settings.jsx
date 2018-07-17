/* global __TARGET__, __APP_VERSION__ */
import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Topbar from 'components/Topbar'
import { Tabs, TabPanels, TabPanel, TabList, Tab } from 'cozy-ui/react'
import styles from './Settings.styl'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import AppVersion from './AppVersion'
import PageTitle from 'components/PageTitle'

const tabNames = ['configuration', 'accounts', 'groups']

const Settings = ({ t, children, router }) => {
  let defaultTab = router.location.pathname.replace('/settings/', '')
  if (tabNames.indexOf(defaultTab) === -1) defaultTab = 'configuration'

  const goTo = url => () => {
    router.push(url)
  }

  const tabs = tabNames.map(tabName => (
    <Tab key={tabName} name={tabName} onClick={goTo(`/settings/${tabName}`)}>
      {t(`Settings.${tabName}`)}
    </Tab>
  ))

  return (
    <div>
      <Topbar>
        <PageTitle className={styles.settings__title}>
          {t('Settings.title')}
        </PageTitle>
      </Topbar>
      <Tabs className={styles['bnk-tabs']} initialActiveTab={defaultTab}>
        <TabList className={styles['bnk-coz-tab-list']}>{tabs}</TabList>
        <TabPanels>
          <TabPanel active>{children}</TabPanel>
        </TabPanels>
      </Tabs>
      {__TARGET__ === 'mobile' && <AppVersion version={__APP_VERSION__} />}
    </div>
  )
}

export default compose(withRouter, translate())(Settings)
