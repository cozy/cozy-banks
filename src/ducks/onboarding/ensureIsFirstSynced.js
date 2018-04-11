/* global __TARGET__ */
import { Component } from 'react'
import { connect } from 'react-redux'
import {
  isSynced,
  isFirstSync,
  hasSyncStarted,
  isSyncInError,
  startSync,
  fetchCollection
} from 'cozy-client'
import { flowRight as compose } from 'lodash'
import { translate } from 'cozy-ui/react'
import {
  PouchFirstStrategy,
  StackOnlyStrategy
} from 'cozy-client/DataAccessFacade'
import { fetchTransactions } from 'actions'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import { isInitialSyncOK } from 'ducks/mobile'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  async componentDidMount() {
    if (__TARGET__ === 'mobile') {
      const { client } = this.context

      let promise

      if (this.props.isInitialSyncOK) {
        // If initial sync is OK, then do nothing special
        promise = Promise.resolve()
      } else {
        // Otherwise, use the StackOnlyStrategy to fetch the data from the stack
        // before dispatching the startSync action
        client.facade.strategy = new StackOnlyStrategy()

        promise = Promise.all([
          this.props.dispatch(
            fetchCollection('onboarding_accounts', ACCOUNT_DOCTYPE)
          ),
          this.props.dispatch(fetchCollection('groups', GROUP_DOCTYPE)),
          this.props.dispatch(fetchTransactions())
        ])
      }

      try {
        await promise
        client.facade.strategy = new PouchFirstStrategy()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error while fetching data from stack: ' + e)
      } finally {
        this.props.dispatch(startSync())
      }
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  isSynced: isSynced(state),
  isFirstSync: isFirstSync(state),
  isInitialSyncOK: isInitialSyncOK(state),
  hasSyncStarted: hasSyncStarted(state),
  isOffline: isSyncInError(state)
})

export default compose(connect(mapStateToProps), translate())(Wrapper)
