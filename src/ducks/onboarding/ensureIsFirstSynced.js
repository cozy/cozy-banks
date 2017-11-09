/* global __TARGET__ */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isSynced, isFirstSync, hasSyncStarted, isSyncInError, startSync, refetchCollections } from 'cozy-client'
import Loading from 'components/Loading'
import styles from './Onboarding.styl'
import { Content } from 'components/Layout'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  componentDidMount () {
    if (__TARGET__ === 'mobile') {
      this.props.dispatch(startSync())
        .then(() => this.props.dispatch(refetchCollections()))
    }
  }

  render () {
    if (__TARGET__ !== 'mobile') {
      return this.props.children
    }
    const { isOffline, isSynced, isFirstSync, hasSyncStarted, children } = this.props
    if (!isOffline && !hasSyncStarted) {
      return null
    }
    if (!isOffline && !isSynced && isFirstSync) {
      return (
        <Content>
          <div className={styles.Onboarding__loading}>
            <Loading />
          </div>
        </Content>
      )
    }
    return children
  }
}

const mapStateToProps = (state) => ({
  isSynced: isSynced(state),
  isFirstSync: isFirstSync(state),
  hasSyncStarted: hasSyncStarted(state),
  isOffline: isSyncInError(state)
})

export default connect(mapStateToProps)(Wrapper)
