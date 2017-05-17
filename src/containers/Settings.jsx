import styles from '../styles/parametres'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'cozy-ui/react/Tabs'
import Notifications from '../components/Notifications'
import Groups from '../components/Groups'

import { updateGroup } from '../actions'

export class Settings extends Component {
  render () {
    const { groups, accounts, updateGroup } = this.props

    return (
      <div>
        <h2>
          Paramètres
        </h2>
        <Tabs className={styles['bnk-tabs']} initialActiveTab='groups'>
          <TabList className={styles['bnk-coz-tab-list']}>
            <Tab name='profil'>
              Profil
            </Tab>
            <Tab name='accounts'>
              Comptes
            </Tab>
            <Tab name='groups'>
              Groupes
            </Tab>
            <Tab name='notifications'>
              Notifications
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel name='profil'>
              Coming Soon
            </TabPanel>
            <TabPanel name='accounts'>
              Coming Soon
            </TabPanel>
            <TabPanel name='groups'>
              <Groups
                groups={groups}
                accounts={accounts}
                updateGroup={updateGroup}
              />
            </TabPanel>
            <TabPanel name='notifications'>
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Settings))
