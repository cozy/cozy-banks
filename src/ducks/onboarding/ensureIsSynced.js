import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isSynced, startSync } from 'cozy-client'
import Loading from 'components/Loading'
import styles from './Onboarding.styl'
import { Content } from 'components/Layout'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  componentDidMount () {
    this.props.dispatch(startSync())
  }

  render () {
    const { isSynced, children } = this.props
    if (!isSynced) {
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

const mapStateToProps = (state) => ({ isSynced: isSynced(state) })

export default connect(mapStateToProps)(Wrapper)
