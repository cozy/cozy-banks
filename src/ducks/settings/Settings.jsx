/* global __TARGET__, __APP_VERSION__ */
import React from 'react'
import {
  translate,
  withBreakpoints,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab
} from 'cozy-ui/react'
import styles from './Settings.styl'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import AppVersion from './AppVersion'
import { PageTitle } from 'components/Title'
import { Padded } from 'components/Spacing'
import cx from 'classnames'
import flag from 'cozy-flags'
import { setBarTheme } from 'ducks/mobile/utils'

const Settings = ({ t, children, router, breakpoints: { isMobile } }) => {
  setBarTheme('default')

  const tabNames = ['configuration', 'accounts', 'groups']
  let defaultTab = router.location.pathname.replace('/settings/', '')
  if (tabNames.indexOf(defaultTab) === -1) defaultTab = 'configuration'

  const goTo = url => () => {
    router.push(url)
  }
  if (flag('debug')) {
    tabNames.push('debug')
  }
  const tabs = tabNames.map(tabName => (
    <Tab key={tabName} name={tabName} onClick={goTo(`/settings/${tabName}`)}>
      {t(`Settings.${tabName}`)}
    </Tab>
  ))

  return (
    <React.Fragment>
      <Padded className={cx({ ['u-p-0']: isMobile })}>
        <PageTitle>{t('Settings.title')}</PageTitle>
      </Padded>
      <Tabs className={styles['bnk-tabs']} initialActiveTab={defaultTab}>
        <TabList className={styles['bnk-coz-tab-list']}>{tabs}</TabList>
        <TabPanels className={styles.TabPanels}>
          <Padded>
            <TabPanel active>{children}</TabPanel>
          </Padded>
        </TabPanels>
      </Tabs>
      {__TARGET__ === 'mobile' && (
        <Padded>
          <AppVersion version={__APP_VERSION__} />
        </Padded>
      )}
    </React.Fragment>
  )
}

export default compose(
  withRouter,
  translate(),
  withBreakpoints()
)(Settings)
