import React, { Component } from 'react'
import UserActionRequired from 'components/UserActionRequired'

/**
 * Displays Loading until PouchDB has done its first replication.
 */
class Wrapper extends Component {
  render() {
    return <UserActionRequired>{this.props.children}</UserActionRequired>
  }
}

export default Wrapper
