import styles from '../styles/parametres'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'cozy-ui/react/Tabs'
import Notifications from '../components/Notifications'

export class Settings extends Component {
  render () {
    return (
      <div>
        <h2>
          Paramètres
        </h2>
        <Tabs className={styles['bnk-tabs']} initialActiveTab='notifications'>
          <TabList className={styles['bnk-coz-tab-list']}>
            <Tab name='profil'>
              Profil
            </Tab>
            <Tab name='comptes'>
              Comptes
            </Tab>
            <Tab name='groupes'>
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
            <TabPanel name='comptes'>
              Coming Soon
            </TabPanel>
            <TabPanel name='groupes'>
              Coming Soon
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
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Settings))
