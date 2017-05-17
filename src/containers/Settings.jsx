import styles from '../styles/parametres'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'cozy-ui/react/Tabs'
import Notifications from '../components/Notifications'
import Groups from '../components/Groups'

export class Settings extends Component {
  render () {
    const { groups } = this.props

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
              <Groups groups={groups} />
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
  groups: state.groups
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Settings))
