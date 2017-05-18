import styles from '../styles/parametres'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'
//import { withRouter } from 'react-router'

import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'cozy-ui/react/Tabs'
import Notifications from '../components/Notifications'
import Groups from '../components/Groups'

import {
  createGroup,
  updateGroup,
  deleteGroup
} from '../actions'

export class Settings extends Component {
  render () {
    const { groups, accounts, createGroup, updateGroup, deleteGroup, params } = this.props
    const tabNames = ['profil', 'accounts', 'groups', 'notifications']
    let defaultTab = tabNames[0]
    if (params.tab && tabNames.indexOf(params.tab) >= 0) defaultTab = params.tab

    return (
      <div>
        <h2>
          Paramètres
        </h2>
        <Tabs className={styles['bnk-tabs']} initialActiveTab={defaultTab}>
          <TabList className={styles['bnk-coz-tab-list']}>
            <Tab name={tabNames[0]}>
              Profil
            </Tab>
            <Tab name={tabNames[1]}>
              Comptes
            </Tab>
            <Tab name={tabNames[2]}>
              Groupes
            </Tab>
            <Tab name={tabNames[3]}>
              Notifications
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel name={tabNames[0]}>
              Coming Soon
            </TabPanel>
            <TabPanel name={tabNames[1]}>
              Coming Soon
            </TabPanel>
            <TabPanel name={tabNames[2]}>
              <Groups
                groups={groups}
                accounts={accounts}
                createGroup={createGroup}
                updateGroup={updateGroup}
                deleteGroup={deleteGroup}
              />
            </TabPanel>
            <TabPanel name={tabNames[3]}>
              <Notifications />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  groups: state.groups,
  accounts: state.accounts
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  updateGroup: async (id, data) => {
    return dispatch(updateGroup(id, data))
  },
  createGroup: async (data) => {
    return dispatch(createGroup(data))
  },
  deleteGroup: async (group) => {
    return dispatch(deleteGroup(group))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Settings))
