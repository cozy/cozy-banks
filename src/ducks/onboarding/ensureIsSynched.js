import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isSynched, synchronize } from 'redux-cozy-client'
import Loading from 'components/Loading'
import styles from './Onboarding.styl'
import { Content } from 'components/Layout'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  componentDidMount () {
    this.props.dispatch(synchronize())
  }

  render () {
    const { isSynched, children } = this.props
    if (!isSynched) {
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

const mapStateToProps = (state) => ({ isSynched: isSynched(state) })

export default connect(mapStateToProps)(Wrapper)
