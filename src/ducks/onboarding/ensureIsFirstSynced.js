import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isSynced, isFirstSync, startSync } from 'cozy-client'
import Loading from 'components/Loading'
import styles from './Onboarding.styl'
import { Content } from 'components/Layout'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  state = {
    hasSyncStarted: false
  }

  componentDidMount () {
    this.props.dispatch(startSync())
      .then(() => this.setState({ hasSyncStarted: true }))
  }

  render () {
    const { hasSyncStarted } = this.state
    const { isSynced, isFirstSync, children } = this.props
    if (!hasSyncStarted) {
      return null
    }
    if (!isSynced && isFirstSync) {
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
  isFirstSync: isFirstSync(state)
})

export default connect(mapStateToProps)(Wrapper)
