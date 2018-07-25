/* global __TARGET__ */
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react'
import { fetchTransactions } from 'actions'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { isInitialSyncOK } from 'ducks/mobile'
import UserActionRequired from 'components/UserActionRequired'
import { registerPushNotifications } from 'ducks/mobile/push'
import { setupSettings } from 'ducks/settings'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  render() {
    return <UserActionRequired>{this.props.children}</UserActionRequired>
  }
}

export default translate()(Wrapper)
