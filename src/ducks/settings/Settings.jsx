import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import GroupsSettings from 'components/GroupsSettings'
import { AccountsSettings } from 'ducks/account'
import { Topbar } from 'ducks/commons'
import { Tabs, TabPanels, TabPanel, TabList, Tab } from 'cozy-ui/react'
import { createGroup, updateGroup, deleteGroup } from 'actions'

import Notifications from './Notifications'
import styles from './Settings.styl'

const Settings = ({ t, groups, accounts, createGroup, updateGroup, deleteGroup, params }) => {
  const tabNames = ['accounts', 'groups', 'notifications']
  let defaultTab = tabNames[0]
  if (params.tab && tabNames.indexOf(params.tab) >= 0) defaultTab = params.tab

  return (
    <div>
      <Topbar>
        <h2>{t('Settings.title')}</h2>
      </Topbar>
      <Tabs className={styles['bnk-tabs']} initialActiveTab={defaultTab}>
        <TabList className={styles['bnk-coz-tab-list']}>
          <Tab name={tabNames[0]}>
            {t('Settings.accounts')}
          </Tab>
          <Tab name={tabNames[1]}>
            {t('Settings.groups')}
          </Tab>
          <Tab name={tabNames[2]}>
            {t('Settings.notifications')}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel name={tabNames[0]}>
            <AccountsSettings />
          </TabPanel>
          <TabPanel name={tabNames[1]}>
            <GroupsSettings
              groups={groups}
              accounts={accounts}
              createGroup={createGroup}
              updateGroup={updateGroup}
              deleteGroup={deleteGroup}
            />
          </TabPanel>
          <TabPanel name={tabNames[2]}>
            <Notifications />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

const mapStateToProps = state => ({
  groups: state.groups,
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => ({
  updateGroup: async (id, data) => dispatch(updateGroup(id, data)),
  createGroup: async (data) => dispatch(createGroup(data)),
  deleteGroup: async (group) => dispatch(deleteGroup(group))
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Settings))
